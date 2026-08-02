import crypto from 'crypto';
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { getRandomProxy } from './proxyManager.ts';

const CONFIG = {
  BASE_URL: 'https://www.alightpro.my.id',
  SECRET: 'amprem-human-v3-secret-2026',
  UA: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36',
  TIMEOUT: 10000 // 10 seconds per attempt
};

const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest('hex');

async function makeRequest(
  url: string,
  method: 'GET' | 'POST' = 'GET',
  data?: any,
  headers: Record<string, string> = {},
  useProxy: boolean = true,
  baseUrl: string = CONFIG.BASE_URL
) {
  let activeProxyUrl: string | null = null;
  let httpsAgent: any = undefined;

  if (useProxy) {
    const proxy = await getRandomProxy();
    if (proxy) {
      activeProxyUrl = proxy.url;
      try {
        httpsAgent = new HttpsProxyAgent(proxy.url);
      } catch (err: any) {
        console.warn(`[AlightApi] ProxyAgent init error (${proxy.url}): ${err.message}`);
      }
    }
  }

  const reqHeaders = {
    'User-Agent': CONFIG.UA,
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-store',
    'Origin': baseUrl,
    'Referer': baseUrl + '/',
    ...headers
  };

  const response = await axios({
    method,
    url,
    data,
    headers: reqHeaders,
    httpsAgent,
    httpAgent: httpsAgent,
    timeout: CONFIG.TIMEOUT,
    validateStatus: () => true
  });

  return { response, activeProxyUrl };
}

async function getSession(useProxy: boolean, baseUrl: string = CONFIG.BASE_URL) {
  const { response, activeProxyUrl } = await makeRequest(
    `${baseUrl}/api/session`,
    'GET',
    undefined,
    {},
    useProxy,
    baseUrl
  );

  if (response.status !== 200) {
    const msg = response.data?.msg || response.data?.error || `HTTP ${response.status}`;
    throw new Error(`Session endpoint HTTP ${response.status}: ${msg}`);
  }

  const rawSetCookie = response.headers['set-cookie'];
  let setCookie = '';
  if (Array.isArray(rawSetCookie)) {
    setCookie = rawSetCookie.join('; ');
  } else if (rawSetCookie) {
    setCookie = String(rawSetCookie);
  }

  const cookie = setCookie.split(';')[0] || '';
  const data = response.data;

  if (!data || !data.status || !data.token || !data.nonce) {
    if (baseUrl !== CONFIG.BASE_URL) {
      throw new Error(`Domain custom (${baseUrl}) tidak memiliki endpoint '/api/session' yang sesuai atau mengembalikan format tidak valid.`);
    }
    throw new Error(data?.msg || 'Session token/nonce tidak valid dari server.');
  }

  return { ...data, cookie, activeProxyUrl };
}

function solvePow({
  sessionId,
  nonce,
  timestamp,
  email,
  action,
  humanProof,
  difficulty = '0000'
}: {
  sessionId: string;
  nonce: string;
  timestamp: string;
  email: string;
  action: string;
  humanProof: string;
  difficulty?: string;
}) {
  const base = `${sessionId}:${nonce}:${timestamp}:${email.toLowerCase()}:${action}:${humanProof}:`;
  for (let i = 0; i < 500000; i++) {
    if (sha256(base + i).startsWith(difficulty)) return String(i);
  }
  return Date.now().toString();
}

export async function callAlight(
  body: { action: 'send' | 'verify'; email: string; link?: string },
  customBaseUrl?: string
) {
  const baseUrl = (customBaseUrl && customBaseUrl.trim()) ? customBaseUrl.trim().replace(/\/$/, '') : CONFIG.BASE_URL;

  // Retry strategy:
  // If customBaseUrl is provided or default, try proxies first then direct connection
  const MAX_PROXY_ATTEMPTS = 4;
  const attempts: boolean[] = [];

  for (let p = 0; p < MAX_PROXY_ATTEMPTS; p++) {
    attempts.push(true);
  }
  attempts.push(false); // Direct fallback

  let lastErrorMsg = '';

  for (let i = 0; i < attempts.length; i++) {
    const isProxyAttempt = attempts[i];
    const attemptLabel = isProxyAttempt ? `Proxy IP #${i + 1}` : 'Direct Connection';

    try {
      const s = await getSession(isProxyAttempt, baseUrl);

      const delay = 2300 - (Date.now() - parseInt(s.timestamp, 10));
      if (delay > 0) {
        await new Promise((r) => setTimeout(r, delay));
      }

      const humanProof = sha256(
        `human:${s.sessionId}:${s.nonce}:${s.timestamp}:${body.email.toLowerCase()}:5:${CONFIG.SECRET}`
      );

      const pow = solvePow({
        sessionId: s.sessionId,
        nonce: s.nonce,
        timestamp: s.timestamp,
        email: body.email,
        action: body.action,
        humanProof,
        difficulty: s.difficulty || '0000'
      });

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Amprem-Token': s.token,
        'X-Amprem-Nonce': s.nonce,
        'X-Amprem-Pow': pow,
        'X-Amprem-Human-Proof': humanProof,
        'Cookie': s.cookie || ''
      };

      const { response: res, activeProxyUrl } = await makeRequest(
        `${baseUrl}/api/alight-motion`,
        'POST',
        body,
        headers,
        isProxyAttempt,
        baseUrl
      );

      const data = res.data;

      if (!data || data.status === false || res.status !== 200) {
        const errorMsg = data?.msg || `Gagal memproses permintaan (HTTP ${res.status})`;
        if (isProxyAttempt) {
          throw new Error(`Proxy ${activeProxyUrl || ''} ditolak: ${errorMsg}`);
        }
        return {
          success: false,
          error: errorMsg,
          usedProxy: activeProxyUrl
        };
      }

      const premium = data.data?.premium?.result;

      return {
        success: true,
        email: body.email,
        message: data.msg || (body.action === 'send' ? 'Link OOB berhasil dikirim!' : 'Alight Motion Premium Berhasil Diaktifkan!'),
        data: data.data || null,
        accountLinkStatus: premium?.accountLinkStatus,
        expiryTimeMillis: premium?.expiryTimeMillis,
        autoRenewing: premium?.autoRenewing,
        rawResponse: data,
        usedProxy: activeProxyUrl || 'Direct (No Proxy)'
      };
    } catch (error: any) {
      lastErrorMsg = error.message || 'Error koneksi server target.';
      console.warn(`[AlightApi] Percobaan ${attemptLabel} ke ${baseUrl} gagal: ${lastErrorMsg}`);
      if (i === attempts.length - 1) {
        // All attempts failed
        let friendlyError = lastErrorMsg;
        if (lastErrorMsg.includes('unavailable in your region') || lastErrorMsg.includes('403')) {
          friendlyError = 'Server target www.alightpro.my.id sedang membatasi akses wilayah (403 Region Block). Silakan coba beberapa saat lagi.';
        }
        return {
          success: false,
          error: friendlyError
        };
      }
    }
  }

  return {
    success: false,
    error: lastErrorMsg || 'Semua percobaan koneksi ke server target gagal.'
  };
}

export async function sendOobLinkRemote(email: string, customBaseUrl?: string) {
  return await callAlight({ action: 'send', email }, customBaseUrl);
}

export async function verifyOobLinkRemote(email: string, rawLink: string, customBaseUrl?: string) {
  return await callAlight({ action: 'verify', email, link: rawLink.trim() }, customBaseUrl);
}

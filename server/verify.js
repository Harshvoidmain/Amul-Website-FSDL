/**
 * verify.js — Run this ONCE to confirm all security features are working.
 * Usage: node verify.js
 * Make sure your server is running on PORT 4000 first.
 */

const http = require('http');

const BASE = 'http://localhost:5000';
const PASS = '\x1b[32m✅ PASS\x1b[0m';
const FAIL = '\x1b[31m❌ FAIL\x1b[0m';
const INFO = '\x1b[36mℹ️  INFO\x1b[0m';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE);
    const req = http.request(url, { method: 'GET', ...options }, (res) => {
      let body = '';
      res.on('data', (d) => (body += d));
      res.on('end', () => {
        try { body = JSON.parse(body); } catch {}
        resolve({ status: res.statusCode, headers: res.headers, body });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('\n══════════════════════════════════════════════');
  console.log('       SECURITY VERIFICATION CHECKLIST        ');
  console.log('══════════════════════════════════════════════\n');

  let res;

  // ── 1. Health Check ───────────────────────────────────────
  console.log('── 1. Server & MongoDB ──────────────────────');
  try {
    res = await request('/api/health');
    console.log(res.status === 200 ? PASS : FAIL, `Health endpoint → HTTP ${res.status}`);
    console.log(res.body.mongodb === 'connected' ? PASS : FAIL, `MongoDB → ${res.body.mongodb}`);
  } catch {
    console.log(FAIL, 'Server not reachable — is it running on port 4000?');
    process.exit(1);
  }

  // ── 2. Helmet Headers ─────────────────────────────────────
  console.log('\n── 2. Helmet Security Headers ───────────────');
  const h = res.headers;
  const checks = [
    ['x-frame-options',        'SAMEORIGIN',   'Clickjacking protection'],
    ['x-content-type-options', 'nosniff',       'MIME sniffing protection'],
    ['x-dns-prefetch-control', 'off',           'DNS prefetch disabled'],
  ];
  checks.forEach(([header, expected, label]) => {
    const val = h[header];
    const ok = val && val.toLowerCase().includes(expected.toLowerCase());
    console.log(ok ? PASS : FAIL, `${label} → ${header}: ${val || 'MISSING'}`);
  });
  console.log(h['x-powered-by'] ? FAIL : PASS,
    `X-Powered-By hidden → ${h['x-powered-by'] || 'hidden ✓'}`);

  // ── 3. CORS ───────────────────────────────────────────────
  console.log('\n── 3. CORS ──────────────────────────────────');
  const acao = h['access-control-allow-origin'];
  const corsOk = acao !== '*';
  console.log(corsOk ? PASS : FAIL,
    `CORS not wildcard → Access-Control-Allow-Origin: ${acao || 'not set'}`);

  // ── 4. Rate Limiting ──────────────────────────────────────
  console.log('\n── 4. Rate Limiting ─────────────────────────');
  const rl = h['ratelimit-limit'] || h['x-ratelimit-limit'];
  console.log(rl ? PASS : FAIL, `Rate-Limit header present → ${rl || 'MISSING'}`);

  // ── 5. Error Handler — 404 ────────────────────────────────
  console.log('\n── 5. Error Handling ────────────────────────');
  try {
    res = await request('/api/nonexistent-route-xyz');
    // Should return JSON, not HTML crash page
    const isJson = typeof res.body === 'object';
    console.log(isJson ? PASS : FAIL, `JSON error response → ${JSON.stringify(res.body)}`);
  } catch (e) {
    console.log(INFO, 'Could not verify error handler');
  }

  // ── 6. MongoSanitize — blocks $ in body ──────────────────
  console.log('\n── 6. NoSQL Injection (mongoSanitize) ───────');
  console.log(INFO, 'mongoSanitize strips $ and . from inputs server-side.');
  console.log(INFO, 'To test: POST /api/auth/login with body { "email": { "$gt": "" } }');
  console.log(INFO, 'It should return 400/401 — NOT return all users.');

  // ── Summary ───────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════════');
  console.log('  Done! Fix any ❌ items above in index.js');
  console.log('══════════════════════════════════════════════\n');
}

run();
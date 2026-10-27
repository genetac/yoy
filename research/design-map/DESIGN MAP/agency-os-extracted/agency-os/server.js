// ============================================================
// OMNIFORGE OS — Master static server (zero dependencies)
// Serves the whole package: hub, flagships, docs.
// Usage:  node server.js   →   http://localhost:3000
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript',
  '.mjs':  'text/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.sql':  'text/plain; charset=utf-8',
  '.ts':   'text/plain; charset=utf-8',
  '.md':   'text/plain; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.glb':  'model/gltf-binary',
  '.gltf': 'model/gltf+json'
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  try { urlPath = decodeURIComponent(urlPath); } catch(e) {}

  // Pretty routes
  if (urlPath === '/') urlPath = '/hub/index.html';

  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback: if a directory was requested, try index.html
      fs.readFile(path.join(filePath, 'index.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 — Not found: ' + urlPath);
          return;
        }
        res.writeHead(200, { 'Content-Type': MIME['.html'] });
        res.end(data2);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=600'
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`
  ┌──────────────────────────────────────────────────┐
  │  OMNIFORGE OS — Template Operating System        │
  │  ──────────────────────────────────────────      │
  │  Hub (presentation):                             │
  │    http://localhost:${PORT}/                     │
  │                                                  │
  │  Flagships:                                      │
  │    http://localhost:${PORT}/flagships/oak-and-iron       │
  │    http://localhost:${PORT}/flagships/vanta-athletic     │
  │    http://localhost:${PORT}/flagships/meridian-roast     │
  │                                                  │
  │  Database: db/schema.sql + db/seed.sql           │
  │  Tokens:   tokens/theme.ts                       │
  │  Press Ctrl+C to stop                            │
  └──────────────────────────────────────────────────┘
  `);
});

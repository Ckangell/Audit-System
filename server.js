// server.js — Audit System local preview
// Run: node server.js
// Serves the audit system at http://localhost:8001

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8001;
const REPO = __dirname;
const DOCS = path.join(__dirname, 'docs');

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
};

http.createServer((req, res) => {
  let urlPath = req.url === '/' ? '/index.html' : req.url;

  // Try docs/ first, then repo root (for styles/, etc.)
  let filePath = path.join(DOCS, urlPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(REPO, urlPath);
  }

  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + urlPath); return; }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`\n  Audit System → http://localhost:${PORT}\n`);
});
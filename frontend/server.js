const https = require('https');
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const PORT = 8000;

const options = {
  key: fs.readFileSync(path.join(__dirname, '..', 'backend', 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, '..', 'backend', 'server.crt'))
};

const server = https.createServer(options, (req, res) => {
  const filePath = path.join(__dirname, url.parse(req.url).pathname);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(path.join(filePath, 'index.html')));
    return;
  }
  
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml'
    };
    
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('File not found');
  }
});

server.listen(PORT, () => {
  console.log(`Secure HTTPS Frontend running on https://10.233.251.26:${PORT}`);
});

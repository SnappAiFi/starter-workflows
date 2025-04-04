const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/autocomplete')) {
        // Handle autocomplete requests
        const query = new URLSearchParams(req.url.split('?')[1]).get('query');
        const suggestions = ['apple', 'banana', 'cherry']; // Example suggestions
        const filteredSuggestions = query ? suggestions.filter(s => s.startsWith(query)) : [];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(filteredSuggestions));
        return;
    }
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000; // Changed to port 3000
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

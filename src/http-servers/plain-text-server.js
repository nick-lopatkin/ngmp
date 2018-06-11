import * as http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
    });
    res.end('Hello World');
});

export default server;

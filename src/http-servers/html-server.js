import * as http from 'http';
import {createReadStream} from 'fs';

const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    createReadStream('./index.html').pipe(res);
});

export default server;

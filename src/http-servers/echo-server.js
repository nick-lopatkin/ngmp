import * as url from 'url';
import * as http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
    console.log (req.method, req.url);

    const urlParsed = url.parse(req.url, true);
    console.log(urlParsed);

    if(urlParsed.pathname === '/echo' && urlParsed.query.message){
        res.end(urlParsed.query.message);
    }else{
        res.statusCode = 404;
        res.end("Page not found");
    }
});

export default server;

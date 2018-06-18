// import server from './http-servers/plain-text-server';
// export default server;
import express from 'express';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';
import router from './routes/routes';

const app = express();

app.use(cookieParser);
app.use(queryParser);

app.use('/api', router);

export default app;

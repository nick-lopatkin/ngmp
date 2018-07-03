// import server from './http-servers/plain-text-server';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';
import router from './routes/routes';
import securityRouter, {setupPassport} from './security';
import verifyToken from './middlewares/verify';
import './db';

// import server from './http-servers/mongo-server';
// export default server;

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(bodyParser.urlencoded());
setupPassport(app);

app.use('/api', router);
app.use('/auth', securityRouter);

export default app;

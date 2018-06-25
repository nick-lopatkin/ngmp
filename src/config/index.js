import postgres from './config';

export default {
    name: 'Node App',
    environment: process.env.NODE_ENV || 'development',
    server: {
        host: 'http://localhost',
        port: process.env.PORT || 3000,
        postgres,
    },
};

import {Router} from 'express';
import {sign} from 'jsonwebtoken';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

const securityRouter = new Router();

const login = 'login';
const password = 'password';
const user = {
    email: 'login@email.com',
    username: login,
};
export const secret = 'secret';

securityRouter.route('/').post((req, res) => {
    console.log('body: ', req.body);
    if (req.body.login === login && req.body.password === password) {
        const token = sign(user, secret);
        const response = {
            code: 200,
            message: 'OK',
            data: {
                user,
            },
            token,
        };
        res.status(200).json(response);
    } else {
        const response = {
            code: 404,
            message: 'Not Found',
        };
        res.status(404).json(response);
    }
});

export const setupPassport = (app) => {
    passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        session: false,
    }, (passportLogin, passportPassword, done) => {
        if (passportLogin === login && passportPassword === password) {
            done(null, user);
        } else {
            done(null, false, 'bad login/password combination');
        }
    }));

    securityRouter.route('/local').post(
        passport.authenticate('local', {
            session: false,
        }),
        (req, res) => {
            const token = req.headers['x-access-token'];

            res.json({token});
        }
    );
};

export default securityRouter;

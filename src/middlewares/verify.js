import {promisify} from 'util';
import {verify} from 'jsonwebtoken';
import {secret} from '../security';

const verifyAsync = promisify(verify);

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log('headers: ', req.headers);
    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'no token',
        });
    }
    return verifyAsync(token, secret)
        .then(() => next())
        .catch(err =>
            res.json({
                success: false,
                message: 'auth failed',
                error: err,
            }));
};

export default verifyToken;

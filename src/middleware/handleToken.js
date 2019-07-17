import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { authFeedback } from '../helpers/Feedback';

const generateToken = id => jwt.sign({ user: id },process.env.SECRET_KEY);
const checkToken = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            return authFeedback(res, 403, ...['status',403,'error','Token must be provided']);
        }
        const bearer = header.split(' ');
        const token = bearer[1];
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        if (!decoded) {
            return authFeedback(res, 403, ...['status',403,'error','Unable to authenticate token']);
        }
        req.tokenData = decoded.user;
        return next();
    } catch (err) {
        return authFeedback(res, 403, ...['status',403,'error','Authentication failed']);
    }
};


export { generateToken, checkToken };
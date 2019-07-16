import Joi from '@hapi/joi'
import { serverFeedback } from './Feedback';
// schema
const property = Joi.object().keys({
    price: Joi.number().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    type: Joi.string().required(),
    address: Joi.string().required(),
    image_url: Joi.string()
});
const proUpdate = Joi.object().keys({
    owner: Joi.number(),
    price: Joi.number(),
    state: Joi.string(),
    city: Joi.string(),
    type: Joi.string(),
    address: Joi.string(),
    image_url: Joi.string()
});
const login = Joi.object().keys({
    password: Joi.required(),
    email: Joi.string().email().regex(/^\S+@\S+\.\S+$/).required()
});
const signup = Joi.object().keys({
    first_name: Joi.string().min(3).max(45).required(),
    last_name: Joi.string().min(3).max(45).required(),
    password: Joi.string().min(8).max(50).required(),
    email: Joi.string().email().regex(/^\S+@\S+\.\S+$/).required(),
    phoneNumber: Joi.number().required(),
    address: Joi.string().required()
});
// error message function
const error = (err, res) => {
    const errMessage = err.details[0].message;
    return serverFeedback(res, 422, 'status', 422, 'error', errMessage);
};
// validations
const validSignup = (req, res, next) => {
    const { password } = req.body;
    let { email } = req.body;
    email = email.toLowerCase().trim();
    req.body.email = email;
    const minMaxLength = /^[\s\S]{6,50}$/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    if (minMaxLength.test(password) && uppercaseRegex.test(password) && lowercaseRegex.test(password)) {
        return Joi.validate(req.body, signup, (err, value) => {
            if (err) {
                return error(err, res);
            }
            return next();
        });
    }
    return serverFeedback(res, 422, 'status', 422, 'error', 'password must be atleast 6 characters and contains uppercase');
}
const validSignin = (req, res, next) => {
    let { email, password } = req.body;
    email = email.toLowerCase().trim();
    password = password.trim();
    req.body.email = email;
    req.body.password = password;
    return Joi.validate(req.body, login, (err, value) => {
        if (err) {
            return error(err, res);
        }
        return next();
    });
};
const validProperty = (req, res, next) => {
    let { price } = req.body;
    price = Number(price);
    req.body.price = price;

    return Joi.validate(req.body, property, (err, value) => {
        if (err) {
            return error(err, res);
        }
        return next();
    });
};
const validUpdate= (req, res, next) => {
    if(req.body.price){
    let { price } = req.body;
    price = Number(price);
    req.body.price = price;
    }
    return Joi.validate(req.body, proUpdate, (err, value) => {
        if (err) {
            return error(err, res);
        }
        return next();
    });
};

export { validSignup, validSignin,validUpdate, validProperty }
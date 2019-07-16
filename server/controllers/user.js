import { serverFeedback, userFeedback, findError } from '../helpers/Feedback';
import Authentication from '../helpers/auth';
import { generateToken } from '../middleware/handleToken';
import db from "../database";
export default class User {

  static signUp(req, res) {
    try{
    const queryText = `
    INSERT INTO users(first_name, last_name, email, password,phoneNumber,address)
    VALUES($1, $2, $3, $4, $5)
    returning *
    `;
    const hashPassword = Authentication.hashPassword(req.body.password)
          const newUser = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hashPassword,
            req.body.phoneNumber,
            req.body.address
          ];
          db.query(queryText, newUser)
            .then(userRes => {
              const {id,email,password}=newUser
              generateToken({id,password,email})
            })
            .catch(err => {
                return serverFeedback(res, 403, ...['status', 403,'error',err]);
            });
        }catch(err) {
          return findError(res);
      };
    }
  // user signup
  static signIn(req, res) {
    const { email, password } = req.body;
    const queryText = `
      SELECT *  FROM users WHERE email = $1 LIMIT 1
    `;
    const value = [email];
    db.query(queryText, value)
      .then(response => {
        if (!response) {
          return serverFeedback(
            res,
            404,
            "error",
            "User not found"
          );
        }
        const decryptedPassword = Authentication.comparePassword(response.password,password);
        if (!decryptedPassword) {
          return serverFeedback(res, 422, ...['status', 422,'error','Incorrect Password']);
        }
        const {
          id, phoneNumber, first_name, last_name
        } = response;
        const token = generateToken({ id, email, phoneNumber });
        const loggedIn = {
          id, token, first_name, last_name, email
        };
        return userFeedback(res, 200, loggedIn);
      }).catch(err=> {
        return findError(res);
      })
  }
  //get current user
  static currentUser(req, res) {
    db.findById("users", req.user.id)
      .then(response => {
        const user = { ...response, password: null };
        delete user.password;
        userFeedback(res, 200, "user", user);
      })
      .catch(err => {
        return findError(res);
      });
  }
  
}

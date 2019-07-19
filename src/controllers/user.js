import { serverFeedback, userFeedback, findError, authFeedback } from '../helpers/Feedback';
import Authentication from '../helpers/auth';
import { generateToken } from '../middleware/handleToken';
import db from "../database";
export default class User {

  static signUp(req, res) {
    try {
      let {
        email, first_name, last_name, address, phoneNumber
      } = req.body;
      let { password } = req.body;
      password = Authentication.hashPassword(password)
      const table='users'
      const columns = `first_name, last_name, email, password, phonenumber,address`;
      const values = `'${first_name}', '${last_name}', '${email}', '${password}', '${phoneNumber}', '${address}'`;
      db.queryCreate(table,columns, values)
        .then(userRes => {

          const { id, email, phonenumber } = userRes
          const token = generateToken({ id, email, phonenumber });
        
        const SignedUp = {
          id, token, first_name, last_name, email,phoneNumber,address
        };
          return authFeedback(res, 201, ...['status', 201,'message','user Created Successfully', 'data', SignedUp]);
        })
        .catch(err => {
          return serverFeedback(res, 403, ...['status', 403, 'message', `This Email Already exists.`]);
        });
    } catch (err) {
      return findError(res);
    };
  }
  // user signin
  static signIn(req, res) {
    const { email, password } = req.body;
    const checkPassword=password
    const columns = `id, first_name, last_name,phonenumber, password`;
    const values = `WHERE email='${email}'`;
    db.querySignin(columns, values)
      .then(response => {
       
        if (!response.length) {
          return serverFeedback(
            res,
            404,
            ...[
              'status',
              404,
              "message",
              "User not found"
            ]);
        }
        
        const [{
          id, first_name, last_name,phonenumber,password
        }]= response;
        const decryptedPassword = Authentication.comparePassword(password, checkPassword);
        if (!decryptedPassword) {
          return serverFeedback(res, 422, ...['status', 422, 'error', 'Incorrect Password']);
        }
        const token = generateToken({ id, email, phonenumber });
        
        const loggedIn = {
          id, token, first_name, last_name, email
        };
        
        return userFeedback(res, 200,...['status',200,'message','Ok','data',loggedIn]);
      }).catch(err => {
        return findError(res);
      })
  }
  //get current user
  static currentUser(req, res) {
    db.findByOne("users", req.user.id)
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

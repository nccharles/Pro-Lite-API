import Authentication from '../helpers/auth';
import moment from 'moment';
import proData from '../utils/storage';
import { generateToken } from '../middleware/handleToken';
class User {
    constructor() {
        this.users = proData.usersList;
    }
    signUp(data) {
        let id = this.users.length + 1;
        const hashPassword = Authentication.hashPassword(data.password);
        const { first_name, last_name, phoneNumber, address, email } = data
        const tokenData = generateToken({ id, hashPassword, email });

        const newUser = {
            id,
            token: tokenData,
            email,
            first_name,
            last_name,
            password: hashPassword,
            phoneNumber,
            address,
            isAdmin: false,
            created_on: moment.now(),
        };
        this.users.push(newUser);
        return newUser
    }
    AllUsers() {
        return this.users;
    }

}
export default new User();
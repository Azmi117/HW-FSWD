const user_repository = require('../repositories/user');
const bcrypt = require('bcrypt');

class UserService{
    static async createUser(req, res, next){
        const { email, gender, password, role } = req

        const hashedPassword = bcrypt.hashSync(password, 8)

        const user = await user_repository.createUser({
            email, 
            gender, 
            hashedPassword, 
            role
        })
        
        return user
    }
}

module.exports = UserService;

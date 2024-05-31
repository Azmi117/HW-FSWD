const { User } = require('../models')

class UserRepository{
    static async createUser(req, res, next){
        const { email, gender, hashedPassword, role} = req
        try{

            const user = await User.create({
                email, 
                gender,
                password : hashedPassword,
                role
            });

            return user

        }catch(err){
            console.log(err)
        }
    }
}

module.exports = UserRepository;
const db = require('../models');
const send = require('send');
const User = db.User
const bcrypt = require('bcrypt')

class UserController {
    static getAllUsers = async (req, res, next) => {
        const {page = 1, limit = 7} = req.query;
        const offset = (page - 1) * limit;
        try{
            const user = await User.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset)
            });

            res.status(200).json({
                totalItems: user.count,
                totalPages: Math.ceil(user.count / limit),
                currentPage: parseInt(page),
                users: user.rows
            })
        } catch(err){
            next(err)
        }
    };

    static getUserById = async (req, res, next) => {
        const user = await User.findByPk(req.params.id)

        if(!user) return res.status(404).json({message: 'Not found'});

        return res.json({ data: user });
    }
    static createUser = async (req, res, next) => {
        const { email, gender, password, role } = req.body
        const hashedPassword = bcrypt.hashSync(password, 8)

        const data = await User.create({
            email, gender, password: hashedPassword, role
        })

        res.status(201).json(data);
    }

    static login = async (req, res, next) => {
        const { email, password } = req.body

        try{
            const user = await User.findOne({
                where: {email}
            })

            if(!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({
                    message: 'Invalid Credentials'
                });
            }
            res.status(200).json({
                message: 'Login success'
            })

        } catch (err){
            next(err)
        }
    }

    static updateUser = async (req, res, next) => {
        try{
            const user = await User.findByPk(req.params.id);
            if(!user) return res.status(404).send('User Not Found');

            user.email = req.body.email;
            user.gender = req.body.gender;
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            user.role = req.body.role;
            await user.save();

            res.json(user);

        }catch (err){
            res.status(500),send(err.message);
        }
    
    };
    static deleteUser = async (req, res, next) => {
        try{
            const user = await User.findByPk(req.params.id);
            if(!user) return res.status(404).send('User Not Found');

            await user.destroy();
            res.json(user);

        }catch (err){
            res.status(500),send(err.message);
        }
    
    };
}

module.exports = UserController;
const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller');
const auth = require('../middleware/auth')

router.get('/users', auth, userController.getAllUsers);
router.post('/users/login', userController.login);
router.put('/users/edit/:id', userController.updateUser);
router.get('/users/:id', userController.getUserById);
router.post('/users/add', userController.createUser);
router.delete('/users/delete/:id', userController.deleteUser);

module.exports = router;
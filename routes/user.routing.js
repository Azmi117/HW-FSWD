const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller');
const auth = require('../middleware/auth');
const path = require('path');
const multer = require('multer');
const UserController = require('./../controller/user.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../upload"));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

  router.post('/users/upload/:id', upload.single('image_url'), UserController.upload)

router.get('/users', auth, userController.getAllUsers);
router.post('/users/login', userController.login);
router.put('/users/edit/:id', userController.updateUser);
router.get('/users/:id', userController.getUserById);
router.post('/users/add', userController.createUser);
router.delete('/users/delete/:id', userController.deleteUser);

module.exports = router;
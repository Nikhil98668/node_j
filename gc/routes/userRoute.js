const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');


router.post('/users/signup', usersController.createUser);
router.post('/users/signin', usersController.signUser);
router.get('/users/getAllUsers', auth.authenticate, usersController.getUsers);



module.exports = router;
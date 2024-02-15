// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.insertUser);
router.get('/users', userController.getAllUsers);
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;

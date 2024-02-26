// controllers/userController.js
const userModel = require('../models/userModel');

exports.insertUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userModel.insertUser(userData);
        res.json({ success: true, message: 'User inserted successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to insert user', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json({ success: true, message: 'Users fetched successfully', users: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        await userModel.deleteUser(userId);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete user', error: error.message });
    }
};

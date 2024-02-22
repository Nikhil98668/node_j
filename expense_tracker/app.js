const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const cors = require('cors');
const sequelize = require('./utils/database');

const app = express();

// Middleware to set Content-Security-Policy header
const User =require('./model/usersModel')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());

app.use('/', userRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/view/signup.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

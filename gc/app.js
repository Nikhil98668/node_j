const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/userRoute');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/manageGroup')));
app.use(userRoutes);
app.use('/', (req, res) => { 
    res.sendFile(path.join(__dirname, '/public/manageGroup/index.html')) 
});

sequelize.sync()
    .then(res => {
        app.listen(3000,console.log("listening"));
    })
    .catch(err => console.log(err));

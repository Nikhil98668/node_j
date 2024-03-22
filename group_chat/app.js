const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
//const server = require("http").createServer(app);
const path = require('path');
const helmet = require('helmet');
app.use(helmet());

const userRoutes = require('./routes/userRoute');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));


app.use(userRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/manageGroup/index.html'));
});

sequelize.sync()
    .then(res => {
        app.listen(3000);
    })
    .catch(err => console.log(err));

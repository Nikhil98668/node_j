const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const server = require("http").createServer(app);
const { setupSocketServer } = require('./util/socket');
const { job } = require('./services/cronJob');
const path = require('path');



setupSocketServer(server);
const chatRoutes = require('./routes/chatRoute');
const userRoutes = require('./routes/userRoute');
const groupsRoutes = require('./routes/groupsRoute');

const Users = require('./models/usersModel')
const Chats = require('./models/chatsModel')
const Groups = require('./models/groupsModel')

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(userRoutes);
app.use(chatRoutes);
app.use(groupsRoutes)
app.use('/', (req, res) => { 
    res.sendFile(path.join(__dirname, '/public/index.html')) 
});



Users.hasMany(Chats);
Chats.belongsTo(Users);

Users.hasMany(Groups)
Groups.belongsTo(Users)

Groups.hasMany(Chats)
Chats.belongsTo(Groups)

job.start();

sequelize.sync()
    .then(res => {
        app.listen(3000,console.log("listening"));
    })
    .catch(err => console.log(err));

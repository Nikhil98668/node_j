const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const fs = require('fs');
const https = require('https')
const bodyParser =require('body-parser')
const sequelize = require('./utils/database')
const path = require('path')
const helmet =require('helmet');
const morgan = require('morgan');


const adminRoute = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoute = require('./routes/purchaseRoutes');
const Downloads = require('./model/downloadedReportsModel');
const premiumUserRoutes = require('./routes/premiumFeaturesRoutes')
const PasswordRouter = require('./routes/resetPasswordRoutes')



const User =require('./model/usersModel');
const Expense =require('./model/expensesModel');
const Order = require('./model/ordersModel')
const Forgotpassword = require('./model/forgotpasswordModel');


const accessLogstream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(helmet());
app.use(morgan('combined',{stream:accessLogstream}))

//app.use('/', userRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/view/signup.html'));
});

app.use(adminRoute); 
app.use(userRoutes); 
app.use(orderRoute); 
app.use('/premium',premiumUserRoutes)
app.use('/password',PasswordRouter)

User.hasMany(Expense,{foreignKey: 'usersTbId',sourceKey: 'id', onDelete:'CASCADE'});
Expense.belongsTo(User,{Constraints: true, onDelete: "CASCADE"});

User.hasMany(Order,{foreignKey: 'usersTbId',sourceKey: 'id', onDelete:'CASCADE'})
Order.belongsTo(User,{Constraints: true, onDelete: "CASCADE"})

User.hasMany(Downloads,{foreignKey: 'usersTbId',sourceKey: 'id', onDelete:'CASCADE'})
Downloads.belongsTo(User,{Constraints: true, onDelete: "CASCADE"})

User.hasMany(Forgotpassword,{foreignKey: 'usersTbId',sourceKey: 'id', onDelete:'CASCADE'});
Forgotpassword.belongsTo(User,{Constraints: true, onDelete: "CASCADE"});



sequelize.sync()
    .then(res=>{ app.listen(3000) })
    .catch(err=>console.log(err))
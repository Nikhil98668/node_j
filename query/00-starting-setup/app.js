const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const User = require('./models/user');


const errorController = require('./controllers/error');

const app = express();

const sequelize=require('./util/database');

app.set('view engine', 'ejs');
app.set('views', 'views');

Product.belongsTo(User,{constraints: true,onDelete:'CASCADE'});
User.hasMany(Product);


sequelize.sync().then(result=>{
    return User.findById(1);
    console.log(result);
}).catch(err =>{
    console.log(err);
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
    User.findById().then(user =>{
        req.user=user;
        next();

    }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);

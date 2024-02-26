
/*const Cart=require('./cart');
const db=require('../util/database.js');


module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('insert into products(title,price,imageUrl,description) values(?,?,?,?)',[this.title,this.price,this.imageUrl,this.description]);
  }
  static deleteById(id)
  {
    
  }

  static fetchAll() {
    return db.execute('select * from products');
  }

  static findById(id)
  {
    return db.execute('select * from products where products.id=?',[id])
  }
};*/

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product=sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  title:Sequelize.STRING,
  price:{
    type:Sequelize.DOUBLE,
    allowNull:false
  },
  imageUrl:{
    type:Sequelize.STRING,
    allowNull:false
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false
  }
});
module.exports=Product;
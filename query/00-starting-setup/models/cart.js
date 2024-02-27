/*const fs=require('fs');
const path=require('path');
const { deleteProducts } = require('../controllers/admin');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports=class Cart{
   static addProduct(id,productPrice)
   {
        fs.readFile(p,(err,fileContent)=>{
            let cart={products:[],totalPrice:0};
            if(!err)
            {
                cart=JSON.parse(fileContent);
            }
            const existingProductIndex=cart.products.findIndex(prod=>prod.id===id);
            const existingProduct=cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct)
            {
                updatedProduct={...existingProduct};
                updatedProduct.qty+=1;
                cart.products=[...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
            }
            else{
                updatedProduct={id:id, qty:1};
                cart.products=[...cart.products,updatedProduct];

            }
            cart.totalPrice=cart.totalPrice+ +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
            });
        });
   } 
static deleteProduct(id,price)
{
    fs.readFile(p,(err,fileContent)=>{
        if(err)
        {
            return;
        }
       
            const updatedCart={...JSON.parse(fileContent)};
            const product=updatedCart.products.findIndex(prod => prod.id===id);
            const productQty=product.qty;
            updatedCart.products=updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice=updatedCart.totalPrice-productPrice*productQty;
        

    });

}



}*/
const Sequalize= require('sequelize');

const sequalize = require('../util/database');

const Cart=sequalize.define('cart',{
    id:{
        type: Sequalize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }

});
module.exports=Cart;
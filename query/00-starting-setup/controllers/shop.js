const Product = require('../models/product');
const Cart=require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
  })}).catch(err => {
    console.log(err);
  });
  /*Product.fetchAll().then(([rows,fieldData])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
  });

  }).catch(err => console.log(err));*/
    
};

exports.getProduct = (req,res,next)=>{
  const prodId=req.params.productId;
  Product.findAll({where :{id:prodId}}).then(product =>{
    res.render('shop/product-detail',{
      product:product[0],
      pageTitle:product[0].title,
      path:'/products'});
  }).catch(err => console.log(err));
  /*Product.findById(prodId).then((product)=>{
    res.render('shop/product-detail',{
      product:product,
      pageTitle:product.title,
      path:'/products'});
  }).catch(err => console.log(err));*/
  
  
 
  //console.log(prodId);
  //res.redirect('/');
};

//exports.postProducts

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
  })}).catch(err => {
    console.log(err);
  });

};

exports.getCart = (req, res, next) => {
  /*res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });*/
  
    req.user.getCart().then(cart =>{
      console.log(cart);
      return cart.getProducts(),then(products => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts
      })}).catch(err => console.log(err));


    });


};

exports.postCart = (req,res,next)=> {
  const prodId=req.body.productId;
  //console.log(prodId);
 /* Product.findById(prodId,(product)=>{
      Cart.addProduct(prodId,product.price);
  });
  res.redirect('/cart');*/
  let fetchhedCart;
    req.user.getCart()
    .then(cart =>{
      fetchedCart = cart;
      return cart.getProducts({where: {id : prodId}})
    })
    .then(products => {
      let product;   
      if(products.length > 0)
      {
        product=products[0];
      }
      let newQuantity =1;
      if(product)
      {
        const oldQuantity = product.cartItem.quantity;
        newQuantity=oldQuantity+1;
        return fetchhedCart.addProduct(product,{
          through : {quantity :newQuantity }
        });
      }
      return Product.findById(prodId).then(product => {
        return fetchedCart.addProduct(product,{ through : {quantity :newQuantity } })
      }).catch(err => console.log(err));
    })
    .catch(err => console.log(err));

};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
exports.postCartDeleteProducts = (req,res,next) =>{
const prodId=req.body.productId;
req.user.getCart().then(cart => {
  return cart.getProducts({ where: {id :prodId}});
})
.then(products=>{
  const product=products[0];
  product.cartItem.destroy();
})
.then(result=>{
  res.redirect('/cart');
})
};

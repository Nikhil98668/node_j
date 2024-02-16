const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description,
    userId:req.user.id
  }); 
  /*const product = new Product(title, imageUrl, description, price);
  product.save().then(()=>{
    res.redirect('/');

  }).catch(err=>console.log(err));*/
  Product.create({
    
   
  }).then(result=>{
    console.log(result);
  }).catch(err=>{
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode)
  {
    return res.redirect('/');
  }
  const prodId=req.params.productId;
  req.user.getProducts({where : {id:prodId}})
  .then(product =>{
    if(!product)
    {
      res.redirect('/');
    }
    else{
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product,
      
    });
}}).catch(err => console.log(err));
  
  
};

exports.postEditProduct=(req,res,next) => {

  
}

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products =>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
  })}).catch(err => console.log(err));
    
    
};

exports.postDeleteProduct = (req,res,next) =>
{
  const prodId=req.params.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};

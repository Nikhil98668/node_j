const products=require('../models/product');



exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  };

  //const products = [];

  exports.postAddproduct = (req, res, next) => {
    //products.push({ title: req.body.title });
    const product=new products(req.body.title);
    product.save();
    res.redirect('/');
  };

  exports.getProducts= (req, res, next) => {
    //const products = adminData.products;
  products.fetchAll((pr)=>{
    res.render('shop', {
      prods: pr,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: pr.length > 0,
      activeShop: true,
      productCSS: true
    });
    });
   
  };
  
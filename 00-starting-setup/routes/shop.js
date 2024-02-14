const path = require('path');

const express = require('express');

//const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

const prod=require('../controllers/product')
router.get('/', prod.getProducts)
module.exports = router;

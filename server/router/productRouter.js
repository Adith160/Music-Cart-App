const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController')

router.post('/createProduct', productController.createProduct );
router.get('/getProductById/:product_id', productController.getProductById );
router.get('/getAllProductsByColor', productController.getAllProductsByColor );

module.exports= router;
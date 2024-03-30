const express = require('express')
const router = express.Router();
const invoiceController = require('../controllers/invoiceController')
const verifyUser = require('../middlewares/jwtMiddleware')

router.post('/createInvoice/:inv_id',verifyUser, invoiceController.createInvoice );
router.post('/addToCart',verifyUser, invoiceController.addToCart );
router.get('/getAllInvoices',verifyUser, invoiceController.getAllInvoices );
router.get('/getInvoiceById/:inv_id',verifyUser, invoiceController.getInvoiceById );
router.get('/getMyCart',verifyUser, invoiceController.getMyCart );

module.exports= router;
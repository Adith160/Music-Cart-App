const express = require('express')
const router = express.Router();
const invoiceController = require('../controllers/invoiceController')
const verifyUser = require('../middlewares/jwtMiddleware')

router.post('/createInvoice',verifyUser, invoiceController.createInvoice );
router.get('/getAllInvoices',verifyUser, invoiceController.getAllInvoices );
router.get('/getInvoiceById/:inv_id',verifyUser, invoiceController.getInvoiceById );

module.exports= router;
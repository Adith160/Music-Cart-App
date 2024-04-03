const { Invoice, invoiceValidation } = require("../models/invoiceModel");

const createInvoice = async (req, res) => {
  try {
    const userId = req.user.id;
    const request = { ...req.body, user_ref_id: userId };
    const validationResult = invoiceValidation.validate(request);
    
    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.message,
        success: false,
      });
    }

    const existingInvoice = await Invoice.findOne({ user_ref_id: userId, placed: false });

    if (existingInvoice) {
      existingInvoice.set(request);
      await existingInvoice.save();
    } else {
      return res.status(404).json({
        message: "Invoice not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Invoice updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", success: false });
  }
};



const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const request = { ...req.body, user_ref_id: userId };
    const validationResult = invoiceValidation.validate(request);
    
    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.message,
        success: false,
      });
    }

    // Find an existing invoice where placed=false
    let invoice = await Invoice.findOne({ user_ref_id: userId, placed: false });

    if (invoice) {
      invoice.set(request); 
    } else {
      invoice = new Invoice(request);
    }

    await invoice.save();

    return res.status(201).json({
      message: "Mycart updated/added successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", success: false });
  }
};



const getAllInvoices = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const invoices = await Invoice.find({ user_ref_id: userId, placed: true });

      return res.status(200).json({
        message: "All invoices data retrieved successfully",
        data: invoices,
        success: true
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", success: false });
    }
  };

  const getInvoiceById= async (req, res) => {
    try {
      const userId = req.user.id;
      const invoiceId  = req.params.inv_id;
      const invoice = await Invoice.findOne({ _id: invoiceId, user_ref_id: userId });
  
      if (!invoice) {
        return res.status(404).json({
          message: "Invoice not found",
          success: false
        });
      }

      return res.status(200).json({
        message: "Invoice data retrieved successfully",
        data: invoice,
        success: true
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", success: false });
    }
  };

  const getMyCart = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const invoice = await Invoice.findOne({ user_ref_id: userId, placed: false });
  
      if (!invoice) {
        return res.status(404).json({
          success: false
        });
      }
  
      const { _id, __v, ...invoiceWithoutIdAndV } = invoice.toObject(); 
  
      const modifiedProducts = invoiceWithoutIdAndV.products.map(product => {
        const { _id, ...productWithoutId } = product;
        return productWithoutId;
      });
  
      // Calculate the number of products in the cart
      const numProducts = modifiedProducts.length;
  
      // Calculate the sum of the total of each product object
      let totalSum = 0;
      for (const product of modifiedProducts) {
        totalSum += product.total;
      }
  
      const modifiedInvoice = {
        ...invoiceWithoutIdAndV,
        products: modifiedProducts
      };
  
      return res.status(200).json({
        message: "MyCart data retrieved successfully",
        data: {
          invoice: modifiedInvoice,
          numProducts,
          totalSum
        },
        success: true
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", success: false });
    }
  };
  
  module.exports = { getAllInvoices, createInvoice, getInvoiceById, addToCart, getMyCart };

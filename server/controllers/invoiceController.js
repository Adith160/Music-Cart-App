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

    const invoiceData = new Invoice(request);
    await invoiceData.save();

    return res.status(201).json({
      message: "Invoice added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in creating invoice:", error);
    return res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

const getAllInvoices = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const invoices = await Invoice.find({ user_ref_id: userId });
  
      const invoicesData = invoices.map(invoice => ({
        address: invoice.address,
        id: invoice._id,
      }));
  
      return res.status(200).json({
        message: "All invoices data retrieved successfully",
        data: invoicesData,
        success: true
      });
    } catch (error) {
      console.error("Error in getting all invoices:", error);
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
      console.error("Error in getting invoice by ID and user ID:", error);
      return res.status(500).json({ error: "Internal Server Error", success: false });
    }
  };
  
  module.exports = { getAllInvoices, createInvoice, getInvoiceById };

const { Invoice, invoiceValidation } = require("../models/invoiceModel");

// const createInvoice = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const invId  = req.params.inv_id;
//     const request = { ...req.body, user_ref_id: userId };
//     const validationResult = invoiceValidation.validate(request);
    
//     if (validationResult.error) {
//       return res.status(400).json({
//         message: validationResult.error.message,
//         success: false,
//       });
//     }

//     // Check if an invoice with the provided _id exists
//     const existingInvoice = await Invoice.findById(invId);

//     if (existingInvoice) {
//       // If an existing invoice is found, update it with the new data
//       existingInvoice.set(request);
//       await existingInvoice.save();
//     } else {
//       return res.status(404).json({
//         message: "Invoice not found",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "Invoice updated successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in updating invoice:", error);
//     return res.status(500).json({ error: "Internal Server Error", success: false });
//   }
// };

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

    // Find the invoice with placed=false and matching user_ref_id
    const existingInvoice = await Invoice.findOne({ user_ref_id: userId, placed: false });

    if (existingInvoice) {
      // If an existing invoice is found, update it with the new data
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
    console.error("Error in updating invoice:", error);
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
      // If an existing invoice is found, update it with the new data
      invoice.set(request); // Set the entire invoice data from the request
    } else {
      // If no existing invoice found, create a new one
      invoice = new Invoice(request);
    }

    await invoice.save();

    return res.status(201).json({
      message: "Mycart updated/added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in creating/updating invoice:", error);
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

  const getMyCart = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const invoice = await Invoice.findOne({ user_ref_id: userId, placed: false });
  
      if (!invoice) {
        return res.status(404).json({
          success: false
        });
      }
  
      // Remove _id and __v fields from invoice object
      const { _id, __v, ...invoiceWithoutIdAndV } = invoice.toObject(); // Convert Mongoose document to plain JavaScript object
  
      // Remove _id field from each product object
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
  
      // Create a new invoice object without _id and __v for products
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
      console.error("Error in getting MyCart:", error);
      return res.status(500).json({ error: "Internal Server Error", success: false });
    }
  };
  
  
  
  
  module.exports = { getAllInvoices, createInvoice, getInvoiceById, addToCart, getMyCart };

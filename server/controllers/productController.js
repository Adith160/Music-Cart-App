const { Product, productValidation } = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
      success: true
    });
  } catch (error) {
    console.error("Error in getting products by color:", error);
    return res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

const getProductById = async (req, res) => {
    try {
      const product_id = req.params.product_id;
  
      // Find the product by ID
      const product = await Product.findById(product_id);
  
      // If product not found, return 404 Not Found
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
          success: false
        });
      }
  
      // Send the extracted product details as a response
      return res.status(200).json({
        message: "Product details retrieved successfully",
        data: product,
        success: true
      });
    } catch (error) {
      console.error("Error in getting product by ID:", error);
      return res.status(500).json({ error: "Internal Server Error", success: false });
    }
  };

  const createProduct = async (req, res) => {
    try {
      // Extract product data from request body
      const productData = req.body;
  
      // Validate product data using Joi schema
      const validationResult = productValidation.validate(productData);
      if (validationResult.error) {
        return res.status(400).json({
          message: validationResult.error.message,
          success: false
        });
      }
  
      // Create a new product
      const newProduct = new Product(productData);
  
      // Save the new product to the database
      await newProduct.save();
  
      // Send success response
      return res.status(201).json({
        message: "Product created successfully",
        success: true
      });
    } catch (error) {
      console.error("Error in creating product:", error);
      return res.status(500).json({ error: "Internal Server Error", success: false });
    }
  };

module.exports = { getAllProducts, getProductById, createProduct };

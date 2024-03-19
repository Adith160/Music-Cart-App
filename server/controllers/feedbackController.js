const { Feedback, feedbackValidation } = require("../models/feedbackModel");

const createFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const request = { ...req.body, user_ref_id: userId };
    const validationResult = feedbackValidation.validate(request);
    
    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.message,
        success: false,
      });
    }

    const feedbackData = new Feedback(request);
    await feedbackData.save();

    return res.status(201).json({
      message: "Feedback added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in creating feedback:", error);
    return res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

const getFeedbackCat = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all feedbacks for the user and select only the 'type' field
    const categories = await Feedback.find({ user_ref_id: userId }).select("type");

    // Check if any categories are found
    if (categories.length === 0) {
      return res.json({
        message: "No records found",
        success: false,
      });
    }

    // Send the fetched categories as a response
    return res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
      success: true,
    });
  } catch (error) {
    console.error("Error in getting feedback types:", error);
    return res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

module.exports = { createFeedback, getFeedbackCat };

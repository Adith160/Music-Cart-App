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

module.exports = { createFeedback };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const feedbackSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    user_ref_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = {
    Feedback,
    feedbackValidation: Joi.object({
        type: Joi.string().required(),
        feedback: Joi.string().required(),
        user_ref_id: Joi.string().required(), 
    }),
};

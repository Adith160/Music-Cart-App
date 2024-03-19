const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const invoiceSchema = new Schema({
    user_ref_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});

const invoiceValidationSchema = Joi.object({
    user_ref_id: Joi.string().hex().length(24).required(),
    product_id: Joi.string().hex().length(24).required(),
    address: Joi.string().required(),
    paymentType: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(), 
    total: Joi.number().positive().required(), 
});

module.exports = {
    Invoice: mongoose.model("Invoice", invoiceSchema),
    invoiceValidation: invoiceValidationSchema,
};

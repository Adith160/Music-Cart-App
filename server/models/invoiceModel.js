const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const invoiceSchema = new Schema({
    user_ref_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    address: {
        type: String,
    },
    placed: {
        type: Boolean,
        default: false,
    },
    paymentType: {
        type: String,
    },
    totQty: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    delivery: {
        type: Number,
    },
    grandtotal: {
        type: Number,
    },
    products: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product', 
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
    }],
});

const invoiceValidationSchema = Joi.object({
    user_ref_id: Joi.string().required(),
    address: Joi.string().optional(),
    placed: Joi.boolean().optional(),
    paymentType: Joi.string().optional(),
    totQty: Joi.number().integer().min(1).optional(),
    discount: Joi.number().optional(),
    delivery: Joi.number().optional(),
    grandtotal: Joi.number().positive().optional(),
    products: Joi.array().items(Joi.object({
        product_id: Joi.string().required(),
        qty: Joi.number().integer().min(1).required(),
        total: Joi.number().positive().required(),
    })).required(),
});

module.exports = {
    Invoice: mongoose.model("Invoice", invoiceSchema),
    invoiceValidation: invoiceValidationSchema,
};

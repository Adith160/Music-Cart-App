const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const productSchema = new Schema({
    images1: {
        type: String,
        required: true,
    },
    images2: {
        type: String,
        required: true,
    },
    images3: {
        type: String,
        required: true,
    },
    images4: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    },
    topFeatures: {
        type: String,
        required: true,
    },
});

const productValidationSchema = Joi.object({
    images1: Joi.string().required(),
    images2: Joi.string().required(),
    images3: Joi.string().required(),
    images4: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    color: Joi.string().required(),
    type: Joi.string().required(),
    brand: Joi.string().required(),
    about: Joi.string().required(),
    rating: Joi.number().min(0).max(5).default(0).required(),
    topFeatures: Joi.string().required(),
});

module.exports = {
    Product: mongoose.model("Product", productSchema),
    productValidation: productValidationSchema,
};

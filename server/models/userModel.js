const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    mobile: Joi.number().integer().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
    User: mongoose.model("user", userSchema),
    userValidation: userValidationSchema,
};

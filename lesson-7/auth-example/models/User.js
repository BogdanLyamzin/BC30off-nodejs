const {Schema, model} = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        match: emailRegexp,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {versionKey: false, timestamps: true});

const addUserSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
});

const schemas = {
    add: addUserSchema
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas
}


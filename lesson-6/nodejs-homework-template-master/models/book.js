const {Schema, model} = require("mongoose");
const Joi = require("joi");

const genreList = ["fantastic", "love"];
const isbnRegexp = /^[0-9]{3}-[0-9]{1}-[0-9]{3}-[0-9]{5}-[0-9]{1}$/;

const bookSchema = Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    genre: {
        type: String,
        enum: genreList,
        required: true
    },
    isbn: {
        type: String,
        match: isbnRegexp,
        required: true,
        unique: true
    }
}, {versionKey: false, timestamps: true});

const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().valueOf(...genreList).required(),
    isbn: Joi.string().pattern(isbnRegexp).required()
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    add: addSchema,
    updateFavorite: updateFavoriteSchema
}

const Book = model("book", bookSchema);
// categories => category
// mice => mouse

module.exports = {
    Book,
    schemas
};
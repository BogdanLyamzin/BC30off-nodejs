const {Schema, model} = require("mongoose");

const bookSchema = Schema({
    title: String,
    author: String
});

const Book = model("book", bookSchema);
// categories => category
// mice => mouse

module.exports = Book;
const fs = require("fs/promises");

const booksPath = require("./booksPath");

const updateBooks = async (books) => {
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
};

module.exports = updateBooks;
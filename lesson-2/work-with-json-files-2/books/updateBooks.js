const fs = require("fs/promises");

const updateBooks = async (books) => {
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
};

module.exports = updateBooks;
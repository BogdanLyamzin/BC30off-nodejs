const fs = require("fs/promises");

const booksPath = require("./booksPath");

const getAll = async ()=> {
    const data = await fs.readFile(booksPath);
    const books = JSON.parse(data);
    return books;
};

module.exports = getAll;
const updateBooks = require("./updateBooks");
const getAll = require("./getAll");

const updateById = async (id, title, author) => {
    const books = await getAll();
    const result = books.find(item => item.id === id);
    if(!result){
        return null;
    }
    result.title = title;
    result.author = author;
    await updateBooks(books);
    return result;
};

module.exports = updateById;
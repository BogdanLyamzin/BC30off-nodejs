const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

/*
1. Получить все книги.
2. Получить одну книгу по id.
3. Добавить книгу.
4. Обновить книгу по id.
5. Удалить книгу по id.
*/

const updateBooks = async (books) => {
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
}

const booksPath = path.join(__dirname, "books.json");

const getAll = async ()=> {
    const data = await fs.readFile(booksPath);
    const books = JSON.parse(data);
    return books;
}

const getById = async (id) => {
    const books = await getAll();
    const result = books.find(item => item.id === id);
    if(!result){
        return null;
    }
    return result;
}

const add = async (title, author) => {
    const books = await getAll();
    const newBook = {
        title,
        author,
        id: nanoid()
    };
    books.push(newBook);
    await updateBooks(books);
    return newBook;
};

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
}

const removeById = async (id) => {
    const books = await getAll();
    const idx = books.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    const [result] = books.splice(idx, 1);
    await updateBooks(books);
    return result;
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    removeById
}
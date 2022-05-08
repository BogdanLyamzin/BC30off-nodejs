const {createError} = require("../../helpers");

const books = require("../../models/books");

const updateById = async (req, res) => {
    const {id} = req.params;
    const {title, author} = req.body;
    const result = await books.updateById(id, title, author);
    if (!result) {
        throw createError(404);
    }
    res.json(result);
}

module.exports = updateById;
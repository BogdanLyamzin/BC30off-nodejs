const {createError} = require("../../helpers");

const books = require("../../models/books");

const removeById = async (req, res) => {
    const {id} = req.params;
    const result = await books.removeById(id);
    if (!result) {
        createError(404);
    }
    // res.status(204).send()
    res.json({
        message: "Book delete"
    })
};

module.exports = removeById;
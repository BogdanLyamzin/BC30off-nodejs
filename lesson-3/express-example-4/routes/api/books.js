const express = require("express");

const books = require("../../data/books");

const router = express.Router();

router.get("/", (req, res)=> {
    res.json(books);
});

router.get("/:id", (req, res)=> {
    res.json(books);
});

router.post("/", (req, res)=> {
    const newBook = {
        "id": "CTHE0f1kkWwqS5sL2tI8_",
        "title": "Girl genius",
        "author": "Foglio"
      };
    res.json(newBook);
});

module.exports = router;
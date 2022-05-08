const express = require("express");

const schemas = require("../../schemas/book");

const {ctrlWrapper} = require("../../helpers");

const {validation} = require("../../niddlewares");

const ctrl = require("../../controllers/books");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.add), ctrlWrapper(ctrl.add));

router.put("/:id", validation(schemas.add), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
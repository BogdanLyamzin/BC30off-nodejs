const express = require("express");
const Joi = require("joi");

const Book = require("../../models/book");

const {createError} = require("../../helpers");

const router = express.Router();

const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
});

// router.get("/", async(req, res, next)=> {
//     try {
//         const result = await books.getAll();
//         res.json(result);
//     } catch (error) {
//         next(error);
//         // res.status(500).json({
//         //     message: error.message
//         // })
//     }
// });

// router.get("/:id", async(req, res, next)=> {
//     try {
//         const {id} = req.params;
//         const result = await books.getById(id);
//         if(!result){
//             throw createError(404);
//             // const error = new Error("Not found");
//             // error.status = 404;
//             // throw error;
//             // res.status(404).json({
//             //     message: "Not found"
//             // });
//             // return;
//         }
//         res.json(result);
//     } catch (error) {
//        next(error);
//     }
// });

router.post("/", async(req, res, next) => {
    try {
        const {error} = schema.validate(req.body);
        if(error){ 
            throw createError(400, error.message);
        }
        const result = await Book.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

// router.put("/:id", async(req, res, next) => {
//     try {
//         const {error} = schema.validate(req.body);
//         if(error){ 
//             throw createError(400, error.message);
//         }
//         const {id} = req.params;
//         const {title, author} = req.body;
//         const result = await books.updateById(id, title, author);
//         if(!result){
//             throw createError(404);
//         }
//         res.json(result);
//     } catch (error) {
//         next(error);
//     }
// })

// router.delete("/:id", async(req, res, next) => {
//     try {
//         const {id} = req.params;
//         const result = await books.removeById(id);
//         if(!result){
//             createError(404);
//         }
//         // res.status(204).send()
//         res.json({
//             message: "Book delete"
//         })
//     } catch (error) {
//         next(error);
//     }
// })

module.exports = router;
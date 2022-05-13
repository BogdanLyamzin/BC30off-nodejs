const express = require("express");

const {Book, schemas} = require("../../models/book");

const {createError} = require("../../helpers");

const router = express.Router();

router.get("/", async(req, res, next)=> {
    try {
        const result = await Book.find({}, "-createdAt -updatedAt");
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await Book.findById(id, "-createdAt -updatedAt");
        // const result = await Book.findOne({_id: id}, "-createdAt -updatedAt");
        if(!result){
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
       next(error);
    }
});

router.post("/", async(req, res, next) => {
    try {
        const {error} = schemas.add.validate(req.body);
        if(error){ 
            throw createError(400, error.message);
        }
        const result = await Book.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        if(error.message.includes("validation failed")){
            error.status = 400;
        }
        next(error);
    }
});

router.put("/:id", async(req, res, next) => {
    try {
        const {error} = schemas.add.validate(req.body);
        if(error){ 
            throw createError(400, error.message);
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!result){
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.patch("/:id/favorite", async(req, res, next) => {
    try {
        const {error} = schemas.updateFavorite.validate(req.body);
        if(error){ 
            throw createError(400, error.message);
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!result){
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", async(req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndRemove(id);
        if(!result){
            createError(404);
        }
        // res.status(204).send()
        res.json({
            message: "Book delete"
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;
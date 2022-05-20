const express = require("express");

const {Book, schemas} = require("../../models/Book");

const {createError} = require("../../helpers");

const {auth} = require("../../middlewares");

const router = express.Router();

router.get("/", auth, async(req, res, next)=> {
    try {
        const {page, limit} = req.query;
        const {_id} = req.user;
        const skip = (page - 1) * limit;
        const result = await Book.find(
            {owner: _id}, 
            "-createdAt -updatedAt", {skip, limit: Number(limit)}).populate("owner", "email");
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", auth, async(req, res, next)=> {
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

router.post("/", auth, async(req, res, next) => {
    try {
        const {error} = schemas.add.validate(req.body);
        if(error){ 
            throw createError(400, error.message);
        }
        const result = await Book.create({...req.body, owner: req.user._id});
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
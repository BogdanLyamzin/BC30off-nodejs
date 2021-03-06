const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {User, schemas} = require("../../models/User");

const {createError} = require("../../helpers");

const router = express.Router();

const {SECRET_KEY} = process.env;

// signup
router.post("/register", async(req, res, next)=> {
    try {
        const {error} = schemas.add.validate(req.body);
        if(error) {
            throw createError(400, error.message);
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user) {
            throw createError(409, "Email in use");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await User.create({email, password: hashPassword});
        res.status(201).json({
            user: {
                email: result.email
            }
        })
    } catch (error) {
        next(error);
    }
});

// signin
router.post("/login", async(req, res, next)=> {
    try {
        const {error} = schemas.add.validate(req.body);
        if(error) {
            throw createError(400, error.message);
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            throw createError(401, "Email or password is wrong");
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            throw createError(401, "Email or password is wrong");
        }
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
        res.json({
            token,
            user: {
                email
            }
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;
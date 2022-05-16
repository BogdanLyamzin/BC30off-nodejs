const jwt = require("jsonwebtoken");
require("dotenv").config();

const payload = {
    id: "6282746a7f62547c24074d7a"
};

const {SECRET_KEY} = process.env;

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
// console.log(token);

const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const result = jwt.verify(`${token}2`, SECRET_KEY);
    console.log(result);
} catch (error) {
    console.log(error.message);
}
// CommonJS
// const nodemon = require("nodemon");

const users = require("./users");
//  console.log(users);

const {admins} = require("./users");
// console.log(admins);

// const {getCurrentMonth} = require("./date");
// const currentMonth = getCurrentMonth();

const currentMonth = require("./date").getCurrentMonth();

console.log(currentMonth);


















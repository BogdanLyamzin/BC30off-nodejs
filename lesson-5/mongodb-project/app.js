// C2khUNDymNanuSmv
const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://Bogdan:C2khUNDymNanuSmv@cluster0.jb00c.mongodb.net/books_reader?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
    .then(()=> console.log("Database connect"))
    .catch(error => console.log(error.message))
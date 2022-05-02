const express = require("express");

const app = express(); // app - веб-сервер

app.get("/", (request, response)=> {
    console.log(request.method);
    console.log(request.headers);
    response.send("<h2>Home page</h2>")
});

app.get("/contacts", (request, response)=> {
    response.send("<h2>Contacts page</h2>")
})

app.listen(4000, ()=> console.log("Server running"));
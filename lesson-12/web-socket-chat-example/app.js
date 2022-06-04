const ws = require("ws");

const wsServer = new ws.Server({port: 5000});

const users = [];

wsServer.on("connection", (newUser) => {
    users.push(newUser);
    newUser.on("message", (data)=> {
        const parseData = JSON.parse(data);
        const newData = JSON.stringify(parseData);
        users.forEach(user => {
            if(user !== newUser) {
                user.send(newData);
            }
        })
    })
})
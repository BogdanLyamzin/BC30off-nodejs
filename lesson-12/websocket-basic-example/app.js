const ws = new require("ws");

const wsServer = new ws.Server({port: 5000});

const clients = []

wsServer.on("connection", (newClient)=> {
    clients.push(newClient);
    // console.log("Новое соединение с фронтендом");
    setTimeout(() => {
        newClient.send("Добро пожаловать на наш веб-сокет сервер")
    }, 3000);
    
    clients.forEach(client => {
        if(client !== newClient) {
            client.send("К нам подключился новый человек")
        }
    })
});

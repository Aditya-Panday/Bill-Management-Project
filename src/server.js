const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("./data.json");
const middlewares = jsonServer.defaults();
const port =  8000; // you can use any port number here; i chose to use 3001

server.use(middlewares);
server.use(router);

server.listen(port);

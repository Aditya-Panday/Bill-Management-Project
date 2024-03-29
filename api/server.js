// api/server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('/data.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 8000; // Set the port to 8000 or use the environment port

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

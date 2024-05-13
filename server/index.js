const jsonServer = required("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.port || 8085;

server.use(middlewares);
server.use(router);

server.listen(port);
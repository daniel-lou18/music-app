const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data/music-data.json");

const middlewares = jsonServer.defaults({ static: "./dist" });

server.use(middlewares);
server.use(jsonServer.rewriter({ "/api/*": "/$1" }));
server.use(router);

const port = process.env.PORT || 3000;

server.listen(port, () =>
  console.log(`JSON Server is running on port: ${port}`)
);

const http = require("http");
const url = require("node:url");
require("dotenv").config();

const routes = {
  GET: {
    "/": (req, res, params) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<h1>Get Method => path ${params.query.name} ${params.query.age} /</h1> `
      );
    },
    "/home": (req, res, params) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<h1>Get Method => path /home ${params.query.name} ${params.query.age}</h1>`
      );
    },
  },
  POST: {
    "/": (req, res, params) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<h1>Post Method => path /</h1> ${params.query.name} ${params.query.age}`
      );
    },
    "/about": (req, res, params) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<h1>Post Method => path /about ${params.query.name} ${params.query.age}</h1>`
      );
    },
  },
  NA: (req, res, params) => {
    res.writeHead(404);
    res.end(
      `<h1>Page Not found ${params.query.name}  ${params.query.age}</h1>`
    );
  },
};
const start = (req, res) => {
  const method = req.method;
  const params = url.parse(req.url, true);
  const routeResolve = routes[method][params.pathname];
  if (routeResolve != null || routeResolve != undefined) {
    routeResolve(req, res, params);
  } else {
    routes["NA"](req, res, params);
  }
};
const server = http.createServer(start);

server.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}!`);
});

const http = require("http");
const url = require("node:url");
require("dotenv").config();
const qs = require("querystring");

const responder = (req, res, params) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(params);
};
const routes = {
  GET: {
    "/": (req, res) => {
      const filePath = __dirname + "/";
      responder(req, res, filePath);
    },
    "/index.html": (req, res) => {
      const filePath = __dirname + "/index.html";
      responder(req, res, filePath);
    },
    "/about.html": (req, res) => {
      const filePath = __dirname + "/about.html";
      responder(req, res, filePath);
    },
  },
  POST: {
    "/": (req, res) => {
      responder(req, res, `<h1>Post Method => path /</h1>`);
    },
    "/api/login": (req, res) => {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });

      req.on("end", () => {
        const query = qs.parse(body);
        console.log(`"Email":${query.email},"Password:${query.password}`);
        res.end();
      });
    },
  },
  NA: (req, res) => {
    responder(req, res, `<h1>Page Not found</h1>`);
  },
};
const start = (req, res) => {
  const method = req.method;
  const params = url.parse(req.url, true);
  const routeResolve = routes[method][params.pathname];
  if (routeResolve != null || routeResolve != undefined) {
    routeResolve(req, res);
  } else {
    routes["NA"](req, res);
  }
};
const server = http.createServer(start);

server.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}!`);
});

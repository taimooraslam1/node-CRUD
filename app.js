import http from "http";
import express from "express";

import logger from "morgan";
import bodyParser from "body-parser";
import routes from "./server/routes";

const hostname = "127.0.0.1";
const port = 5000;
const app = express();
const server = http.createServer(app);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

routes(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Bookstore",
  })
);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

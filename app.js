const express = require("express");
const morgan = require("morgan");

const usersRouter = require("./api/routers/users.router");

const app = express();

// Log all requests in combined format
app.use(morgan("combined"));

// Allow express to parse json requests
app.use(express.json());

app.use("/api/users", usersRouter);

module.exports = app;

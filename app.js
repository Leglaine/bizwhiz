const express = require("express");
const morgan = require("morgan");

const usersRouter = require("./api/routers/users.router");

const app = express();

// Log all requests in combined format
app.use(morgan("combined"));

app.use("/api/users", usersRouter);

module.exports = app;

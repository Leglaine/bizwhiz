const express = require("express");
const morgan = require("morgan");

const app = express();

// Log all requests in combined format
app.use(morgan("combined"));

module.exports = app;

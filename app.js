const express = require("express");
const morgan = require("morgan");

const usersRouter = require("./api/routers/users.router");

const app = express();

// Log all incoming HTTP/HTTPS requests in combined format
app.use(morgan("combined"));

// Allow express to parse json requests
app.use(express.json());

app.use("/api/users", usersRouter);

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;

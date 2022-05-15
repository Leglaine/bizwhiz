const express = require("express");
const morgan = require("morgan");

const accessTokensRouter = require("./api/routers/access-tokens.router");
const usersRouter = require("./api/routers/users.router");

const app = express();

// Log all incoming HTTP/HTTPS requests in combined format
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

// Allow express to parse json requests
app.use(express.json());

app.use("/api/access-tokens", accessTokensRouter);
app.use("/api/users", usersRouter);

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;

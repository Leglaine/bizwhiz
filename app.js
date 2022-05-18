const express = require("express");
const morgan = require("morgan");

const contactsRouter = require("./api/routers/contacts.router");
const tokensRouter = require("./api/routers/tokens.router");
const usersRouter = require("./api/routers/users.router");

const app = express();

// Log all incoming HTTP/HTTPS requests in combined format
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

// Allow express to parse json requests
app.use(express.json());

app.use("/api/tokens", tokensRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;

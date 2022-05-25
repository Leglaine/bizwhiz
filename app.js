const express = require("express");
const morgan = require("morgan");
const path = require("path");

const contactsRouter = require("./api/routers/contacts.router");
const tokensRouter = require("./api/routers/tokens.router");
const usersRouter = require("./api/routers/users.router");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "client", "views"));

// Log all incoming HTTP/HTTPS requests in combined format
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

// Allow express to parse json requests
app.use(express.json());

app.use("/api/tokens", tokensRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.get("/", (_req, res) => {
    res.render("home");
});

app.get("/signup", (_req, res) => {
    res.render("signup");
});

app.get("/login", (_req, res) => {
    res.render("login");
});

app.get("/reset-password", (_req, res) => {
    res.render("reset-password");
});

app.use("/public", express.static(path.join(__dirname, "client", "public")));

app.get("*", (_req, res) => {
    res.render("error", { message: "404 Not Found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;

const db = require("../db/models");

exports.searchUsers = async (req, res, next) => {
    try {
        res.status(200).json({ sample: "List of users" });
    } catch (err) {
        next(err);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        res.status(201).json({ sample: "User created!" });
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        res.status(200).json({ sample: "User details" });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        res.status(200).json({ sample: "User updated!" });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        res.status(200).json({ sample: "User deleted!" });
    } catch (err) {
        next(err);
    }
};

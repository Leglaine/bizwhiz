const db = require("../db/models");
const { hash } = require("bcrypt");

exports.searchUsers = async (req, res, next) => {
    try {
        res.status(200).json({ sample: "List of users" });
    } catch (err) {
        next(err);
    }
};

exports.createUser = async (req, res, next) => {
    const { email, password, confirmation } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    if (!confirmation) {
        return res.status(400).json({ message: "Confirmation is required" });
    }

    if (confirmation !== password) {
        return res
            .status(400)
            .json({ message: "Password confirmation failed" });
    }

    try {
        const result = await db.User.findAll({ where: { email: email } });

        if (result.length > 0) {
            return res
                .status(409)
                .json({ message: "A user with that email already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);

        await db.User.create({
            email: email,
            hash: hashedPassword
        });

        res.status(201).json({ message: "User created!" });
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

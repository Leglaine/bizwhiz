const db = require("../db/models");
const { hash } = require("bcrypt");

exports.searchUsers = async (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        res.status(200).json({ sample: "List of users" });
    } catch (err) {
        next(err);
    }
};

exports.createUser = async (req, res, next) => {
    const { givenName, familyName, email, password, confirmation } = req.body;

    if (!givenName) {
        return res.status(400).json({ message: "Given name is required" });
    }

    if (!familyName) {
        return res.status(400).json({ message: "Family name is required" });
    }

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

        const user = await db.User.create({
            given_name: givenName,
            family_name: familyName,
            email: email,
            hash: hashedPassword
        });

        res.status(201).json({
            message: "User created!",
            user: {
                id: user.dataValues.id,
                givenName: user.dataValues.given_name,
                familyName: user.dataValues.family_name,
                email: user.dataValues.email,
                createdAt: user.dataValues.createdAt,
                updatedAt: user.dataValues.updatedAt
            }
        });
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

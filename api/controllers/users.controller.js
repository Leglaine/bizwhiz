const db = require("../db/models");
const { sendVerificationEmail } = require("../services/email");
const { generateHexCode, hashPassword } = require("../services/cryptography");
const { requireFields } = require("../services/require-fields");

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

    const missingFields = requireFields({
        givenName,
        familyName,
        email,
        password,
        confirmation
    });

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(", ")}`
        });
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

        const hashedPassword = await hashPassword(password);

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

        if (process.env.NODE_ENV !== "test") {
            const code = generateHexCode(32);

            await db.VerificationCode.create({
                user_id: user.dataValues.id,
                code: code
            });

            await sendVerificationEmail(email, code);
        }
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

exports.verifyUser = async (req, res, next) => {
    const { code } = req.params;

    try {
        const result = await db.VerificationCode.findOne({
            where: { code: code }
        });

        if (!result) {
            return res
                .status(400)
                .json({ message: "Invalid verification code" });
        }

        await db.User.update(
            { is_verified: true },
            { where: { id: result.dataValues.user_id } }
        );

        await db.VerificationCode.destroy({ where: { code: code } });

        res.status(200).json({ message: "Verification successful!" });
    } catch (err) {
        next(err);
    }
};

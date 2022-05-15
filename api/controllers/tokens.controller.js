const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const db = require("../db/models");

exports.createTokens = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        const result = await db.User.findOne({ where: { email: email } });

        if (!result) {
            return res
                .status(400)
                .json({ message: "Incorrect email or password" });
        }

        const user = result.dataValues;
        const passwordIsCorrect = await compare(password, user.hash);

        if (!passwordIsCorrect) {
            return res
                .status(400)
                .json({ message: "Incorrect email or password" });
        }

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"
        });

        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

        res.status(201).json({
            message: "Tokens created!",
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (err) {
        next(err);
    }
};

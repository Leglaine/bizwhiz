const db = require("../db/models");

const {
    generateAccessToken,
    generateRefreshToken,
    validatePassword,
    validateRefreshToken
} = require("../services/cryptography");

exports.createTokens = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const result = await db.User.findOne({ where: { email: email } });

        if (!result) {
            return res
                .status(400)
                .json({ message: "Incorrect email or password" });
        }

        const user = result.dataValues;
        const isCorrectPassword = await validatePassword(password, user.hash);

        if (!isCorrectPassword) {
            return res
                .status(400)
                .json({ message: "Incorrect email or password" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await db.Token.create({
            token: refreshToken
        });

        res.status(201).json({
            message: "Tokens created!",
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (err) {
        next(err);
    }
};

exports.updateAccessToken = async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token required" });
    }

    try {
        const result = await db.Token.findOne({
            where: { token: refreshToken }
        });

        if (!result) {
            return res.status(400).json({ message: "Invalid refresh token" });
        }

        validateRefreshToken(refreshToken, (err, user) => {
            if (err) {
                return res
                    .status(400)
                    .json({ message: "Invalid refresh token" });
            }
            const accessToken = generateAccessToken(user);
            res.status(200).json({
                message: "Access token updated!",
                accessToken: accessToken
            });
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteRefreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token required" });
    }

    validateRefreshToken(refreshToken, err => {
        if (err) {
            return res.status(400).json({ message: "Invalid refresh token" });
        }
    });

    try {
        await db.Token.destroy({ where: { token: refreshToken } });
        res.status(200).json({ message: "Refresh token deleted!" });
    } catch (err) {
        next(err);
    }
};

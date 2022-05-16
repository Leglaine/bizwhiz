const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const db = require("../db/models");

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m"
    });
}

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

        const accessToken = generateAccessToken(user);

        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

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

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, user) => {
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
            }
        );
    } catch (err) {
        next(err);
    }
};

exports.deleteRefreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token required" });
    }

    try {
        await db.Token.destroy({ where: { token: refreshToken } });
        res.status(200).json({ message: "Refresh token deleted!" });
    } catch (err) {
        next(err);
    }
};

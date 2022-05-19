const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateHexCode(length) {
    return crypto.randomBytes(length).toString("hex");
}

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function validatePassword(password, hash) {
    const isCorrectPassword = await bcrypt.compare(password, hash);
    return isCorrectPassword;
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m"
    });
}

function validateAccessToken(accessToken, callback) {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, callback);
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

function validateRefreshToken(refreshToken, callback) {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, callback);
}

module.exports = {
    generateHexCode,
    hashPassword,
    validatePassword,
    generateAccessToken,
    validateAccessToken,
    generateRefreshToken,
    validateRefreshToken
};

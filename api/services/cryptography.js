const crypto = require("crypto");
const bcrypt = require("bcrypt");

function generateHexCode(length) {
    return crypto.randomBytes(length).toString("hex");
}

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

module.exports = { generateHexCode, hashPassword };

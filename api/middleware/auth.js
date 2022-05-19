const { validateAccessToken } = require("../services/cryptography");

function requireAuth(req, res, next) {
    const authHeader = req.headers["authorization"];

    // Make sure authorization header exists and separate token from prefix
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
        return res.status(401).json({ message: "Access token required" });
    }

    validateAccessToken(accessToken, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid access token" });
        }
        req.user = user;
        next();
    });
}

function checkRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
}

module.exports = { requireAuth, checkRole };

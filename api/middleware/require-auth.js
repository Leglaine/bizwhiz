const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
        return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid access token" });
        }
        req.user = user;
        next();
    });
};

module.exports = { requireAuth };

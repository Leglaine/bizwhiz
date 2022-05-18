function requireFields(...fields) {
    return (req, res, next) => {
        let missingFields = [];

        fields.forEach(field => {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(", ")}`
            });
        }

        next();
    };
}

module.exports = { requireFields };

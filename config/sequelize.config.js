if (
    process.env.NODE_ENV !== "production" ||
    process.env.NODE_ENV !== "staging"
) {
    require("dotenv").config();
}

module.exports = {
    development: {
        use_env_variable: "DATABASE_URL",
        dialect: "postgres",
        seederStorage: "sequelize"
    },
    test: {
        use_env_variable: "TEST_DATABASE_URL",
        dialect: "postgres"
    },
    staging: {
        use_env_variable: "DATABASE_URL",
        dialect: "postgres",
        seederStorage: "sequelize",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};
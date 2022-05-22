if (
    process.env.NODE_ENV !== "production" ||
    process.env.NODE_ENV !== "staging"
) {
    require("dotenv").config();
}

module.exports = {
    development: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: "bizwhiz-dev",
        host: "localhost",
        dialect: "postgres"
    },
    test: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: "bizwhiz-test",
        host: "localhost",
        dialect: "postgres"
    },
    staging: {
        use_env_variable: "DATABASE_URL",
        dialect: "postgres"
    }
};

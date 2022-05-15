const db = require("../api/db/models");

async function testConn() {
    try {
        await db.sequelize.authenticate();
        console.log("Database connection successfully established");
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}

testConn();

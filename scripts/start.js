const app = require("../app");
const db = require("../api/db/models");

const port = process.env.PORT || 8000;
const baseUrl = process.env.BASE_URL;

app.listen(port, async () => {
    console.log(`Server is now running at ${baseUrl}`);
    try {
        await db.sequelize.authenticate({ logging: false });
        console.log("Database connection successfully established");
    } catch (err) {
        console.error(err);
    }
});

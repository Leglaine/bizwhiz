const app = require("./app");

const port = process.env.PORT || 8000;
const baseUrl = process.env.BASE_URL || "http://localhost:8000";

app.listen(port, () => {
    console.log(`Server is now running at ${baseUrl}`);
});

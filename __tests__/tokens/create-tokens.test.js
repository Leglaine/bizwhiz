const request = require("supertest");
const { hash } = require("bcrypt");
const app = require("../../app");
const db = require("../../api/db/models");

describe("POST /api/tokens", () => {
    beforeAll(async () => {
        await db.User.destroy({ where: {} });

        const saltRounds = 10;
        const hashedPassword = await hash("123", saltRounds);
        await db.User.create({
            email: "johndoe@email.com",
            hash: hashedPassword
        });
    });

    afterAll(async () => {
        await db.User.destroy({ where: {} });
        await db.sequelize.close();
    });

    test("Returns the correct response if no email is provided", async () => {
        const response = await request(app).post("/api/tokens").send({
            email: "",
            password: "123"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Email is required");
    });

    test("Returns the correct response if no password is provided", async () => {
        const response = await request(app).post("/api/tokens").send({
            email: "johndoe@email.com",
            password: ""
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Password is required");
    });

    test("Returns the correct response if email is incorrect", async () => {
        const response = await request(app).post("/api/tokens").send({
            email: "doe@email.com",
            password: "123"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Incorrect email or password");
    });

    test("Returns the correct response if password is incorrect", async () => {
        const response = await request(app).post("/api/tokens").send({
            email: "johndoe@email.com",
            password: "1245"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Incorrect email or password");
    });

    test("Returns the correct response on success", async () => {
        const response = await request(app).post("/api/tokens").send({
            email: "johndoe@email.com",
            password: "123"
        });
        expect(response.status).toEqual(201);
        expect(response.body.message).toEqual("Tokens created!");
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.refreshToken).toBeDefined();
    });
});

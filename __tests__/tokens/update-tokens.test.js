const request = require("supertest");
const { hash } = require("bcrypt");
const app = require("../../app");
const db = require("../../api/db/models");

describe("PATCH /api/tokens", () => {
    let refreshToken;

    beforeAll(async () => {
        await db.User.destroy({ where: {} });
        await db.Token.destroy({ where: {} });

        const saltRounds = 10;
        const hashedPassword = await hash("123", saltRounds);
        await db.User.create({
            email: "johndoe@email.com",
            hash: hashedPassword
        });

        const response = await request(app).post("/api/tokens").send({
            email: "johndoe@email.com",
            password: "123"
        });

        refreshToken = response.body.refreshToken;
    });

    afterAll(async () => {
        await db.User.destroy({ where: {} });
        await db.Token.destroy({ where: {} });
        await db.sequelize.close();
    });

    test("Returns the correct response if no refresh token is provided", async () => {
        const response = await request(app).patch("/api/tokens").send({
            refreshToken: ""
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Refresh token required");
    });

    test("Returns the correct response if refresh token is invalid", async () => {
        const response = await request(app).patch("/api/tokens").send({
            refreshToken: "kjasbcjvjvjv"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid refresh token");
    });

    test("Returns the correct response on success", async () => {
        const response = await request(app).patch("/api/tokens").send({
            refreshToken: refreshToken
        });
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual("Access token updated!");
    });
});

/* eslint-disable no-undef */
const request = require("supertest");
const { hash } = require("bcrypt");
const app = require("../../app");
const db = require("../../api/db/models");

let refreshToken;

beforeAll(async () => {
    // Protect tests against improper teardown
    await db.User.destroy({ where: {} });
    await db.Token.destroy({ where: {} });

    // Create test user
    const hashedPassword = await hash("123", 10);
    await db.User.create({
        given_name: "John",
        family_name: "Doe",
        email: "johndoe@email.com",
        hash: hashedPassword
    });
});

afterAll(async () => {
    await db.User.destroy({ where: {} });
    await db.Token.destroy({ where: {} });
    await db.sequelize.close();
});

describe("POST /api/tokens", () => {
    test("Returns the correct response if no email is provided", async () => {
        const response = await request(app).post("/api/tokens").send({
            email: "",
            password: "123"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Missing required fields: email");
    });

    test("Returns the correct response if no password is provided", async () => {
        const response = await request(app).post("/api/tokens").send({
            email: "johndoe@email.com",
            password: ""
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual(
            "Missing required fields: password"
        );
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
        refreshToken = response.body.refreshToken;
    });
});

describe("PATCH /api/tokens", () => {
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

describe("DELETE /api/tokens", () => {
    test("Returns the correct response if no refresh token is provided", async () => {
        const response = await request(app).delete("/api/tokens").send({
            refreshToken: ""
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Refresh token required");
    });

    test("Returns the correct response if refresh token is invalid", async () => {
        const response = await request(app).delete("/api/tokens").send({
            refreshToken: "kvjhcghcjvhv"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid refresh token");
    });

    test("Returns the correct response on success", async () => {
        const response = await request(app).delete("/api/tokens").send({
            refreshToken: refreshToken
        });
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual("Refresh token deleted!");
    });
});

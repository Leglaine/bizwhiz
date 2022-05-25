/* eslint-disable no-undef */
const request = require("supertest");
const { hash } = require("bcrypt");
const app = require("../../app");
const db = require("../../api/db/models");

let userId;
let basicAccessToken;
let adminAccessToken;

beforeAll(async () => {
    // Protect tests against improper teardown
    await db.User.destroy({ where: {} });
});

afterAll(async () => {
    await db.User.destroy({ where: {} });
    await db.sequelize.close();
});

describe("POST /api/users", () => {
    test("Returns the correct response if no given name is provided", async () => {
        const response = await request(app).post("/api/users").send({
            givenName: "",
            familyName: "Doe",
            email: "johndoe@email.com",
            password: "123",
            confirmation: "123"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual(
            "Missing required fields: givenName"
        );
    });

    test("Returns the correct response if no family name is provided", async () => {
        const response = await request(app).post("/api/users").send({
            givenName: "John",
            familyName: "",
            email: "johndoe@email.com",
            password: "123",
            confirmation: "123"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual(
            "Missing required fields: familyName"
        );
    });

    test("Returns the correct response if no email is provided", async () => {
        const response = await request(app).post("/api/users").send({
            givenName: "John",
            familyName: "Doe",
            email: "",
            password: "123",
            confirmation: "123"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Missing required fields: email");
    });

    test("Returns the correct response if no password is provided", async () => {
        const response = await request(app).post("/api/users").send({
            givenName: "John",
            familyName: "Doe",
            email: "johndoe@email.com",
            password: "",
            confirmation: "123"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual(
            "Missing required fields: password"
        );
    });

    test("Returns the correct response if no confirmation is provided", async () => {
        const response = await request(app).post("/api/users").send({
            givenName: "John",
            familyName: "Doe",
            email: "johndoe@email.com",
            password: "123",
            confirmation: ""
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual(
            "Missing required fields: confirmation"
        );
    });

    test("Returns the correct response if confirmation fails", async () => {
        const response = await request(app).post("/api/users").send({
            givenName: "John",
            familyName: "Doe",
            email: "johndoe@email.com",
            password: "123",
            confirmation: "456"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Password confirmation failed");
    });

    test("Returns the correct response on success", async () => {
        const response = await request(app).post("/api/users").send({
            givenName: "John",
            familyName: "Doe",
            email: "johndoe@email.com",
            password: "123",
            confirmation: "123"
        });
        expect(response.status).toEqual(201);
        expect(response.body.message).toEqual("User created!");
        expect(response.body.user.email).toEqual("johndoe@email.com");
        expect(response.body.user.id).toBeDefined();
        expect(response.body.user.createdAt).toBeDefined();
        expect(response.body.user.updatedAt).toBeDefined();
        expect(response.body.user.hash).not.toBeDefined();
        userId = response.body.user.id;
    });

    test("Returns the correct response if email already exists", async () => {
        const response = await request(app).post("/api/users").send({
            givenName: "John",
            familyName: "Doe",
            email: "johndoe@email.com",
            password: "123",
            confirmation: "123"
        });
        expect(response.status).toEqual(409);
        expect(response.body.message).toEqual(
            "A user with that email already exists"
        );
    });
});

describe("GET /api/users", () => {
    beforeAll(async () => {
        const basicResponse = await request(app).post("/api/tokens").send({
            email: "johndoe@email.com",
            password: "123"
        });
        basicAccessToken = basicResponse.body.accessToken;

        const hashedPassword = await hash("123", 10);
        await db.User.create({
            given_name: "Jane",
            family_name: "Doe",
            email: "janedoe@email.com",
            hash: hashedPassword,
            role: "ADMIN"
        });

        const adminResponse = await request(app).post("/api/tokens").send({
            email: "janedoe@email.com",
            password: "123"
        });
        adminAccessToken = adminResponse.body.accessToken;
    });

    test("Returns the correct response if no access token is provided", async () => {
        const response = await request(app).get("/api/users");
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual("Access token required");
    });

    test("Returns the correct response if access token is invalid", async () => {
        const response = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer jkbdbbjbjb");
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual("Invalid access token");
    });

    test("Returns the correct response if user is not authorized", async () => {
        const response = await request(app)
            .get("/api/users")
            .set("Authorization", `Bearer ${basicAccessToken}`);
        expect(response.status).toEqual(403);
        expect(response.body.message).toEqual("Forbidden");
    });

    test("Returns the correct response on success", async () => {
        const response = await request(app)
            .get("/api/users")
            .set("Authorization", `Bearer ${adminAccessToken}`);
        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe("GET /api/users/:id", () => {
    test("Returns the correct response on success", async () => {
        const response = await request(app)
            .get(`/api/users/${userId}`)
            .set("Authorization", `Bearer ${basicAccessToken}`);
        expect(response.status).toEqual(200);
    });
});

describe("GET /api/users/verify/:code", () => {
    let bobId;

    beforeAll(async () => {
        const hashedPassword = await hash("123", 10);
        const result = await db.User.create({
            given_name: "Bob",
            family_name: "Smith",
            email: "bobsmith@email.com",
            hash: hashedPassword
        });

        bobId = result.dataValues.id;

        await db.VerificationCode.create({
            user_id: bobId,
            code: "123456"
        });
    });

    test("Returns the correct response if the verification code is invalid", async () => {
        const response = await request(app).get(
            "/api/users/verify/ftfthgfhfthf"
        );
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid verification code");
    });

    test("User is not verified", async () => {
        const result = await db.User.findOne({ where: { id: bobId } });
        expect(result.dataValues.is_verified).toEqual(false);
    });

    test("Returns the correct response on success", async () => {
        const response = await request(app).get("/api/users/verify/123456");
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual("Verification successful!");
    });

    test("User is verified", async () => {
        const result = await db.User.findOne({ where: { id: bobId } });
        expect(result.dataValues.is_verified).toEqual(true);
    });
});

describe("DELETE /api/users/:id", () => {
    test("Returns the correct response on success", async () => {
        const response = await request(app).delete(`/api/users/${userId}`);
        expect(response.status).toEqual(200);
    });
});

// TODO: Test updateUser
// TODO: Test resetPassword

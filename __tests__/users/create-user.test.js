const request = require("supertest");
const app = require("../../app");
const db = require("../../api/db/models");

describe("POST /api/users", () => {
    afterAll(async () => {
        await db.User.destroy({ where: {} });
        await db.sequelize.close();
    });

    test("Returns the correct response if no email is provided", async () => {
        const response = await request(app).post("/api/users").send({
            email: "",
            password: "123",
            confirmation: "123"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Email is required");
    });

    test("Returns the correct response if no password is provided", async () => {
        const response = await request(app).post("/api/users").send({
            email: "johndoe@email.com",
            password: "",
            confirmation: "123"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Password is required");
    });

    test("Returns the correct response if no confirmation is provided", async () => {
        const response = await request(app).post("/api/users").send({
            email: "johndoe@email.com",
            password: "123",
            confirmation: ""
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Confirmation is required");
    });

    test("Returns the correct response if confirmation fails", async () => {
        const response = await request(app).post("/api/users").send({
            email: "johndoe@email.com",
            password: "123",
            confirmation: "456"
        });
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Password confirmation failed");
    });

    test("Returns the correct response on success", async () => {
        const response = await request(app).post("/api/users").send({
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
    });

    test("Returns the correct response if email already exists", async () => {
        const response = await request(app).post("/api/users").send({
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

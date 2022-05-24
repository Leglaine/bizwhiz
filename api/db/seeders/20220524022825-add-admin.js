"use strict";

const { hash } = require("bcrypt");
const { v4 } = require("uuid");

module.exports = {
    async up(queryInterface, Sequelize) {
        const adminPassword = await hash(process.env.ADMIN_PASSWORD, 10);
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    id: v4(),
                    given_name: "Lexi",
                    family_name: "Wright",
                    email: "ehdubya@hotmail.com",
                    hash: adminPassword,
                    is_verified: true,
                    role: "ADMIN",
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            "users",
            { email: "ehdubya@hotmail.com" },
            {}
        );
    }
};

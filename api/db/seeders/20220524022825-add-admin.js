"use strict";

const { hashPassword } = require("../../services/cryptography");
const { v4 } = require("uuid");

const { ADMIN_GIVEN_NAME, ADMIN_FAMILY_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } =
    process.env;

module.exports = {
    async up(queryInterface, Sequelize) {
        const adminHash = await hashPassword(ADMIN_PASSWORD);
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    id: v4(),
                    given_name: ADMIN_GIVEN_NAME,
                    family_name: ADMIN_FAMILY_NAME,
                    email: ADMIN_EMAIL,
                    hash: adminHash,
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
        await queryInterface.bulkDelete("users", { email: ADMIN_EMAIL }, {});
    }
};

"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("verification_codes", {
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: {
                        tableName: "users"
                    },
                    key: "id"
                }
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("verification_codes");
    }
};

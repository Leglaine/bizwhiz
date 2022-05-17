"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("tokens", {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
            },
            token: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable("tokens");
    }
};

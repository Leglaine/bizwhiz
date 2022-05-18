"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("contacts", {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
            },
            parent_id: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: "contacts"
                    },
                    key: "id"
                }
            },
            is_company: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            is_client: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            is_vendor: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            is_advisor: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            title: {
                type: Sequelize.STRING
            },
            given_name: {
                type: Sequelize.STRING
            },
            middle_name: {
                type: Sequelize.STRING
            },
            family_name: {
                type: Sequelize.STRING
            },
            suffix: {
                type: Sequelize.STRING
            },
            company_name: {
                type: Sequelize.STRING
            },
            job_title: {
                type: Sequelize.STRING
            },
            display_name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            unit: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            province: {
                type: Sequelize.STRING
            },
            country: {
                type: Sequelize.STRING
            },
            postal_code: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable("contacts");
    }
};

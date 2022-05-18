"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Contact extends Model {
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            // define associations here
        }
    }
    Contact.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            parent_id: {
                type: DataTypes.UUID,
                references: {
                    model: {
                        tableName: "contacts"
                    },
                    key: "id"
                }
            },
            is_company: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            is_client: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            is_vendor: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            is_advisor: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            title: DataTypes.STRING,
            given_name: DataTypes.STRING,
            middle_name: DataTypes.STRING,
            family_name: DataTypes.STRING,
            suffix: DataTypes.STRING,
            company_name: DataTypes.STRING,
            job_title: DataTypes.STRING,
            display_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            unit: DataTypes.STRING,
            city: DataTypes.STRING,
            province: DataTypes.STRING,
            country: DataTypes.STRING,
            postal_code: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "Contact",
            tableName: "contacts",
            underscored: true
        }
    );
    return Contact;
};

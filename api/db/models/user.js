"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define associations here
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            given_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            family_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            hash: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            role: {
                type: DataTypes.ENUM("BASIC", "ADMIN"),
                allowNull: false,
                defaultValue: "BASIC"
            }
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            underscored: true
        }
    );
    return User;
};

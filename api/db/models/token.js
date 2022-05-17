"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            // define associations here
        }
    }
    Token.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            sequelize,
            modelName: "Token",
            tableName: "tokens",
            underscored: true
        }
    );
    return Token;
};

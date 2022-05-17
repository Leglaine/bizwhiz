"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class VerificationCode extends Model {
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            // define associations here
        }
    }
    VerificationCode.init(
        {
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            sequelize,
            modelName: "VerificationCode",
            tableName: "verification_codes",
            underscored: true
        }
    );
    return VerificationCode;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class VerificationCode extends Model {}

    VerificationCode.init(
        {
            user_id: {
                type: DataTypes.UUID,
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

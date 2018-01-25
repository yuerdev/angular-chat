'use strict'
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        nikename: {
            type: DataTypes.STRING
        },
        register_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        active: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    },
        {
            freezeTableName: true,
            timestamps: false
        });
    sequelize.sync();

    return User;
};
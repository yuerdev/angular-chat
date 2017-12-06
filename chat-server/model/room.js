'use strict'
module.exports = function (sequelize, DataTypes) {
    var Room = sequelize.define('room', {
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true 
        },
        name: {
            type: DataTypes.STRING
        },
        create_date: {
            type: DataTypes.STRING
        },
        person_number: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        create_id: {
            type: DataTypes.INTEGER
        },
        active: {
            type: DataTypes.STRING
        }
    }, {
            freezeTableName: true,
            timestamps: false
        });
    return Room;
};
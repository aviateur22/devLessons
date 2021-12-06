const sequelize = require('../client');
const {DataTypes,Model} = require('sequelize');

class User extends Model{}

User.init({

    email :  DataTypes.STRING,
    password : DataTypes.STRING
},{
    sequelize,
    tableName:'user'
});
module.exports = User;
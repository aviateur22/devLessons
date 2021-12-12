const sequelize = require('../client');
const {DataTypes,Model} = require('sequelize');

class Role extends Model{}

Role.init({
    role:DataTypes.STRING

},
{
    sequelize,
    tableName:'role'
});

module.exports = Role;
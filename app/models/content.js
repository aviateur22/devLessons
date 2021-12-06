const sequelize = require('../client');
const {DataTypes,Model} = require('sequelize');

class Content extends Model{}

Content.init({
    file_url : DataTypes.STRING
},
{
    sequelize,
    tableName:'content'
})
module.exports = Content;
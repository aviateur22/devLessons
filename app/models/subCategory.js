const sequelize = require('../client');
const {DataTypes,Model} = require('sequelize');

class SubCategory extends Model{}

SubCategory.init({
    name:DataTypes.STRING
},
{
    sequelize,
    tableName:'sub_category'
})
module.exports = SubCategory;
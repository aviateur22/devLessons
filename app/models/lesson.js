const sequelize = require('../client');
const {DataTypes,Model} = require('sequelize');

class Lesson extends Model{}
Lesson.init({
    title : DataTypes.STRING
},
{
    sequelize,
    tableName:'lesson'
})
module.exports = Lesson;
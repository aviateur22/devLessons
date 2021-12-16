const sequelize = require('../client');
const {DataTypes,Model} = require('sequelize');

class LessonThematic extends Model{}
LessonThematic.init({
},
{
    sequelize,
    tableName:'lesson_thematic'
})
module.exports = LessonThematic;
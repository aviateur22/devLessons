const sequelize = require('../client');
const {DataTypes,Model} = require('sequelize');

class Thematic extends Model{}

Thematic.init({
    category:DataTypes.STRING,
    image_path:DataTypes.STRING

},{
    sequelize,
    tableName:'thematic'
})
module.exports = Thematic;
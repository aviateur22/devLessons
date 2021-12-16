const sequelize = require('../client');
const {DataTypes,Model} = require('sequelize');
const dayjs = require('dayjs');

class Lesson extends Model{

    get formatedDate(){        
        return ('Diffusée le : '+ dayjs(this.getDataValue('created_at')).format('DD/MM/YYYY'));

    }

    get titleName(){
        return ('Titre de la lecon: ' + this.title )

    }
}
Lesson.init({
    title : DataTypes.STRING,
},
{
    sequelize,
    tableName:'lesson',    
    
})
module.exports = Lesson;
const { Sequelize } = require('sequelize');
const dayjs = require('dayjs');

const sequelize  = new Sequelize(process.env.PGURL,{
    define: {
        updatedAt:{
            name:'updated_at', 
            get:()=>{
                return (this.get)

            },
        },
        updatedAt: 'updated_at', 
        createdAt: 'created_at',
        underscored: true,
        
    }
});

module.exports = sequelize;
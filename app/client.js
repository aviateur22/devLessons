const { Sequelize } = require('sequelize');

const sequelize  = new Sequelize(process.env.PGURL,{
    define: {
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        underscored: true
    }
});

module.exports = sequelize;
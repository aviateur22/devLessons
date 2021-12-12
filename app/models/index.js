const User = require('./user');
const Role = require('./role');
const Lesson = require('./lesson');
const Thematic = require('./thematic');
const SubCategory = require('./subCategory');
const Content = require('./content');

Thematic.hasMany(SubCategory,{
    foreignKey: 'thematic_id',
    as:'subCategories'
});

SubCategory.belongsTo(Thematic,{
    foreignKey:'thematic_id',
    as:'thematics'
})


SubCategory.hasMany(Lesson,{
    foreignKey:'sub_category_id',
    as:'lessons'

});

Lesson.belongsTo(SubCategory,{
    foreignKey:'sub_category_id',
    as :'subCatergory'
});

Lesson.belongsTo(User,{
    foreignKey:'user_id',
    as :'author'
});

User.hasMany(Lesson,{
    foreignKey:'user_id',
    as:'lessons'

});

User.hasOne(Role,{
    foreignKey:'role_id',
    as :'roles',
});

Role.hasMany(User,{
    foreignKey : 'role_id',
    as :'roles'
});

Lesson.belongsTo(Content,{
    foreignKey:'content_id',
    as:'content'
});

Lesson.belongsToMany(Thematic,{
    as : 'thematics',
    through:'lesson_thematic',
    foreignKey:'lesson_id',
    otherKey:'thematic_id'
});

Thematic.belongsToMany(Lesson,{
    as : 'lessons',
    through: 'lesson_thematic',
    foreignKey:'thematic_id',
    otherKey:'lesson_id'
});
module.exports = {User,Lesson,Thematic,SubCategory,Content};
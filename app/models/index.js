const User = require('./user');
const Lesson = require('./lesson');
const Thematic = require('./thematic');
const SubCategory = require('./subCategory');
const Content = require('./content');

SubCategory.belongsTo(Thematic,{
    foreignKey:'sub_category_id',
    as :'thematics'
});

Thematic.hasMany(SubCategory,{
    foreignKey : 'thematic_id',
    as:'subCategories'
});

SubCategory.hasMany(Lesson,{
    foreignKey:'sub_category_id',
    as:'lessons'

});

Lesson.belongsTo(SubCategory,{
    foreignKey:'sub_category_id',
    as :'subCatergory'
})

Lesson.belongsTo(User,{
    foreignKey:'user_id',
    as :'author'
});

User.hasMany(Lesson,{
    foreignKey:'user_id',
    as:'lessons'

});

Lesson.hasOne(Content,{
    foreignKey:'content_id',
    as:'content'
});


module.exports = {User,Lesson,Thematic,SubCategory,Content};
const User = require('./user');
const Lesson = require('./lesson');
const Thematic = require('./thematic');
const SubCategory = require('./subCategory');
const Content = require('./content');

Thematic.hasMany(SubCategory,{
    foreignKey: 'thematic_id',
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

Lesson.belongsTo(Content,{
    foreignKey:'content_id',
    as:'content'
});


Lesson.belongsTo(Thematic,{
    foreignKey:'thematic_id',
    as : 'thematic'
});

Thematic.hasMany(Lesson,{
    foreignKey: 'thematic_id',
    as : 'lessons'

});
module.exports = {User,Lesson,Thematic,SubCategory,Content};
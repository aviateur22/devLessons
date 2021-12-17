// eslint-disable-next-line no-undef
const { json } = require('express/lib/response');
const {Lesson ,Thematic} = require('../models/index');
const mainController = {

    homePage :async (req,res)=>{

        try{
            let lessons = null;
            let title = null;

            if(req.session.filterLesson){

                lessons = await Lesson.findAll({
                    order:[['created_at','DESC']],
                    include:[
                        'subCatergory',
                        'content',
                        {
                            association:'author',
                            attributes:['login']                       
                        },
                        {
                            association:'thematics',
                            where:{
                                'id': req.session.filterLesson.id 
                            }
                        },                
                    ]
                });

                title = req.session.filterLesson.thematic 
                delete req.session.filterLesson;
              

            }
            else{
                 lessons = await Lesson.findAll({
                    
                    limit:6,
                    order:[['created_at','DESC']],
                    include:[
                        'subCatergory',
                        'content',
                        {
                            association:'author',
                            attributes:['login']
                        },
                        {association:'thematics'},                
                    ]
                });

                title = 'Nos dernieres leçons';
            }

            const thematics = await Thematic.findAll();                       
            res.render('home',{
                thematics :thematics ,
                lessons: lessons,
                title : title
            });
        }
        catch(error){
            console.log(error);
            res.render('500', {error})
        }
        
    },

    loginPage : (req,res)=>{

        res.render('login');

    },

    signupPage : (req,res) =>{

        res.render('signup')

    },

    resetDatabasePage : (req,res) =>
    {
        res.render('resetDatabase');
    },  

    pageNotFound:async (req,res)=>{

        try{
            const thematics = await Thematic.findAll();
            
            console.log(thematics)
            res.status(404).render('404',{thematics});
        }
        catch(error){
            console.log(error);
            res.render('500', {error})
        }
    },

    pageUnknow : (req,res)=>{
        res.redirect('/404');
    },

    addLessonPage :async (req,res)=>{
        try{
            const thematics = await Thematic.findAll();
            //Mise en session des thematcs
            req.session.thematics = thematics;
            
            res.render('addLesson',{thematics});
        }
        catch(error){
            console.log(error);
            res.render('500', {error})
        }
    },

    getLessonAvailibility : async (req,res,next)=>{

        try {

            const lessons = await Lesson.findAll({
               
                limit:6,
                order:[['created_at','DESC']],
                include:[
                    'subCatergory',
                    'content',
                    {
                        association:'author',
                        attributes:['login']
                    },
                    {association:'thematics'},                
                ]
            });
            
            if(lessons){
                req.session.lessons = lessons;   
                
                for(const lesson of lessons){
                    
                    
                    if(lesson.subCatergory){
                        const subJSON =lesson.subCatergory.toJSON();                        
                    }
                    
                }
            }
            next();
    
            
        } catch (error) {
            console.log(error);
            next();
        }        
    },

    profilePage : (req,res)=>{
        res.render('profile')

    }



};
module.exports = mainController;
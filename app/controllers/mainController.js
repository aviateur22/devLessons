// eslint-disable-next-line no-undef
const {Lesson ,Thematic} = require('../models/index');
const mainController = {

    homePage :async (req,res)=>{

        try{
            const thematics = await Thematic.findAll();
            res.render('home',{thematics});
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

    classPage:(req,res)=>{

        const subject = req.params.subject;
        console.log(res.locals.data)

        if(isNaN(subject)){
            console.log(req.session);
            const result = req.session.lessons.find(element => element.lesson_name.toLowerCase() === subject.toLowerCase());

            if(!result){
                
                res.redirect('/404');   
            }
            else {
                res.render('lesson',{
                    title : subject
                });

            }            
        }
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

    getLessonAvailibility : (req,res,next)=>{
        
        Lesson.findAll().then((data)=>{
            req.session.lessons = data;
            next();
        }).catch((err)=>{
            console.log(err);
            next();
        });
      
    },

    profilePage : (req,res)=>{
        res.render('profile')

    }



};
module.exports = mainController;
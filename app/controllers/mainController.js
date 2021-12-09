// eslint-disable-next-line no-undef
const {Lesson ,Thematic} = require('../models/index');
const mainController = {

    homePage :(req,res)=>{

        res.render('home');
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

    pageNotFound:(req,res)=>{

        res.status(404).render('404');     
    },

    pageUnknow : (req,res)=>{
        res.redirect('/404');
    },

    addLessonPage : (req,res)=>{
        subjects = req.session.lessons;
        res.render('addLesson',{
            subjects : subjects
        });
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



};
module.exports = mainController;
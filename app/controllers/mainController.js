// eslint-disable-next-line no-undef
const dataMapper = require('../dataMapper');

const mainController = {

    homePage :(req,res)=>{

        res.render('home');
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
        
        dataMapper.getLesson((err,data)=>{

            if(!err){     
                
                req.session.lessons = data.rows; 
                res.locals.data= data.rows
                console.log(req.session);  
                next();
            }
            else{
                
                next();
            }            
        });
   

    },



};
module.exports = mainController;
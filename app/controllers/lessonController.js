const LessonAction = require('../src/LessonAction');
const {Lesson ,Thematic,Content,SubCategory} = require('../models/index');
const {awsGetFile} = require('../aws/controllers/awsFileController');
const { noExtendLeft } = require('sequelize/dist/lib/operators');

const lessonController = {


    /** */
    addLessonFile :async(req,res)=>{

        try{            
                /**Fichier a envoyer dans AWS S3 */
                const file = req.file;
                const {lesson_name,thematic_id,subcatgory_id} = req.body;    
                const user = req.session.user;                

                if(file && lesson_name && thematic_id && user){
                    
                    const data = {
                        file : file,
                        lessonName : lesson_name,
                        subcatgoryId:subcatgory_id,
                        thematicId: thematic_id,
                        user: user
                    }

                    //Verification droit utilisateur
                    if(user.role_id >=2 ){

                        //Verification du type de fichier
                        if(file){

                            console.log(file.mimetype)

                            if(file.mimetype === 'text/html'){                 
                                
                                const lessonAction = new LessonAction(data);
                                
                                const awsBucket = await lessonAction.addAWSFile();
                                    
                                if(awsBucket === true){

                                    const sqlDatabase = await lessonAction.AddSQLData();

                                    if(sqlDatabase === true){
                                        const thematics =  req.session.thematics;  
                                        const success ="Le fichier est sauvegardé"
                                        return res.status(505).render('addLesson',{thematics , success })
                                    }
                                    else{
                                    
                                        throw new Error('Erreur de sauvergarde postgreSql');      
                                    }

                                }else{
                                    
                                    throw new Error('Erreur de sauvergarde AWS');  

                                };                              
                               
                            }                
                        }
                        else {
        
                            throw new Error('Le fichier doit être de type html');        
                        }

                    }
                    else{

                        //Interdiction de mener l'action d'ecriture
                        throw new Error('L\'utilsateur n\'a pas le droit de mener l\'action d\'ecriture');  

                    }
                }
                else {
                     //Interdiction de mener l'action d'ecriture
                     throw new Error('Données manquante dans le formulaire');                   

                }
            }
        catch(err){            
            const thematics =  req.session.thematics;       
            const error = err.message;
            return res.status(505).render('addLesson',{thematics , error })
            //return res.status(400).send({error:'400'})
        }
    },

    /** */
    getSubcategory :async(req,res)=>{
        
        const thematicNumber = req.body;

        if(thematicNumber.category){
            const subcatgeories = await SubCategory.findAll({
                where:{
                    thematic_id : thematicNumber.category
                },
                include:['thematics']
            });

            if(subcatgeories){

               res.status(200).send(subcatgeories);
                
            }
        }
        else {

        }
    },

    readLessonFile:async(req,res)=>{

        try {
            
            const id = req.params.id;           
            if(id){
    
                const lesson =await Lesson.findByPk(id,{
                    include:['content']
                });
               
    
                if(lesson){
                    const fileUrl = lesson.content.file_url;
                
                    
                    //Si fichier keay de trouvé
                    if(fileUrl){
                        awsGetFile(fileUrl,(data)=>{  

                            //Si il y a une erreur
                            if(data.error){
                                
                                return res.status(505).render('500',{error : data.error});  
                            }                      
                            return res.render('lesson',{data : data , title: lesson.title }); 
    
                        })
                    }
                    else{

                        return res.status(404).render('404',{error : 'data.error'});  
                    }
                }
            }
            else{

                return res.status(404).render('404',{error : 'data.error'});  
            }
            
        } catch (error) {
           res.send(error) 
        }
    },

    /**Renvoie les lecons d'une thématique */
    getLessonsThematic:async (req,res)=>{

        try{
            const id =parseInt(req.params.id,10);       

            if(!isNaN(id)){

                const thematic = await Thematic.findByPk(id);
                
                req.session.filterLesson = { 'id' : id, 'thematic' : thematic.toJSON().category };
                console.log(thematic.toJSON().category);
                res.redirect('/');
            }
        }
        catch(error){

            console.log(error);
            res.render('500', {error})

        }     
    },

}
module.exports = lessonController;
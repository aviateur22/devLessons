const LessonAction = require('../src/LessonAction');

const lessonController = {


    /** */
    addLessonFile :async(req,res)=>{

        try{            
                /**Fichier a envoyer dans AWS S3 */
                const file = req.file;
                const {lesson_name,thematic_id} = req.body;    
                const user = req.session.user;                

                if(file && lesson_name && thematic_id && user){
                    
                    const data = {
                        file : file,
                        lessonName : lesson_name,
                        thematicId: thematic_id,
                        user: user
                    }

                    //Verification droit utilisateur
                    if(user.role_id >=2 ){

                        //Verification du type de fichier
                        if(file){

                            if(file.mimetype === 'application/pdf'){                 
                                
                                const lessonAction = new LessonAction(data);
                                
                                const awsBucket = await lessonAction.addAWSFile();
                                    
                                if(awsBucket === true){

                                    const sqlDatabase = await lessonAction.AddSQLData();

                                    if(sqlDatabase === true){

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
        
                            throw new Error('Le fichier doit être de type PDF');        
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
    }

}
module.exports = lessonController;
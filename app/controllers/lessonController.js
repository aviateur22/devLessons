const { now } = require('sequelize/dist/lib/utils');
const {awsUploadFile,awsDownloadFile} = require('../aws/controllers/awsFileController')
const {User,Lesson,Thematic,SubCategory,Content} = require('../models/index');
const lessonController = {

    
    /** */
    addLessonFile :async(req,res)=>{

        try{
                /**Fichier a envoyer dans AWS S3 */
                const file = req.file;

                if(file){

                    if(file.mimetype === 'application/pdf'){
                        const info = req.body.description;
                        const result = await awsUploadFile(file);
                        console.log(result.Key);

                        const lesson = {
                            title: 'my Lesson',  
                            
                        };
                        
                        
                        Lesson.create({
                               lesson,                
                            content:
                                {file_url: result.Key}
                            
                        },
                        {
                            include:['content']
                        }).then((data)=>{
                            res.send(data);

                        }).catch((err)=>{

                            res.status(505).send(err);

                        });                       
                    
                    }
        
                }
                else {

                    res.status(505).send('Le fichier doit être de type PDF');

                }
            }
        catch(err){

            res.status(505).send('erreur dans le transfert de fichier ' + err);
        }

        





    }

}
module.exports = lessonController;
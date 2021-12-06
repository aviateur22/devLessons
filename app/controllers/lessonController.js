const {awsUploadFile,awsDownloadFile} = require('../aws/controllers/awsFileController')

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
                        console.log(result.Location);

                        
                        return res.send('ok');
                    }
        
                }

            res.status(505).send('Le fichier doit être de type PDF');
        }
        catch(err){

            res.status(505).send('erreur dans le transfert de fichier ' + err);
        }

        





    }

}
module.exports = lessonController;
const {User,Lesson,Thematic,SubCategory,Content,LessonThematic} = require('../models/index');
const {awsUploadFile,awsDownloadFile} = require('../aws/controllers/awsFileController');


class LessonAction {

    #fileKey;
    #data;
    
    constructor(data){

        this.data = data
        this.addAWSFile();
        
    }

    set data(value){
        this.#data = value;
    }

    get data(){
        return this.#data;
    }

    set fileKey(value){
        this.#fileKey = value;
    }

    get fileKey(){
        return this.#fileKey;
    }


    /**
     * p
     */
    addAWSFile =async()=>{
        try {

            const result = await awsUploadFile(this.#data.file);   
            this.fileKey= result.Key;
            return true;
            
        } catch (error) {

           return({'error':'AWS - Erreur dans la sauvegarde du fichier'});
        }
    }

    /**
     * 
     */
    AddSQLData = async ()=>{      
        try{          
            const getThematic= await Thematic.findByPk(this.#data.thematicId);

            if(!getThematic){

                throw new Error('Thematique inconnue');
            }

            const getTitle= await Lesson.findOne({
                where:{
                    title : this.#data.lessonName
                }
            });

            if(getTitle){
                
                throw new Error('Titre deja existant');
            }
           
           
            const lessonCreate = await Lesson.create(
                {
                    title: this.#data.lessonName,
                    user_id:this.#data.user.id,          
                    content:[{
                        file_url :this.#fileKey
                    }]
                },
                {
                    include:['content']
                }
            );
            
            if(lessonCreate){                

                //Insertion lesson_id et thematic id dans la junction table
                const lessonThematic = await LessonThematic.create({
                    lesson_id: lessonCreate.dataValues.id,
                    thematic_id:this.#data.thematicId
                })

                if(lessonThematic){                    
                    return true;
                }
                return false;                
            }

            return false;
        }
        catch(error){

            console.log(error);
            return(error.message);
        }
    }
}
module.exports = LessonAction;
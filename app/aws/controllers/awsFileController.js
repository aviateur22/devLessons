const s3 = require('../client');
const fs = require('fs');

const awsFileController = {


    /**
     * upload an object
     * @param {object} file - contient les donnée du fichier
     * @returns 
     */
    awsUploadFile : (file)=>{
        try{
            const  fileStream = fs.createReadStream(file.path);
            const  param={
                Bucket:process.env.AWS_BUCKET_NAME,
                Body:fileStream,
                Key:file.filename
            };
            return  s3.upload(param).promise();
        }
        catch(err){
            console.log('Error de chargement dans AWS S3 : ' + err);
           throw new Error(err);
        }
    },

    /**
     * download a object
     * @param {object} fileKeys - nom du fichier dans AWS S3 
     * @returns 
     */
    awsGetFile : async (fileKeys, callback)=>{

        try{
           
            const  params={
                Bucket:process.env.AWS_BUCKET_NAME,           
                Key:fileKeys
            };
        
            s3.getObject(params,  function(err, data) {
                if (err){
                    console.log(err, err.stack); 
                    const error = {error :'erreur de chargement'}
                    return callback(error);
                } 
                const text = data.Body.toString('utf-8'); 
                callback(text);

            });

            //return s3.getObject(param).createReadStream();  
        }
        catch(err){
            console.log(err)
            return {error : err}
        }
    }   

}

module.exports =  awsFileController;
const database = require ('./database/database');
const path = require ('path');
const fs = require('fs');

const dataMapper = {

    createDataTable:(callback)=>{
      
        const routePath = process.cwd();
       
        const databaseFilePath = path.join(routePath ,'/data/create_data_table.sql');
        
        fs.readFile(databaseFilePath,'utf8',(err,data)=>{

            if(err){
                throw new Error(err);
            }  

            console.log(data);
            database.query(data,(err,result)=>{
                if(err){
                    throw new Error(err);
                }

                callback(result);

            })

                    
            
        });
    },

    /**
     * 
     * @param {function} callback 
     */
    getLesson : (callback)=>{

        const query = 'SELECT * FROM lesson;'
        database.query(query,callback);       

    }

};

module.exports=dataMapper;
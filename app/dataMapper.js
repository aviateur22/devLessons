const database = require ('./database/database');
const { promisify } = require('util');
const path = require ('path');
const fs = require('fs');
const res = require('express/lib/response');
const { error } = require('console');

const dataMapper = {

    createDataTable:async (callback)=>{
      
        try{
            const routePath = process.cwd();       
            //create table sql file
            const databaseFilePath = path.join(routePath ,'/data/create_data_table.sql');
    
            //data sql file
            const dataFilePath = path.join(routePath ,'/data/insert_data.sql');
    
            const readFile =promisify(fs.readFile);
            
            //chargement tables
            let queryText = await readFile(databaseFilePath,'utf8');
            let result = await database.query(queryText);
            
            //chargement des donnée
            queryText = await readFile(dataFilePath,'utf8');
            result = await database.query(queryText);
    
    
    
            callback(result);

        }
        catch(err){
            throw new Error(`erreur de chargement de table : ${err.message} `);
        }
       
    },

    /**
     * 
     * @param {function} callback 
     */
    getLesson : (callback)=>{

   
        const query = 'SELECT * FROM lesson;'
        database.query(query,(err,result)=>{

            if(!err){
                return callback(result.rows);
            }
            console.log('ffff')
            throw new Error('error : ' + err);

        });       

    }

};

module.exports=dataMapper;
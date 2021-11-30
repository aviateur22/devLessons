const database = require ('./database');

const dataMapper = {

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
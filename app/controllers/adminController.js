const dataMapper = require('../dataMapper');

const adminController = {

    resetDatabaseAction : (req,res)=>{

        token = req.body.token;

        if(token === 'fghgg'){
            try {

                dataMapper.createDataTable((result)=>{
                   
                   res.status(200).render('resetDatabase',{success:'Reset de la database effectuée'})

                });    

            } catch (error) {

                console.error('resetDatabaseAction : ' + error);
                res.status(505).render('resetDatabase',{error:'Il y a eu un problème'})
                
                
            }
            

        }else {
            res.status(401).render('resetDatabase',{error:'Mauvais token'})
        }

    }

    
}
module.exports = adminController;

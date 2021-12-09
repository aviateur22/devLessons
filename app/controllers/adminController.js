const dataMapper = require('../dataMapper');

const adminController = {

    resetDatabase : (req,res)=>{

        token = req.params.token;

        if(token === 'fghgg'){
            try {

                dataMapper.createDataTable((result)=>{
                    res.status(200).send(result);

                });    

            } catch (error) {

                res.status(505).send('Oupsss il ua une erreur')
                
            }
            

        }else {
            res.status(401).send('Mauvais token')
        }

    }

    
}
module.exports = adminController;

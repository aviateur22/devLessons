const dataMapper = require('../dataMapper');

const adminController = {

    resetDatabase : (req,res)=>{

        token = req.params.token;

        if(token === 'fghgg'){
            try {

                dataMapper.createDataTable((result)=>{

                   res.render('resetTable',{result});

                });    

            } catch (error) {

                console.error('ici' + error);
                res.render('500',{error});
                
            }
            

        }else {
            res.status(401).send('Mauvais token')
        }

    }

    
}
module.exports = adminController;

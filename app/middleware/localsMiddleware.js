const localsMiddleware = (req ,res,next)=>{

    // données pour les values des formulaireformulaires et
    if(req.body){
        res.locals.body = req.body;        
        
    }else{
        res.locals.body = {};
    }

    //Donner pour lister les lessons
    if(!req.session.lessons){
        console.log('create lessons array')
        req.session.lessons=[];
    }

    //Gestion session 
    if(req.session){        
        res.locals.session=req.session;
    }
    else{
        res.locals.session={};
        console.log(res.locals.session.user)
    }
    next(); 

}

module.exports = localsMiddleware;
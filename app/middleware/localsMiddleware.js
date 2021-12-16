const localsMiddleware = (req ,res,next)=>{

    // stocke les données des formulaires
    if(req.body){
        console.log(req.body)
        res.locals.body = req.body;        
        
    }else{
        res.locals.body = {};
    }

    
    //Gestion session 
    //Transfert à la vue l'objet session si existante
    // ou  un objet vide si pas de ssion initiliasé
    if(req.session){        
        res.locals.session=req.session;
    }
    else{
        res.locals.session={};        
    }

    //  //Donner pour lister les lessons
    // if(!req.session.lessons){       
    // }

    //Stocke les thematics de cours
    if(!req.session.thematics){
        req.session.thematics={}    
    }

    next(); 

}

module.exports = localsMiddleware;
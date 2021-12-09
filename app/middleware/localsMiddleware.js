const localsMiddleware = (req ,res,next)=>{

    // données pour les formulaire
    if(req.body){
        res.locals.body = req.body;
    }else{
        res.locals.body = {};
    }

    if(!req.session.lessons){
        console.log('create lessons array')
        req.session.lessons=[];
    }
    next(); 

}

module.exports = localsMiddleware;
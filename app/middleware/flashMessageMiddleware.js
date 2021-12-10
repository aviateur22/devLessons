const flashMessageMiddleware = (req ,res,next)=>{

    //initilisation flash message
    if(!req.session.flashMessage){
        req.session.flashMessage = {}
    }
    
    // verification données flash message  
    if(req.session.flashMessage.error){
        res.locals.error = req.session.flashMessage.error;
       
    }

    if(req.session.flashMessage.success){        
        res.locals.success = req.session.flashMessage.success;        
    }


    
    next(); 

}

module.exports = flashMessageMiddleware;
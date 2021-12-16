/**
 * Permet de gerer l'accé au page 
 */
const adminMiddleware = {

    /**
     * Page accessible par connexion
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    user:(req,res,next)=>{

        if(!req.session.user){

            return res.status(401).render('login',{error :'Meci de vous connecter pour accéder a cette page'})

        }
    },

    /**
     * Page reservé au personne de niveau teacher
     * @param {*} req 
     * @param {*} res 
     * @param {*} next  
     */
    teacher :(req,res,next)=>{

        if(!req.session.user){

            res.status(401).render('login',{error :'Meci de vous connecter pour accéder a cette page'})
        }
        else{
            if(req.session.user.role_id < 2){

                res.status(401).render('401',{error :'Désolé mais cette page est interdite'})

            }
            else{
                next();
            }
        }
    },

    /**
     * Page reservé au admin
     */
    admin : (req,res) =>{

        if(!req.session.user){

            res.status(401).render('login',{error :'Meci de vous connecter pour accéder a cette page'})
        }
        else{
            if(req.session.user.role_id <3){

                res.status(401).render('401',{error :'Désolé mais cette page est interdite'})

            }
            else{
                next();
            }
        }
    }



}
module.exports = adminMiddleware;
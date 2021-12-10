const bcrypt = require('bcrypt');
const {User} = require('../models/index');

const usercontroller ={

    loginAction :async (req, res)=>{    

        if(!req.body.mail || !req.body.password){

            return res.render('login',{ error: `Merci de remplir votre email et password` })
        }    

        const user = await User.findOne({
            where: {
                email:req.body.mail 
            }
        });       

        if(!user){
           
            return res.render('login',{ error: `Erreur sur votre compte ou mot de passe` })
        }

        const comparePassword = await bcrypt.compare(req.body.password , user.password);

        if(!comparePassword){

            return res.render('login',{ error: `Erreur sur votre compte ou mot de passe` })

        }
        const { id, email, login } = user;

        req.session.user = {

            id,
            login,
            email
        };

        res.redirect('/');
     

 
    },

    signupAction :async (req, res)=>{

        try{

            const {login, mail, password}= req.body

            if(!mail || !password){
    
                return res.render('signup',{ error: `Merci de remplir votre email et password` })
            }    
    
            const user = await User.findOne({
                where: {
                    email:mail 
                }
            });       
    
            if(user){
               
                return res.render('signup',{ error: `Un compte existe déjà avec cet email` })
            }
    
    
            const passwordHash =await bcrypt.hash(password,10);

            (async()=>{
                await User.create({
                    login: login,
                    email : mail,
                    password : passwordHash
                });

                req.session.flashMessage.success = 'Felication , vous pouvez vous connecter';
                res.redirect('/login')

    
            })()
    
    

        }
        catch(err){
            console.error(err.message);

            return res.status(505).render('login',{ error: `Oups il y a eut une erreur en creant votre compte` })
        }

      


       
        
    },

    logout(req, res){
       
        delete req.session.user;
        return res.redirect('/');
    },


}
module.exports = usercontroller;
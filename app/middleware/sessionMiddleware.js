const session = require('express-session');

let cookie;

if(process.env.SESSION_MINUTES){
   cookie = {
      maxAge: process.env.SESSION_MINUTES * 60 * 1000// 30 minutes
   }
}

const initSession = ()=>{
    return session({
        saveUninitialized: true,
        resave: true,
        secret: process.env.SESSION_SECRET ?? 'mot de passe pourri',
        cookie
    })
}

module.exports = initSession;
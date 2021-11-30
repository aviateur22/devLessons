const express = require('express');
const session = require('express-session');
require('dotenv').config();
const router = require('./app/router');
const app= express();
const PORT = process.env.PORT || 5000;

/**EJS */
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('assets'));

app.use(session({
    secret: 'fffgjfdfs!',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: (1000*60*60) // ça fait une heure
    }
}));

/**
 * Middleware pour tableau
 */
app.use((req,res,next)=>{

    if(!req.session.lessons){
        console.log('create lessons array')
        req.session.lessons=[];
    }
    next(); 
});


app.use(router);


app.listen(PORT , ()=>{
    console.log(`listning on http://localhost:${PORT}`);
});


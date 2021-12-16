const express = require('express');
const initSession = require('./app/middleware/sessionMiddleware');
const localsMiddleware = require('./app/middleware/localsMiddleware');
const flashMessageMiddleware = require('./app/middleware/flashMessageMiddleware');
require('dotenv').config();
const router = require('./app/router');
const app= express();
const PORT = process.env.PORT || 5000;

/**EJS */
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('assets'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//init session
app.use(initSession());

//locals 
app.use(localsMiddleware)

//flash message
app.use(flashMessageMiddleware);

app.use(router);

app.listen(PORT , ()=>{
    console.log(`listning on http://localhost:${PORT}`);
});


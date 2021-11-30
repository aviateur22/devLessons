const express = require('express');
const router = express.Router();
const mainController = require('./controllers/mainController')


/** */
router.get('/',mainController.getLessonAvailibility, mainController.homePage);

/** */
router.get('/learn/:subject',mainController.classPage);

/** */
router.get('/404',mainController.pageNotFound);

/** */
router.get('/add/lesson', mainController.addLessonPage)

//router.get('*',mainController.pageUnknow);


module.exports = router;
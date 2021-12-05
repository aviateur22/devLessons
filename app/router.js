const express = require('express');
const router = express.Router();
const mainController = require('./controllers/mainController');
const adminController = require('./controllers/adminController');


/** */
router.get('/',mainController.getLessonAvailibility, mainController.homePage);

router.get('/admin/reset_database/:token',adminController.resetDatabase)
/** */
router.get('/learn/:subject',mainController.classPage);

/** */
router.get('/404',mainController.pageNotFound);

/** */
router.get('/add/lesson', mainController.addLessonPage)

//router.get('*',mainController.pageUnknow);


module.exports = router;
const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const adminController = require('./controllers/adminController');
const lessonController = require('./controllers/lessonController');

/**initialisation de multer */
const multer = require('multer');
const upload = multer({dest : 'uploads/'})

/** */
router.get('/',mainController.getLessonAvailibility, mainController.homePage);

router.get('/admin/reset_database/:token',adminController.resetDatabase)
/** */
router.get('/learn/:subject',mainController.classPage);

/** */
router.get('/404',mainController.pageNotFound);

/** */
router.get('/add/lesson', mainController.addLessonPage)

/** */
router.post('/add/lesson',upload.single('file-lesson'),lessonController.addLessonFile)

//router.get('*',mainController.pageUnknow);


module.exports = router;
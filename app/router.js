const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const adminController = require('./controllers/adminController');
const lessonController = require('./controllers/lessonController');
const usercontroller = require('./controllers/userController');

/**initialisation de multer */
const multer = require('multer');
const upload = multer({dest : 'uploads/'})

/** */
router.get('/',mainController.getLessonAvailibility, mainController.homePage);

router.get('/admin/reset_database/:token',adminController.resetDatabase);
/** */
router.get('/learn/:subject',mainController.classPage);

/** */
router.get('/add/lesson', mainController.addLessonPage);

/** */
router.post('/add/lesson',upload.single('file-lesson'),lessonController.addLessonFile);

router.route('/login')
    .get(mainController.loginPage)
    .post(usercontroller.loginAction);

router.route('/signup')
    .get(mainController.signupPage)
    .post(usercontroller.signupAction);

/** */
router.get('/404',mainController.pageNotFound);




module.exports = router;
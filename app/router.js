const express = require('express');
const router = express.Router();
const adminMiddleware = require('./middleware/adminMiddleware');
const mainController = require('./controllers/mainController');
const adminController = require('./controllers/adminController');
const lessonController = require('./controllers/lessonController');
const usercontroller = require('./controllers/userController');

/**initialisation de multer */
const multer = require('multer');
const upload = multer({dest : 'uploads/'})

/** */
router.get('/', mainController.homePage);

/** */
router.get('/lessonsByThematic/:id',lessonController.getLessonsThematic);

/** */
router.get('/add/lesson',adminMiddleware.teacher,mainController.addLessonPage);

/** */
router.post('/add/lesson', upload.single('file-lesson'),lessonController.addLessonFile);

router.route('/login')
    .get(mainController.loginPage)
    .post(usercontroller.loginAction);

/** */
router.route('/signup')
    .get(mainController.signupPage)
    .post(usercontroller.signupAction);

/** */
router.route('/admin/reset_database')
    .get(adminMiddleware.admin,mainController.resetDatabasePage)
    .post(adminMiddleware.admin, adminController.resetDatabaseAction);

/** */
router.get('/admin/account', mainController.profilePage);

/** */    
router.get('/logout', usercontroller.logout);

/** */
router.get('/404',mainController.pageNotFound);

/** */
router.get('/lesson/:id', lessonController.readLessonFile);

//->Fetch
/**Recuperartion des sous catégories de thematic */
router.post('/getSubCategory',lessonController.getSubcategory)


module.exports = router;
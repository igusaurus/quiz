var express = require('express');
var router = express.Router();

var quizController    = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // Autoload :quizId
router.param('commentId', commentController.load); // Autoload :commentId

//Definicion de rutas de sesion
router.get('/login',    sessionController.new);
router.post('/login',   sessionController.create);
router.get('/logout',   sessionController.destroy);

// Definicion de rutas de  /quizes
router.get('/quizes',                      sessionController.autologout, quizController.index);
router.get('/quizes/:quizId(\\d+)',        sessionController.autologout, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.autologout, quizController.answer);

// Definicion de rutas de /quizes con privilegios
router.get('/quizes/new',                  sessionController.loginRequired, quizController.new);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);

router.get('/author', quizController.author);

router.get('/quizes/:quizId(\\d+)/comments/new',                      sessionController.autologout, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',                         sessionController.autologout, commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.autologout, commentController.publish);

module.exports = router;

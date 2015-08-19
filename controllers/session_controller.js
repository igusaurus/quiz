// MW Controlador de autenticacion:
exports.loginRequired = function (req, res, next) {
	if (req.session.user) {
		if (req.session.cookie.expires === 0) {
			res.redirect('/logout');
		} else {
			req.session.touch();
			next();
		}
	} else {
		res.redirect('/login');
	}
};

exports.autologout = function (req, res, next) {
	if (req.session.user) {
		if (req.session.cookie.expires === 0) {
			res.redirect('/logout');
		} else {
			req.session.touch();
			next();
		}
	} else {
		next();
	}
};

//GET  /login
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

//POST /login
exports.create = function(req, res) {
	var login    = req.body.login;
	var password = req.body.password;

	var userController = require('./user_Controller');
	userController.autenticar(login, password, function (error, user) {
		if (error) { // retornamos los errores de session
			req.session.errors = [{"message": "Se ha producido un error:" + error}];
			res.redirect("/login");
			return;
		}

		// creamos req.session.user
		req.session.user = {id: user.id, username: user.username};
		res.redirect(req.session.redir.toString());
	});
};

//GET  /logout
exports.destroy = function(req, res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};

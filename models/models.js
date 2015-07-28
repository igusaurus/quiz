var path = require('path');

// Carga del modelo ORM
var Sequelize = require('sequelize');

// Usar la BBDD SQLite
var sequelize = new Sequelize(null, null, null,
	                          {dialect: "sqlite", storage: "quiz.sqlite"}
	                         );

// importar la definicion de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// exportar la definicion de la tabla Quiz
exports.Quiz = Quiz;

// Inicializar la tabla
sequelize.sync().success(function() {
    // success ejecuta el manejador una vez creada la tabla
    Quiz.count().success(function (count){
    	if (count === 0) {
    		Quiz.create({pregunta:  'Capital de Italia',
    		             respuesta: 'Roma'
    		            }).success(function() {
    		            	console.log('Base de datos inicialiazada')});
    	}
    });	
});
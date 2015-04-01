'use strict';

var express      = require('express');
var session      = require('express-session');
var bodyParser   = require('body-parser');
var swig         = require('swig');
var mongoose     = require('mongoose');
var MongoStore   = require('connect-mongo')(session);
var database     = require('./database.server.service');
var routes       = require('../../config/routes.config');
var logger       = require('../utils/logger.console.service');

/**
 * Service qui permet de créer une instance de l'application PMS
 * @params {Number} port
 */
module.exports = function(port) {

    //Fichier de configuration
    global.config = require('../../config/parameters.config');

    //Création d'une application express
    var app = express();

    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');

    //Enleve le cache swig
    swig.setDefaults({ cache: false });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    //Connexion à la base de données MongoDB
    database.connect();

    /**
     * Configuration des sessions
     */
    var sessionStore = new MongoStore({
        db: 'tps',
        mongooseConnection : mongoose.connections[0]
    });
    var sessionMiddleware = session({
        secret: global.config.tokens.session,
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    });
    app.use(sessionMiddleware);

    //Chargement des routes
    routes(app);
    app.disable('etag');
    
    //Fichiers publics statiques
    app.use(express.static( __dirname + '/../../../public'));

    //Lancement du serveur sur le {port}
    app.listen(port);
    logger.console('info', 'Démarrage du serveur sur le port '+ port);
};
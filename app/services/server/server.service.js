'use strict';

var express      = require('express');
var bodyParser   = require('body-parser');
var swig         = require('swig');
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

    //Chargement des routes
    routes(app);
    app.disable('etag');
    
    //Fichiers publics statiques
    app.use(express.static( __dirname + '/../../../public'));

    //Lancement du serveur sur le {port}
    app.listen(port);
    logger.console('info', 'Démarrage du serveur sur le port '+ port);
};
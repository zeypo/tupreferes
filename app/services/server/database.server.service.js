'use strict';

var mongoose = require('mongoose');
var logger   = require('../utils/logger.console.service');
var config   = require('../../config/parameters.config');

/**
 * Permet de se conencter à une base de donnée MongoDB
 * @param config
 */
exports.connect = function(){

    var db = connection();
    //console.log(config);

    db.connection.on('connected', function () {
        logger.console('info', 'Connexion à la base de données : ' + config.db.host);
    });

    db.connection.on('error', function (err) {
        logger.console('alert', err);
    });

    db.connection.on('disconnected', function () {
        logger.console('warn', 'Déconnexion de la base de données');
    });

    return db;
};

/**
 * Méthode qui permet de se déconnecter de la base de données
 */
exports.disconnect = function() {
    mongoose.disconnect();
};

/**
 * Méthode qui permet de lancer un connexion à MongoDB
 */
var connection = function() {

    var options = {
        server: { socketOptions: { keepAlive: 1 } },
        user: config.db.user,
        pass: config.db.password
    };

    return mongoose.connect(config.db.host, options);
};
'use strict';

var frontController = require('../controllers/main.view.controller');


/**
 * Liste des routes
 * @param {Object} app
 * @param {Object} passport
 **/
module.exports = function(app) {

    /**
     * Controller front
     */
    app.get('/', frontController.generateFront);

};

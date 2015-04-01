'use strict';

var frontController      = require('../controllers/main.view.controller');
var storyApiController   = require('../controllers/story.api.controller');


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

    /**
     * Controller api
     */
    app.get('/api/story/create', storyApiController.create)

};

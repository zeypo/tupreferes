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
    app.get('/create', frontController.generateFront);

    /**
     * Controller api
     */
    app.post('/api/story/create', storyApiController.create)
    app.get('/api/story', storyApiController.getAll)
    app.get('/api/story/random', storyApiController.getRandom)
    app.get('/api/story/:id', storyApiController.get)

};

'use strict';

var randomstring = require('randomstring')

/**
 * Retoune la vue de l'app principale
 * @param {Object} req
 * @param {Object} res
 * @return {Object} res
 */
exports.generateFront = function(req, res) {
    
    res.render(__dirname + '/../views/layout.app.view.html');

};
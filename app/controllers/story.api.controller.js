'use strict';

var logger   = require('../services/utils/logger.console.service');
var response = require('../services/utils/response.server.service');
var Story    = require('../models/story.model');

/**
 * Récupére toutes les story
 * @param  {Object} req
 * @param  {Object} res
 * @return {Object} res
 */
exports.getAll = function(req, res) {

    Story
        .find(function(err, stories) {

            if(err) {
                response.error(res, 501, {errors : err});
            }

            response.success(res, 200, {stories : stories})

        });

};

/**
 * Recupére une story par id
 * @param  {Object} req
 * @param  {Object} res
 * @return {Object} res
 */
exports.get = function(req, res) {

    var id = req.params.id;
    
    Story
        .findById(id, function(err, story) {

            if(err) {
                response.error(res, '501', err)
            }

            response.success(res, '200', story);

        })

}

/**
 * Crée une story et l'enregistre en bdd
 * @param  {Object} req
 *   - author
 *   - theme
 *   - prefere1
 *   - prefere2
 *
 * @param  {Object} res
 * @return {Object} res
 */
exports.create = function(req, res) {

    var optParams = ['author', 'theme'];

    /**
     * On regarde si tous les paramètres sont correct ou existant
     * Dans le cas contraire on redirige une erreur
     */
    var errors = checkParameters(req.query);
    
    if(errors.length > 0) {
        response.error(res, 400, {errors : errors});
    }

    /**
     * On crée une nouvelle story en fonction des paramètres query
     */
    var story = new Story({
        prefere : [{
            title : req.query.prefere1
        }, {
            title : req.query.prefere2
        }]
    })

    optParams.forEach(function(param) {
        if(req.query[param] && req.query[param] != '') {
            story[param] = req.query[param];
        }
    });

    story.save(function(err) {

        if(err) {
            response.error(res, 501, err);
        }

        response.success(res, 200, story);
    
    })


};

var checkParameters = function(params) {

    var errors = [];

    if(!params.prefere1 || params.prefere1 == '') {
        errors.push('prefere1 ne peut pas être vide ou absent');
    }

    if(!params.prefere2 || params.prefere2 == '') {
        errors.push('prefere2 ne peut pas être vide ou absent');
    }

    return errors;
};
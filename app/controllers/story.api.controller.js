'use strict';

var _        = require('lodash');
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

            response.success(res, 200, {stories : story});

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
 * Récupére une story au hasard
 * @param  {Object} req
 * @param  {Object} res
 * @return {Object} res
 */
exports.getRandom = function(req, res) {

    if(!req.session.views) {
        req.session.views = [];
    }

    Story.count({}, function(err, count) {
        
        /**
         * On vérifie que la session n'a pas déja vu toutes les stories existantes
         */    
        if(count === req.session.views.length) {
            req.session.views = [];
        }

        Story
            .find({_id : { $nin: req.session.views } }, function(err, stories) {
                
                if(err) {
                    response.error(res, '501', err);
                }
                
                if(stories.length < 1) {
                    req.session.views = [];
                }

                /* On choisit une story au hasard dans les stories retournés */
                var story = _.sample(stories);

                /**
                 * On enregistre en session les stories que l'user
                 * à déja vu
                 */
                req.session.views.push(story._id);
                req.session.save();
                
                response.success(res, '200', story);
            
            })
    })

};

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

/**
 * Vote pour un paramétre de story
 * @param  {Object} req
 *   - prefer
 *
 * @param  {Object} res
 * @return {Object} res
 */
exports.vote = function(req, res) {

    var id   = req.params.id;
    var vote = req.query.vote;

    /**
     * On crée un array vote qui contiendra l'id de la story voter
     * pour empecher un utilisateur de voter plusieurs fois
     */
    if(!req.session.vote) {
        req.session.vote = [];
    }

    /**
     * Gestion des erreurs pour la requête
     * ! A déplacer dans un service
     */
    if(!vote || vote == '' || vote > 1 || vote < 0) {
        response.error(res, '400', 'Mauvaise requête. L\'argument vote ne peut pas être vide & doit être 1 ou 2.');
    }

    if(_.indexOf(req.session.vote, id) >= 0) {
        response.error(res, '400', 'L\'utilisateur à déja voté pour cette story');
    }

    Story
        .findById(id, function(err, story) {

            if(err) {
                response.error(res, '501', err);
            }

            story.prefere[vote].points++;
            
            story.save(function(err) {

                if(err) {
                    response.error(res, '501', err);
                }

                req.session.vote.push(story._id);
                response.success(res, 200, story);
            })

        });

}

/**
 * Verifie que les paramètres en url ne comporte pas d'erreurs
 * @param  {Object} params
 * @return {Array}  errors
 */
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
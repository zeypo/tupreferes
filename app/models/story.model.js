'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * User Schema
 */
var StorySchema = new Schema({
    author   : {type : String, trim : true, default : 'unknown'},
    points   : {type : Number, default : 0},
    theme    : {type : String },
    prefere  : [{
        _id    : false,
        title  : {type : String, required: true},
        points : {type : Number, default : 0}
    }]
}, { versionKey: false });

/**
 * Rend une story au hasard
 * @return {Object} story
 */
StorySchema.statics.random = function(callback) {
    
    this.count(function(err, count) {
        if (err) {
            return callback(err);
        }
    
        var rand = Math.floor(Math.random() * count);
        this.findOne().skip(rand).exec(callback);
    }.bind(this));

};

module.exports = mongoose.model('story', StorySchema, 'story');
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

module.exports = mongoose.model('story', StorySchema, 'story');
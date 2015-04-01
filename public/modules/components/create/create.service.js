'use strict';

function createService($http) {

    /**
     * Transform un object en post url
     * @param  {Object} data
     * @return {String} url
     */
    var ObjectToPost = function(data) {

        console.log(data);
        var url = '?';
        
        _.forEach(data, function(val, key) {
            url += key + '=' + val + '&';
        });

        return url.substr(0, url.length - 1);
    }

    this.createStory = function(story) {

        var url = ObjectToPost(story);

        return $http({
            method: "POST",
            url: '/api/story/create' + url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })

    };

}

angular.module('tpsApp').service('createService',['$http', createService]);
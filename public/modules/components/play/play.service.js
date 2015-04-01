'use strict';

function playService($http) {

    this.getSotries = function() {
        return $http.get('/api/story');
    };

    this.getRandomStory = function() {
        return $http.get('/api/story/random');
    }

}

angular.module('tpsApp').service('playService',['$http', playService]);
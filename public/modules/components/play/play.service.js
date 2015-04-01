'use strict';

function playService($http) {

    this.getSotries = function() {
        return $http.get('/api/story');
    };

    this.getRandomStory = function() {
        return $http.get('/api/story/random');
    }

    this.voteForPrefere = function(vote, id) {
        return $http({
            method: "POST",
            url: '/api/story/vote/' + id + '?vote=' + vote,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }
}

angular.module('tpsApp').service('playService',['$http', playService]);
'use strict';

function playCtrl($scope, playService) {

    var _this       = this;

    playService.getRandomStory().success(function(story) {
        _this.story = story.response;
    });

    $scope.reload = function() {
        playService.getRandomStory().success(function(story) {
            _this.story = story.response;
        });  
    }

    $scope.vote = function(vote) {
        playService.voteForPrefere(vote, _this.story._id).success(function(story) {
            console.log(story);
        })
    }
}

angular.module('tpsApp').controller('playCtrl',['$scope', 'playService', playCtrl]);
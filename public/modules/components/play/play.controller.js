'use strict';

function playCtrl($scope, playService) {

    var _this       = this;

    _this.story = 'Je suis la page play';

    playService.getRandomStory().success(function(story) {
        _this.story = story.response;
    });
}

angular.module('tpsApp').controller('playCtrl',['$scope', 'playService', playCtrl]);
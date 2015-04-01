'use strict';

function playCtrl($scope, playService) {

    var _this       = this;
    $scope.voted     = false;

    playService.getRandomStory().success(function(story) {
        _this.story = story.response;
    });

    $scope.reload = function() {
        
        $scope.voted = false;
        $scope.error = false;
        
        playService.getRandomStory().success(function(story) {
            _this.story = story.response;
        });  
    }

    $scope.vote = function(vote) {
        playService.voteForPrefere(vote, _this.story._id)
            .success(function(story) {
            
                $scope.voted = true;
                _this.story = story.response;

            })
            .error(function(res) {
                
                if(res.statusCode === '400') {
                    $scope.error = res.errors;
                }
            
            });
    }
}

angular.module('tpsApp').controller('playCtrl',['$scope', 'playService', playCtrl]);
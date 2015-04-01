'use strict';

function createCtrl($scope, createService) {

    var _this       = this;
    _this.validate  = false;

    $scope.createOne = function(story) {

        createService.createStory(story).success(function(result){
            _this.validate = true;
        });
    }
}

angular.module('tpsApp').controller('createCtrl',['$scope', 'createService', createCtrl]);
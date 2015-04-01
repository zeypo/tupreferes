'use strict';

function config($routeProvider, $locationProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl  : '/modules/components/play/play.view.html',
            controller   : 'playCtrl',
            controllerAs : 'play'
        })
        .when('/create', {
            templateUrl  : '/modules/components/create/create.view.html',
            controller   : 'createCtrl',
            controllerAs : 'create'
        })
        .otherwise('/');

    $locationProvider.html5Mode({enabled: true, requireBase: false});
}

angular.module('tpsApp',['ngRoute']).config(["$routeProvider", "$locationProvider" ,config]);
'use strict';

function config($routeProvider, $locationProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl  : '/modules/components/play/play.view.html',
            controller   : 'playCtrl',
            controllerAs : 'play',
            label        : 'Accueil'
        })
        .otherwise('/');

    $locationProvider.html5Mode({enabled: true, requireBase: false});
}

angular.module('tpsApp',['ngRoute']).config(["$routeProvider", "$locationProvider" ,config]);
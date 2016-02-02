'use strict';

function config($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: './views/instance.html',
            controller: 'instanceController',
            controllerAs: 'insCtrl'
        })
        .when('/input',{
            templateUrl: './views/input.html',
            controller: 'inputController',
            controllerAs: 'inputCtrl'
        })
        .when('/control',{
            templateUrl: './views/control.html',
            controller: 'controlController',
            controllerAs: 'controlCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}

angular
    .module('video-wall-app')
    .config(config);

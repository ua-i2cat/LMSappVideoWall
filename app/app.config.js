'use strict';

angular
    .module('video-wall-app')
    .config(config);

function config($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: '/app/instance/instance.html',
            controller: 'instanceController',
            controllerAs: 'insCtrl'
        })
        .when('/input',{
            templateUrl: '/app/input/input.html',
            controller: 'inputController',
            controllerAs: 'inputCtrl'
        })
        .when('/control',{
            templateUrl: '/app/control/control.html',
            controller: 'controlController',
            controllerAs: 'controlCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}



'use strict';

angular
    .module('video-wall-app')
    .config(config);

function config($routeProvider, ngDialogProvider){
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

    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: false,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true,
        appendTo: false,
        preCloseCallback: function () {
            console.log('default pre-close callback');
        }
    });
}



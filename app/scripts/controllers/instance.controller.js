'use strict';

function instanceController(apiFunctions, $scope, $timeout, $window){
    var vm = this;
    vm.instance = {};
    vm.connectInstance = function(){
        var message = {
            'host' : vm.instance.serverHostname,
            'port' : vm.instance.serverPort
        };

        sHost = vm.instance.serverHostname;
        sPort = vm.instance.serverPort;

        apiUri = 'http://'+ vm.instance.apiHostname +':'+ vm.instance.apiPort +'/api';

        apiFunctions.connect(message)
        .then(function succesCallback(response){
            $scope.mainCtrl.alertMessage = response;
            $scope.mainCtrl.successAlert = true;
            $timeout(function () {
                $scope.mainCtrl.successAlert = false;
            },1000);
            $window.location.href='#/input';
        }, function errorCallback(response) {
            $scope.mainCtrl.alertMessage = response;
            $scope.mainCtrl.errorAlert = true;
            $timeout(function () {
                $scope.mainCtrl.errorAlert = false;
            }, 2000);
        });

    };
}

angular
    .module('video-wall-app')
    .controller('instanceController', instanceController);
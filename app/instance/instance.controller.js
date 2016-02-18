'use strict';

angular
    .module('video-wall-app')
    .controller('instanceController', instanceController);

function instanceController(apiFunctions, $scope, $timeout, $window, instanceService){
    var vm = this;
    vm.instance = {};
    var message = {
        'host' : vm.instance.serverHostname,
        'port' : vm.instance.serverPort
    };

    sHost = vm.instance.serverHostname;
    sPort = vm.instance.serverPort;

    apiUri = 'http://'+ vm.instance.apiHostname +':'+ vm.instance.apiPort +'/api';
    vm.connectInstance = connectInstance;

    function connectInstance() {
        instanceService.connect(message)
            .then(
                function succesCallback(response) {
                    $scope.mainCtrl.alertMessage = response;
                    $scope.mainCtrl.successAlert = true;
                    $timeout(function () {
                        $scope.mainCtrl.successAlert = false;
                    }, 1000);
                    $window.location.href = '#/input';
                }
            )
            .catch(
                function errorCallback(response) {
                    $scope.mainCtrl.alertMessage = response;
                    $scope.mainCtrl.errorAlert = true;
                    $timeout(function () {
                        $scope.mainCtrl.errorAlert = false;
                    }, 2000);
                }
            );
    }


    /*function connectInstance(){
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

    };*/
}
'use strict';

function mainController(apiFunctions, $window, $scope, $timeout){
    var vm = this;

    vm.disconnectMain = function(){
        apiFunctions.disconnect()
        .then(function succesCallback(response){
            lmsPaths = [];
            listCrops = [];
            idCrops = 1;
            apiUri = null;
            sHost = null;
            sPort = null;
            $scope.mainCtrl.alertMessage = response;
            $scope.mainCtrl.successAlert = true;
            $timeout(function () {
                $scope.mainCtrl.successAlert = false;
            },1000);
            $window.location.href='/';
        }, function errorCallback(response){
            $scope.mainCtrl.alertMessage = response;
            $scope.mainCtrl.errorAlert = true;
            $timeout(function () {
                $scope.mainCtrl.errorAlert = false;
            }, 2000);
        });

    };

    vm.save = function(){
        console.log("save");
    };

    vm.open = function(){
        console.log("open");
    };

}

angular
    .module('video-wall-app')
    .controller('mainController', mainController);
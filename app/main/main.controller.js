'use strict';

angular
    .module('video-wall-app')
    .controller('mainController', mainController);

function mainController(apiFunctions, $window, $scope, $timeout){
    var vm = this;
    vm.listCrops = [];
    vm.disconnectMain = function(){
        apiFunctions.disconnect()
        .then(function succesCallback(response){
            lmsPaths = [];
            vm.listCrops = [];
            idCrops = 1;
            apiUri = null;
            sHost = null;
            sPort = null;
            vm.alertMessage = response;
            vm.successAlert = true;
            $timeout(function () {
                $scope.successAlert = false;
            },1000);
            $window.location.href='/';
        }, function errorCallback(response){
            vm.alertMessage = response;
            vm.errorAlert = true;
            $timeout(function () {
                vm.errorAlert = false;
            }, 2000);
        });

    };

    vm.save = function(){
        console.log("save");
    };

    vm.open = function(){
        console.log("open");
    };

    $scope.$on('msg', function(evt,msg){
        if (msg.state){
            vm.succesMain();
        } else {
            vm.errorMain(msg.response);
        }
    });

    vm.succesMain = function(){
        vm.successAlert = true;
        $timeout(function(){vm.successAlert = false;},1000);
    };

    vm.errorMain = function(message){
        vm.alertMessage = message;
        vm.errorAlert = true;
        $timeout(function () {
            vm.errorAlert = false;
        }, 2000);
    };

}
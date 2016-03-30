'use strict';

angular
    .module('video-wall-app')
    .controller('mainController', mainController);

function mainController(apiFunctions, $window, $scope, $timeout){
    var vm = this;
    vm.listCrops = [];
    vm.pageLocation = "";
    console.log($scope);
    vm.disconnectMain = function(){
        apiFunctions.disconnect()
        .then(function succesCallback(response){
            lmsPaths = [];
            vm.listCrops = [];
            idCrops = 1;
            receiverId = 1000;
            decoderId = 1100;
            resamplerId = 1200;
            videoSplitterId = 1300;
            encoderId = 1401;
            transmitterId = 1500;
            pathTransmitterId = 2000;
            inputWidth = 0;
            inputHeight =0;
            winWidth = 0;
            winHeight = 0;
            apiUri = null;
            sHost = null;
            sPort = null;
            vm.pageLocation = "";
            $window.location.href='/#/';
            $scope.$parent.$broadcast('msg', response);
        }, function errorCallback(response){$scope.$parent.$broadcast('msg', response);});

    };

    vm.save = function(){
        console.log("save");
    };

    vm.open = function(){
        console.log("open");
    };

    $scope.$on('msg', function(evt,msg){
        if (msg.state){
            vm.succesMain(msg.response);
        } else {
            vm.errorMain(msg.response);
        }
    });

    vm.succesMain = function(message){
        vm.alertMessage = message;
        vm.successAlert = true;
        $timeout(function(){
            vm.successAlert = false;
        },1000);
    };

    vm.errorMain = function(message){
        vm.alertMessage = message;
        vm.errorAlert = true;
        $timeout(function () {
            vm.errorAlert = false;
        }, 2000);
    };

    $window.addEventListener('beforeunload', function(event){
        if ($window.location.hash == "#/control" || $window.location.hash == "#/input") {
            event = event || $window.event;
            var reloadMessage = "\tALERT: If you refresh this page, you may lose settings.";
            event.returnValue = reloadMessage;
            vm.disconnectMain();
            return reloadMessage;
        }
    });

    $scope.$on('$locationChangeStart', function(event, next, current) {
        if (vm.pageLocation == ""){
            $window.location.href='/#/';
        }
    });

}
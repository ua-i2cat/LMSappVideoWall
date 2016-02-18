'use strict';

angular
    .module('video-wall-app')
    .controller('inputController', inputController);

function inputController(appFunctions, $window, $timeout, $scope){
    var vm = this;

    $scope.mainCtrl.disconnectShow = true;

    vm.connectUriRTMP = function(){
        if(/^(rtmp):\/\/[^ "]+$/.test(vm.uri)) {
            lmsInput = {
                'params': {
                    'uri': vm.uri
                }
            };
            appFunctions.setRTMP()
                .then(function succesCallback(){
                    $scope.mainCtrl.alertMessage = response;
                    $scope.mainCtrl.successAlert = true;
                    $timeout(function () {
                        $scope.mainCtrl.successAlert = false;
                    },1000);
                    $window.location.href = '#/control';
                }, function errorCallback(){
                    errorInput(response);
                });


        } else {
            $scope.mainCtrl.alertMessage = "";
            $scope.mainCtrl.errorAlert = true;
            $timeout(function(){$scope.mainCtrl.errorAlert = false;},2000);
        }
    };

    vm.connectUriRTSP = function(){
        if(/^(rtsp):\/\/[^ "]+$/.test(vm.uri)) {
            lmsInput = {
                'params': {
                    "uri": vm.uri,
                    "progName": "LiveMediaStreamer",
                    "id": "8554"
                }
            };
            appFunctions.setRTSP()
                .then(function succesCallback(response){
                    console.log(response);
                    $scope.mainCtrl.alertMessage = response;
                    $scope.mainCtrl.successAlert = true;
                    $timeout(function () {
                        $scope.mainCtrl.successAlert = false;
                    },1000);
                    $window.location.href = '#/control';

                },  function errorCallback(response) {
                    errorInput(response);
                });

        } else {
            $scope.mainCtrl.alertMessage = "";
            $scope.mainCtrl.errorAlert = true;
            $timeout(function(){$scope.mainCtrl.errorAlert = false;},2000);
        }
    };

    vm.errorInput = function(response){
        $scope.mainCtrl.alertMessage = response;
        $scope.mainCtrl.errorAlert = true;
        $timeout(function () {
            $scope.mainCtrl.errorAlert = false;
        }, 2000);
    };
}


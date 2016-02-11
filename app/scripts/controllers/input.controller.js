'use strict';

function inputController(appFunctions, apiFunctions, $window, $timeout, $scope){
    var vm = this;
    $scope.mainCtrl.disconnectShow = true;
    vm.connectUriRTMP = function(){
        if(/^(rtmp):\/\/[^ "]+$/.test(vm.uri)) {
            lmsInput = {
                'params': {
                    'uri': vm.uri
                }
            };
            appFunctions.setReceiverToSplitterRTMP()
                .then(function succesCallback(){
                    apiFunctions.createFilter(transmitterId, "transmitter")
                        .then(function succesCallback(response){
                            $scope.mainCtrl.alertMessage = response;
                            $scope.mainCtrl.successAlert = true;
                            $timeout(function () {
                                $scope.mainCtrl.successAlert = false;
                            },1000);
                            $window.location.href = '#/control';
                        }, function errorCallback(response) {

                        });
                }, errorCallback);


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
            appFunctions.setReceiverToSplitterRTSP()
                .then(function succesCallback(response){
                    console.log(response);
                    apiFunctions.createFilter(transmitterId, "transmitter")
                        .then(function succesCallback(response){
                            $scope.mainCtrl.alertMessage = response;
                            $scope.mainCtrl.successAlert = true;
                            $timeout(function () {
                                $scope.mainCtrl.successAlert = false;
                            },1000);
                            $window.location.href = '#/control';
                        }, function errorCallback(response) {
                            console.log("Error Api " + response);
                            $scope.mainCtrl.alertMessage = response;
                            $scope.mainCtrl.errorAlert = true;
                            $timeout(function () {
                                $scope.mainCtrl.errorAlert = false;
                            }, 2000);
                        });
                },  function errorCallback(response) {
                    console.log("Error app " + response);
                    $scope.mainCtrl.alertMessage = response;
                    $scope.mainCtrl.errorAlert = true;
                    $timeout(function () {
                        $scope.mainCtrl.errorAlert = false;
                    }, 2000);
                });

        } else {
            $scope.mainCtrl.alertMessage = "";
            $scope.mainCtrl.errorAlert = true;
            $timeout(function(){$scope.mainCtrl.errorAlert = false;},2000);
        }
    };

    vm.errorCallback = function(){
        $scope.mainCtrl.alertMessage = response;
        $scope.mainCtrl.errorAlert = true;
        $timeout(function () {
            $scope.mainCtrl.errorAlert = false;
        }, 2000);
    };
}

angular
    .module('video-wall-app')
    .controller('inputController', inputController);
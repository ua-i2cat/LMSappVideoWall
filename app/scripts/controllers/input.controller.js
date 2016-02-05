'use strict';

function inputController(appFunctions, apiFunctions, $window, $timeout){
    var vm = this;
    vm.connectUriRTMP = function(){
        if(/^(rtmp):\/\/[^ "]+$/.test(vm.uri)) {
            lmsInput = {
                'params': {
                    'uri': vm.uri
                }
            };
            appFunctions.setReceiverToSplitterRTMP();
            apiFunctions.createFilter(transmitterId, "transmitter");
            vm.successAlert = true;
            $window.location.href = '#/control';
        } else {
            vm.alertMessage = "";
            vm.errorAlert = true;
            $timeout(function(){vm.errorAlert = false;},2000);
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
            appFunctions.setReceiverToSplitterRTSP();
            apiFunctions.createFilter(transmitterId, "transmitter");
            vm.successAlert = true;
            $window.location.href = '#/control';
        } else {
            vm.alertMessage = "";
            vm.errorAlert = true;
            $timeout(function(){vm.errorAlert = false;},2000);
        }
    };
}

angular
    .module('video-wall-app')
    .controller('inputController', inputController);
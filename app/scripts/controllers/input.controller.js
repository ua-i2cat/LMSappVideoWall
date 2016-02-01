'use strict';

function inputController(appFunctions, apiFunctions, $window){
    var vm = this;
    vm.connectUri = function(){

        if(/^(rtmp):\/\/[^ "]+$/.test(vm.uri)) {
            console.log(vm.uri);
            lmsInput = {
                'params': {
                    'uri': vm.uri
                }
            };
            appFunctions.setReceiverToSplitterRTMP();
            apiFunctions.createFilter(transmitterId, "transmitter");
            $window.location.href='#/control';
        } else if(/^(rtsp):\/\/[^ "]+$/.test(vm.uri)) {
            lmsInput = {
                'params': {
                    "uri": vm.uri,
                    "progName": "LiveMediaStreamer",
                    "id": "8554"
                }
            };
            appFunctions.setReceiverToSplitterRTSP();
            apiFunctions.createFilter(transmitterId, "transmitter");
            $window.location.href='#/control';
        } else {
            lmsInput = null;
        }


    };
}

angular
    .module('video-wall-app')
    .controller('inputController', inputController);
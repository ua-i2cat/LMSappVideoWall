'use strict';

function inputRTPController(appFunctions, apiFunctions, $window, $timeout, $scope){
    var vm = this;

    vm.inputRTPAudioCodec = {
        codecSelect: 'pcm',
        availableCodecs: [
            {name: 'pcm'},
            {name: 'pcmu'},
            {name: 'opus'},
            {name: 'aac'}
        ]
    };
    vm.inputRTPAudioSampleRate = {
        sampleRateSelect: '8000',
        availableSampleRates: [
            {value: 8000},
            {value: 44100},
            {value: 48000}
        ]
    };
    vm.inputRTPAudioChannels = {
        channelsSelect: '1',
        availableChannels: [
            {value: 1},
            {value: 2}
        ]
    };
    vm.inputRTPVideoCodec = {
        codecSelect: 'H264',
        availableCodecs: [
            {name: 'H264'},
            {name: 'H265'}
        ]
    };

    vm.audioRTP = function(){
        lmsInput = {
            'params'    : {
                "subsessions":[
                    {
                        "medium":"audio",
                        "codec":vm.inputRTPAudioCodec.codecSelect,
                        "bandwidth":192000,
                        "timeStampFrequency":vm.inputRTPAudioSampleRate.sampleRateSelect,
                        "channels":vm.inputRTPAudioChannels.channelsSelect,
                        "port":vm.inputRTPAudioPort
                    }
                ]
            }
        };
        apiFunctions.createFilter(receiverId, "receiver");
        apiFunctions.createFilter(transmitterId, "transmitter");
        appFunctions.setReceiverToTransmitterAudio('a');

        $scope.mainCtrl.successAlert = true;
        $timeout(function(){$scope.mainCtrl.successAlert = false;},1000);
        $window.location.href='#/control';
    };
    vm.videoRTP = function(){
        lmsInput = {
            'params'    : {
                "subsessions":[
                    {
                        "medium":"video",
                        "codec":vm.inputRTPVideoCodec.codecSelect,
                        "bandwidth":5000,
                        "timeStampFrequency":90000,
                        "channels":null,
                        "port":vm.inputRTPVideoPort
                    }
                ]
            }
        };

        appFunctions.initRTP()
            .then(function succesCallback(){
                appFunctions.setReceiverToSplitter('v')
                    .then(function succesCallback(){
                        $scope.mainCtrl.successAlert = true;
                        $timeout(function(){$scope.mainCtrl.successAlert = false;},1000);
                        $window.location.href='#/control';
                    }, function errorCallback(response){
                        addAlertError(response);
                    });
            }, function errorCallback(response){
                addAlertError(response);
            });
    };
    vm.bothRTP = function(){
        lmsInput = {
            'audioParams'    : {
                "subsessions":[
                    {
                        "medium":"audio",
                        "codec":vm.inputRTPAudioCodec.codecSelect,
                        "bandwidth":192000,
                        "timeStampFrequency":vm.inputRTPAudioSampleRate.sampleRateSelect,
                        "channels":vm.inputRTPAudioChannels.channelsSelect,
                        "port":vm.inputRTPAudioPort
                    }
                ]
            },
            'videoParams'    : {
                "subsessions":[
                    {
                        "medium":"video",
                        "codec":vm.inputRTPVideoCodec.codecSelect,
                        "bandwidth":5000,
                        "timeStampFrequency":90000,
                        "channels":null,
                        "port":vm.inputRTPVideoPort
                    }
                ]
            }
        };
        appFunctions.initRTP()
            .then(function succesCallback(){
                appFunctions.setReceiverToTransmitterAudio('av')
                    .then(function succesCallback(){
                        appFunctions.setReceiverToSplitter('av')
                            .then(function succesCallback(){
                                $scope.mainCtrl.successAlert = true;
                                $timeout(function(){$scope.mainCtrl.successAlert = false;},1000);
                                $window.location.href='#/control';
                            }, errorCallback(response));
                    }, errorCallback(response));
            }, errorCallback(response));


    };

    vm.addAlertError = function(response){
        $scope.mainCtrl.alertMessage = response;
        $scope.mainCtrl.errorAlert = true;
        $timeout(function () {
            $scope.mainCtrl.errorAlert = false;
        }, 2000);
    };

}

angular
    .module('video-wall-app')
    .controller('inputRTPController', inputRTPController);
'use strict';

function inputRTPController(appFunctions, apiFunctions, $window){
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
        console.log(vm);

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
        apiFunctions.createFilter(receiverId, "receiver");
        appFunctions.setReceiverToSplitter('v');
        apiFunctions.createFilter(transmitterId, "transmitter");
        $window.location.href='#/control';
    };
    vm.bothRTP = function(){
        console.log(vm);
    };

}

angular
    .module('video-wall-app')
    .controller('inputRTPController', inputRTPController);
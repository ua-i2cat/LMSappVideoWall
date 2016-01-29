'use strict';

function inputRTPController($scope, $log, $http){

    $scope.inputRTPAudioCodec = {
        codecSelect: 'null',
        availableCodecs: [
            {name: 'pcm'},
            {name: 'pcmu'},
            {name: 'opus'},
            {name: 'aac'}
        ]
    };
    $scope.inputRTPAudioSampleRate = {
        sampleRateSelect: 'null',
        availableSampleRates: [
            {value: 8000},
            {value: 44100},
            {value: 48000}
        ]
    };
    $scope.inputRTPAudioChannels = {
        channelsSelect: 'null',
        availableChannels: [
            {value: 1},
            {value: 2}
        ]
    };
    $scope.inputRTPVideoCodec = {
        codecSelect: 'null',
        availableCodecs: [
            {name: 'H264'},
            {name: 'H265'}
        ]
    };

    $scope.audioRTP = function(){};
    $scope.audioRTP = function(){};
    $scope.audioRTP = function(){};

}

angular
    .module('video-wall-app')
    .controller('inputRTPController', inputRTPController);
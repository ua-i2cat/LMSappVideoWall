'use strict';

angular
    .module('video-wall-app')
    .controller('inputRTPController', inputRTPController);

function inputRTPController($window, $scope, inputRTPService){
    var vm = this;

    vm.inputRTPAudioCodec = inputRTPService.inputRTPAudioCodec;
    vm.inputRTPAudioSampleRate = inputRTPService.inputRTPAudioSampleRate;
    vm.inputRTPAudioChannels = inputRTPService.inputRTPAudioChannels;
    vm.inputRTPVideoCodec = inputRTPService.inputRTPVideoCodec;
    vm.audioRTP = audioRTP;
    vm.videoRTP = videoRTP;
    vm.bothRTP = bothRTP;

    function audioRTP(){
        inputRTPService.audio(vm.inputRTPAudioPort ,vm.inputRTPAudioCodec.codecSelect,
                                vm.inputRTPAudioSampleRate.sampleRateSelect, vm.inputRTPAudioChannels.channelsSelect)
            .then(function succesCallback(response) {
                $scope.$parent.$broadcast('msg', response);
                $window.location.href = '#/control';
            })
            .catch(function errorCallback(response) {
                $scope.$parent.$broadcast('msg', response);
            });
    }

    function videoRTP(){
        inputRTPService.video(vm.inputRTPVideoPort ,vm.inputRTPVideoCodec.codecSelect)
            .then(function succesCallback(response) {
                $scope.$parent.$broadcast('msg', response);
                $window.location.href = '#/control';
            })
            .catch(function errorCallback(response) {
                $scope.$parent.$broadcast('msg', response);
            });
    }

    function bothRTP(){
        inputRTPService.both(vm.inputRTPAudioPort ,vm.inputRTPAudioCodec.codecSelect,
                                vm.inputRTPAudioSampleRate.sampleRateSelect, vm.inputRTPAudioChannels.channelsSelect,
                                vm.inputRTPVideoPort ,vm.inputRTPVideoCodec.codecSelect)
            .then(function succesCallback(response) {
                showSound = true;
                $scope.$parent.$broadcast('msg', response);
                $window.location.href = '#/control';
            })
            .catch(function errorCallback(response) {
                $scope.$parent.$broadcast('msg', response);
            });
    }
}


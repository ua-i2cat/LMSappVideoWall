'use strict';

angular
    .module('video-wall-app')
    .service('inputRTPService', inputRTPService);

function inputRTPService(appFunctions, $q){

    this.inputRTPAudioCodec = {
        codecSelect: 'pcm',
        availableCodecs: [
            {name: 'pcm'},
            {name: 'pcmu'},
            {name: 'opus'},
            {name: 'aac'}
        ]
    };

    this.inputRTPAudioSampleRate = {
        sampleRateSelect: '8000',
        availableSampleRates: [
            {value: 8000},
            {value: 44100},
            {value: 48000}
        ]
    };

    this.inputRTPAudioChannels = {
        channelsSelect: '1',
        availableChannels: [
            {value: 1},
            {value: 2}
        ]
    };

    this.inputRTPVideoCodec = {
        codecSelect: 'H264',
        availableCodecs: [
            {name: 'H264'},
            {name: 'H265'}
        ]
    };

    this.audio = function(inputRTPAudioPort, codecSelect, sampleRateSelect, channelsSelect){
        var deferred = $q.defer();
        lmsInput = {
            'params'    : {
                "subsessions":[
                    {
                        "medium":"audio",
                        "codec":codecSelect,
                        "bandwidth":192000,
                        "timeStampFrequency":sampleRateSelect,
                        "channels":channelsSelect,
                        "port":inputRTPAudioPort
                    }
                ]
            }
        };

        appFunctions.initRTP()
            .then(function succesCallback(){
                appFunctions.setRTPAudio('a')
                    .then(function succesCallback(response){
                        deferred.resolve(response);
                    }, function errorCallback(response){
                        deferred.reject(response);
                    });
            }, function errorCallback(response){
                deferred.reject(response);
            });
        return deferred.promise;
    };

    this.video = function(inputRTPVideoPort, codecSelect){
        var deferred = $q.defer();
        lmsInput = {
            'params'    : {
                "subsessions":[
                    {
                        "medium":"video",
                        "codec": codecSelect,
                        "bandwidth":5000,
                        "timeStampFrequency":90000,
                        "channels":null,
                        "port": inputRTPVideoPort
                    }
                ]
            }
        };
        appFunctions.initRTP()
            .then(function succesCallback(){
                appFunctions.setRTPVideo('v')
                    .then(function succesCallback(response){
                        deferred.resolve(response);
                    }, function errorCallback(response){
                        deferred.reject(response);
                    });
            }, function errorCallback(response){
                deferred.reject(response);
            });
        return deferred.promise;
    };

    this.both = function(inputRTPAudioPort, audioCodecSelect, sampleRateSelect, channelsSelect, inputRTPVideoPort, videoCodecSelect){
        var deferred = $q.defer();

        lmsInput = {
            'audioParams'    : {
                "subsessions":[
                    {
                        "medium":"audio",
                        "codec":audioCodecSelect,
                        "bandwidth":192000,
                        "timeStampFrequency":sampleRateSelect,
                        "channels":channelsSelect,
                        "port":inputRTPAudioPort
                    }
                ]
            },
            'videoParams'    : {
                "subsessions":[
                    {
                        "medium":"video",
                        "codec":videoCodecSelect,
                        "bandwidth":5000,
                        "timeStampFrequency":90000,
                        "channels":null,
                        "port":inputRTPVideoPort
                    }
                ]
            }
        };
        appFunctions.initRTP()
            .then(function succesCallback(){
                appFunctions.setRTPAudio('av')
                    .then(function succesCallback(){
                        appFunctions.setRTPVideo('av')
                            .then(function succesCallback(response){
                                deferred.resolve(response);
                            }, function errorCallback(response){
                                deferred.reject(response);
                            });
                    }, function errorCallback(response){
                        deferred.reject(response);
                    });
            }, function errorCallback(response){
                deferred.reject(response);
            });
        return deferred.promise;
    };
}
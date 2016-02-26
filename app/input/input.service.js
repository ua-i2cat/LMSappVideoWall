'use strict';

angular
    .module('video-wall-app')
    .service('inputService', inputService);

function inputService(appFunctions, $q){

    this.connectUriRTMP = connectUriRTMP;
    this.connectUriRTSP = connectUriRTSP;


    function connectUriRTMP(uri){
        var deferred = $q.defer();

        if(/^(rtmp):\/\/[^ "]+$/.test(uri)) {
            lmsInput = {
                'params': {
                    'uri': uri
                }
            };
            appFunctions.setRTMP()
                .then(function succesCallback(response){
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
        } else {
            deferred.reject("Format of URI incorrect");
        }
        return deferred.promise;
    }

    function connectUriRTSP(uri){
        var deferred = $q.defer();
        if(/^(rtsp):\/\/[^ "]+$/.test(uri)) {
            lmsInput = {
                'params': {
                    "uri": uri,
                    "progName": "LiveMediaStreamer",
                    "id": "100"
                }
            };
            appFunctions.setRTSP()
                .then(function succesCallback(response){
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
        } else {
            deferred.reject("Format of URI incorrect");
        }
        return deferred.promise;
    }
}


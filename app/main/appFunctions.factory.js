'use strict';

angular
    .module('video-wall-app')
    .factory('appFunctions', appFunctions);

function appFunctions(apiFunctions, $q, $http){

    var service = {
        setSplitterToTransmitter: setSplitterToTransmitter,
        setRTMP: setRTMP,
        setRTSP: setRTSP,
        initRTP: initRTP,
        setRTPVideo: setRTPVideo,
        setRTPAudio: setRTPAudio
    };

    return service;

    function setSplitterToTransmitter(message){

        //CREATE RESAMPLER
        apiFunctions.createFilter(resamplerId, "videoResampler");
        var lmsResampler = {
            'params'    : {
                "width": 0,
                "height": 0,
                "discartPeriod":0,
                "pixelFormat":2
            }
        };
        apiFunctions.configureFilter(resamplerId, "configure", lmsResampler.params);

        //CREATE ENCODER
        apiFunctions.createFilter(encoderId, "videoEncoder");
        var lmsEncoder = {
            'params'    : {
                "bitrate":1000,
                "fps":25,
                "gop":25,
                "lookahead":0,
                "threads":4,
                "annexb":true,
                "preset":"superfast"
            }
        };
        apiFunctions.configureFilter(encoderId, "configure", lmsEncoder.params);

        //CREATE PATH
        var midFiltersIds = [resamplerId, encoderId];
        apiFunctions.createPath(pathTransmitterId, videoSplitterId, transmitterId, idCrops, idCrops, midFiltersIds);

        //CONFIGURE CROP
        var object = listCrops.filter(function(element) {return element.id == idCrops})[0];


        var lmsSplitter = {
            'params'    : {
                "id": Number(object.id),
                "width": Number(object.width),
                "height":Number(object.height),
                "x":Number(object.x),
                "y":Number(object.y)
            }
        };
        apiFunctions.configureFilter(videoSplitterId, "configCrop", lmsSplitter.params);
        //CONFIGURE TRANSMITTER RTSP
        var plainrtp = "plainrtp" + idCrops;
        var lmsTransmitter = {
            'params'    : {
                "id":idCrops,
                "txFormat":"std",
                "name":plainrtp,
                "info":plainrtp,
                "desc":plainrtp,
                "readers":[idCrops]
            }
        };
        apiFunctions.configureFilter(transmitterId, "addRTSPConnection", lmsTransmitter.params);
        //CONFIGURE TRANSMITTER RTP
        /*lmsTransmitter = {
         'params'    : {
         "id":idCrops*100,
         "txFormat":"std",
         "ip":message.ip,
         "port":portRTP,
         "readers":[idCrops]
         }
         };
         configureFilter(transmitterId, "addRTPConnection", lmsTransmitter.params);*/
        ++pathTransmitterId;
        ++resamplerId;
        ++encoderId;
        portRTP = portRTP + 2;
    }



    function setRTMP(){
        var deferred = $q.defer(),
            midFiltersIds = [decoderId,resamplerId],
            lmsResampler = {
                'params'    : {
                    "width":0,
                    "height":0,
                    "discartPeriod":0,
                    "pixelFormat":0
                }
            };

        apiFunctions.createFilter(receiverId, "receiver")
            .then(function succesCallback(){
                apiFunctions.createFilter(transmitterId, "transmitter")
                    .then(function succesCallback(){
                        apiFunctions.createFilter(decoderId, "videoDecoder")
                            .then(function succesCallback(){
                                apiFunctions.createFilter(resamplerId, "videoResampler")
                                    .then(function succesCallback(){
                                        apiFunctions.createFilter(videoSplitterId, "videoSplitter")
                                            .then(function succesCallback(){
                                                apiFunctions.configureFilter(receiverId, 'configure', lmsInput.params)
                                                    .then(function succesCallback(){
                                                        apiFunctions.configureFilter(resamplerId, "configure", lmsResampler.params)
                                                            .then(function succesCallback(response){
                                                                ++resamplerId;
                                                                console.log("Return");
                                                                deferred.resolve(response);
                                                                /*
                                                                 apiFunctions.createPath(1935, receiverId, videoSplitterId, 1935, -1, midFiltersIds)
                                                                     .then(function succesCallback(response){
                                                                         ++resamplerId;
                                                                         console.log("Return");
                                                                         deferred.resolve(response);
                                                                     }, function errorCallback() {
                                                                        deferred.reject('No API available.');
                                                                     });
                                                                 */
                                                            }, function errorCallback() {
                                                                deferred.reject('Api: Error Configure Resampler.');
                                                            });
                                                    }, function errorCallback() {
                                                        deferred.reject('Api: Error Configure Receiver .');
                                                    });
                                            }, function errorCallback() {
                                                deferred.reject('Api: Error Create Splitter.');
                                            });
                                    }, function errorCallback() {
                                        deferred.reject('Api: Error Create Resampler.');
                                    });
                            }, function errorCallback() {
                                deferred.reject('Api: Error Create Decoder.');
                            });
                    }, function errorCallback() {
                        deferred.reject('Api: Error Create Transmitter.');
                    });
            }, function errorCallback() {
                deferred.reject('Api: Error Create Receiver.');
            });
        return deferred.promise;
    }

    function setRTSP(){
        var deferred = $q.defer(),
            midFiltersIds = [decoderId,resamplerId],
            lmsResampler = {
            'params'    : {
                "width":0,
                "height":0,
                "discartPeriod":0,
                "pixelFormat":0
            }
        };
        apiFunctions.createFilter(receiverId, "receiver")
            .then(function succesCallback(){
                apiFunctions.createFilter(transmitterId, "transmitter")
                    .then(function succesCallback(){
                        apiFunctions.createFilter(decoderId, "videoDecoder")
                            .then(function succesCallback(){
                                apiFunctions.createFilter(resamplerId, "videoResampler")
                                    .then(function succesCallback(){
                                        apiFunctions.createFilter(videoSplitterId, "videoSplitter")
                                            .then(function succesCallback(){
                                                apiFunctions.configureFilter(receiverId, 'addSession', lmsInput.params)
                                                    .then(function succesCallback(){
                                                        apiFunctions.configureFilter(resamplerId, "configure", lmsResampler.params)
                                                            .then(function succesCallback(){
                                                                resolveState()
                                                                    .then(function succesCallback(){
                                                                        apiFunctions.createPath(lmsState.filters[0].sessions[0].subsessions[0].port, receiverId, videoSplitterId, lmsState.filters[0].sessions[0].subsessions[0].port, -1, midFiltersIds)
                                                                            .then(function succesCallback(response){
                                                                                ++resamplerId;
                                                                                deferred.resolve(response);
                                                                            }, function errorCallback() {
                                                                                deferred.reject({'response': 'Api: Error Create Path.', 'state': false});
                                                                            });
                                                                    }, function errorCallback() {
                                                                        deferred.reject({'response': 'Api: Error sessions availables.', 'state': false});
                                                                    });
                                                            }, function errorCallback() {
                                                                deferred.reject({'response': 'Api: Error Configure Resampler.', 'state': false});
                                                            });
                                                }, function errorCallback() {
                                                    deferred.reject({'response': 'Api: Error Configure Receiver .', 'state': false});
                                                });
                                        }, function errorCallback() {
                                            deferred.reject({'response': 'Api: Error Create Splitter.', 'state': false});
                                        });
                                }, function errorCallback() {
                                    deferred.reject({'response': 'Api: Error Create Resampler.', 'state': false});
                                });
                        }, function errorCallback() {
                            deferred.reject({'response': 'Api: Error Create Decoder.', 'state': false});
                        });
                    }, function errorCallback() {
                        deferred.reject({'response': 'Api: Error Create Transmitter.', 'state': false});
                    });
            }, function errorCallback() {
                deferred.reject({'response': 'Api: Error Create Receiver.', 'state': false});
            });
        return deferred.promise;
    }

    function resolveState(){
        var deferred = $q.defer();
        apiFunctions.getState()
            .then(function succesCallback(){
                if (lmsState.filters[0].sessions.length == 0){
                    resolveState()
                        .then(function succesCallback(){
                            deferred.resolve({'response': 'OK', 'state': true});
                        })
                } else {
                    deferred.resolve({'response': 'OK', 'state': true});
                }
            }, function errorCallback() {
                deferred.reject({'response': 'Api: Error sessions availables.', 'state': false});
            });
        return deferred.promise;
    }

    function initRTP(){
        var deferred = $q.defer();

        apiFunctions.createFilter(receiverId, "receiver")
            .then(function(){
                apiFunctions.createFilter(transmitterId, "transmitter")
                    .then(function(response){
                        deferred.resolve(response);
                    }, function errorCallback(){
                        deferred.reject('Api: Error Create Receiver.');
                    });
            }, function errorCallback(){
                deferred.reject('Api: Error Create Transmitter.');
            });

        return deferred.promise;
    }

    function setRTPVideo(rtpType){
        var deferred = $q.defer(),
            midFiltersIds = [decoderId,resamplerId],
            lmsResampler = {
                'params'    : {
                    "width":0,
                    "height":0,
                    "discartPeriod":0,
                    "pixelFormat":0
                }
            };

        apiFunctions.createFilter(decoderId, "videoDecoder")
            .then(function() {
                apiFunctions.createFilter(resamplerId, "videoResampler")
                    .then(function() {
                        apiFunctions.configureFilter(resamplerId, "configure", lmsResampler.params)
                            .then(function() {
                                apiFunctions.createFilter(videoSplitterId, "videoSplitter")
                                    .then(function() {
                                        switch (rtpType) {
                                            case 'v':
                                                apiFunctions.configureFilter(receiverId, 'addSession', lmsInput.params)
                                                    .then(function(){
                                                        apiFunctions.createPath(lmsInput.params.subsessions[0].port, receiverId, videoSplitterId, lmsInput.params.subsessions[0].port, -1, midFiltersIds)
                                                            .then(function(response){
                                                                ++resamplerId;
                                                                deferred.resolve(response);
                                                            }, function errorCallback(){
                                                                deferred.reject('Api: Error Create Path.');
                                                            });
                                                    }, function errorCallback(){
                                                        deferred.reject('Api: Error Configure Receiver.');
                                                    });
                                                break;
                                            case 'av':
                                                apiFunctions.configureFilter(receiverId, 'addSession', lmsInput.params)
                                                    .then(function(){
                                                        apiFunctions.createPath(lmsInput.videoParams.subsessions[0].port, receiverId, videoSplitterId, lmsInput.videoParams.subsessions[0].port, -1, midFiltersIds)
                                                            .then(function(response){
                                                                ++resamplerId;
                                                                deferred.resolve(response);
                                                            }, function errorCallback(){
                                                                deferred.reject('Api: Error Create Path.');
                                                            });
                                                    }, function errorCallback(){
                                                        deferred.reject('Api: Error Configure Receiver.');
                                                    });
                                                break;
                                        }
                                    }, function errorCallback() {
                                        deferred.reject('Api: Error Create Splitter.');
                                    });
                            }, function errorCallback() {
                                deferred.reject('Api: Error Configure Resampler.');
                            });
                    }, function errorCallback() {
                        deferred.reject('Api: Error Create Resampler.');
                    });
            }, function errorCallback() {
                deferred.reject('Api: Error Create Decoder.');
            });

        return deferred.promise;
    }

    function setRTPAudio(rtpType){

        var deferred = $q.defer(),
            midFiltersIds = [],
            plainrtp,
            lmsTransmitter;
        switch(rtpType){
            case 'a':
                apiFunctions.configureFilter(receiverId, 'addSession', lmsInput.params)
                    .then(function(){
                        plainrtp = "plainrtp" + lmsInput.params.subsessions[0].port;
                        lmsTransmitter = {
                            'params'    : {
                                "id":lmsInput.params.subsessions[0].port,
                                "txFormat":"std",
                                "name":plainrtp,
                                "info":plainrtp,
                                "desc":plainrtp,
                                "readers":[lmsInput.params.subsessions[0].port]
                            }
                        };
                        apiFunctions.createPath(lmsInput.params.subsessions[0].port, receiverId, transmitterId, lmsInput.params.subsessions[0].port, lmsInput.params.subsessions[0].port, midFiltersIds)
                            .then(function(){
                                apiFunctions.configureFilter(transmitterId, "addRTSPConnection", lmsTransmitter.params)
                                    .then(function(response){
                                        ++encoderId;
                                        deferred.resolve(response);
                                    }, function errorCallback(){
                                        deferred.reject('Api: Error Configure Transmitter.');
                                    });
                            }, function errorCallback(){
                                deferred.reject('Api: Error Crate Path.');
                            });
                    }, function errorCallback(){
                        deferred.reject('Api: Error Configure Receiver.');
                    });
                break;
            case 'av':
                apiFunctions.configureFilter(receiverId, 'addSession', lmsInput.audioParams)
                    .then(function(){
                        plainrtp = "plainrtp" + lmsInput.audioParams.subsessions[0].port;
                        lmsTransmitter = {
                            'params'    : {
                                "id":lmsInput.audioParams.subsessions[0].port,
                                "txFormat":"std",
                                "name":plainrtp,
                                "info":plainrtp,
                                "desc":plainrtp,
                                "readers":[lmsInput.audioParams.subsessions[0].port]
                            }
                        };
                        apiFunctions.createPath(lmsInput.audioParams.subsessions[0].port, receiverId, transmitterId, lmsInput.audioParams.subsessions[0].port, lmsInput.audioParams.subsessions[0].port, midFiltersIds)
                            .then(function(){
                                apiFunctions.configureFilter(transmitterId, "addRTSPConnection", lmsTransmitter.params)
                                    .then(function(response){
                                        ++encoderId;
                                        deferred.resolve(response);
                                    }, function errorCallback(){
                                        deferred.reject('Api: Error Configure Transmitter.');
                                    });
                            }, function errorCallback(){
                                deferred.reject('Api: Error Crate Path.');
                            });
                    }, function errorCallback(){
                        deferred.reject('Api: Error Configure Receiver.');
                    });
                break;
        }
        return deferred.promise;
    }
}
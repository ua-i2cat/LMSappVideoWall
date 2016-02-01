'use strict';

function appFunctions(apiFunctions){
    var okmsg = false;
    return {
        setSplitterToTransmitter: function(message){

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
        },

        setReceiverToSplitter: function(rtpType){
            apiFunctions.createFilter(decoderId, "videoDecoder");
            apiFunctions.createFilter(resamplerId, "videoResampler");
            var lmsResampler = {
                'params'    : {
                    "width":0,
                    "height":0,
                    "discartPeriod":0,
                    "pixelFormat":0
                }
            };
            apiFunctions.configureFilter(resamplerId, "configure", lmsResampler.params);
            apiFunctions.createFilter(videoSplitterId, "videoSplitter");
            var midFiltersIds = [decoderId,resamplerId];

            switch(rtpType){
                case 'v':
                    apiFunctions.configureFilter(receiverId, 'addSession', lmsInput.params);
                    apiFunctions.createPath(lmsInput.params.subsessions[0].port, receiverId, videoSplitterId, lmsInput.params.subsessions[0].port, -1, midFiltersIds);
                    break;
                case 'av':
                    apiFunctions.configureFilter(receiverId, 'addSession', lmsInput.videoParams);
                    apiFunctions.createPath(lmsInput.videoParams.subsessions[0].port, receiverId, videoSplitterId, lmsInput.videoParams.subsessions[0].port, -1, midFiltersIds);
                    break;
            }
            ++resamplerId;
        },

        setReceiverToSplitterRTMP: function(){
            apiFunctions.createFilter(receiverId, "receiver");
            apiFunctions.configureFilter(receiverId, 'configure', lmsInput.params);
            apiFunctions.createFilter(decoderId, "videoDecoder");
            apiFunctions.createFilter(resamplerId, "videoResampler");
            var lmsResampler = {
                'params'    : {
                    "width":0,
                    "height":0,
                    "discartPeriod":0,
                    "pixelFormat":0
                }
            };
            apiFunctions.configureFilter(resamplerId, "configure", lmsResampler.params);
            apiFunctions.createFilter(videoSplitterId, "videoSplitter");
            var midFiltersIds = [decoderId,resamplerId];
            apiFunctions.createPath(lmsInput.params.subsessions[0].port, receiverId, videoSplitterId, lmsInput.params.subsessions[0].port, -1, midFiltersIds);

            ++resamplerId;
        },

        setReceiverToSplitterRTSP: function(){
            apiFunctions.createFilter(receiverId, "receiver");
            apiFunctions.configureFilter(receiverId, 'addSession', lmsInput.params);
            apiFunctions.createFilter(decoderId, "videoDecoder");
            apiFunctions.createFilter(resamplerId, "videoResampler");
            var lmsResampler = {
                'params'    : {
                    "width":0,
                    "height":0,
                    "discartPeriod":0,
                    "pixelFormat":0
                }
            };
            apiFunctions.configureFilter(resamplerId, "configure", lmsResampler.params);
            apiFunctions.createFilter(videoSplitterId, "videoSplitter");
            var midFiltersIds = [decoderId,resamplerId];
            apiFunctions.createPath(8554, receiverId, videoSplitterId, 8554, -1, midFiltersIds);

            ++resamplerId;
        },

        setReceiverToTransmitterAudio: function(rtpType){

            var midFiltersIds = [],
                plainrtp,
                lmsTransmitter;
            switch(rtpType){
                case 'a':
                    apiFunctions.configureFilter(receiverId, 'addSession', lmsInput.params);
                    apiFunctions.createPath(lmsInput.params.subsessions[0].port, receiverId, transmitterId, lmsInput.params.subsessions[0].port, lmsInput.params.subsessions[0].port, midFiltersIds);
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
                    break;
                case 'av':
                    apiFunctions.configureFilter(receiverId, 'addSession', lmsInput.audioParams);
                    apiFunctions.createPath(lmsInput.audioParams.subsessions[0].port, receiverId, transmitterId, lmsInput.audioParams.subsessions[0].port, lmsInput.audioParams.subsessions[0].port, midFiltersIds);
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
                    break;
            }
            apiFunctions.configureFilter(transmitterId, "addRTSPConnection", lmsTransmitter.params);
            ++encoderId;
        }
    }
}

angular
    .module('video-wall-app')
    .factory('appFunctions', appFunctions);
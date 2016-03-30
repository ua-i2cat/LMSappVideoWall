'use strict';

angular
    .module('video-wall-app',['ngRoute', 'ngDialog', 'angularSpinner']);

var sHost,
    sPort,
    apiUri,
    portRTP = 5006,
    lmsInstance = null,
    lmsState = null,
    lmsInput = null,
    lmsVideos = [],
    lmsAudios = [],
    lmsPaths = [],
    idCrops = 1,
    receiverId = 1000,
    decoderId = 1100,
    resamplerId = 1200,
    videoSplitterId = 1300,
    encoderId = 1401,
    transmitterId = 1500,
    pathTransmitterId = 2000,
    inputWidth = 0,
    inputHeight =0,
    winWidth = 0,
    winHeight = 0,
    showSound = false;



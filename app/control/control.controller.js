'use strict';

angular
    .module('video-wall-app')
    .controller('controlController', controlController);

function controlController(apiFunctions, receiverFunctions, $scope, $q, ngDialog,  $document){
    var vm = this,
        videoDecoder = -1;
    vm.selectCrop = "";
    vm.xCrop = "";
    vm.yCrop = "";
    vm.hCrop = "";
    vm.wCrop = "";
    vm.frameTime = "";

    vm.showCrop = false;
    vm.showAllCrops = false;
    $scope.mainCtrl.configurationsShow = true;

    $scope.$on('SetConfig', function(evt){
        angular.forEach($scope.mainCtrl.configurations.availableConfigs, function(config, key) {
            if(config.name == $scope.mainCtrl.configurations.configSelect.name){
                vm.numCrops = config.x * config.y;
                ngDialog.open({
                    template: 'pushCropSetConfig',
                    className: 'ngdialog-theme-default ngdialog-theme-addcrops',
                    scope: $scope
                });
            }
        });
    });

    vm.fTimeInput = fTimeInput;
    vm.configureCrop = configureCrop;
    vm.configureAllCrops = configureAllCrops;
    vm.deleteSelectCrop = deleteSelectCrop;
    vm.playRTSP = playRTSP;
    load();

    function configureCrop(){
        var selected = $scope.mainCtrl.listCrops.filter(function(object) {return object.name == vm.selectCrop})[0];
        configureOneCrop(selected);
    }

    function configureAllCrops(){
        angular.forEach($scope.mainCtrl.listCrops, function(value, key) {
            configureOneCrop(value);
        });
    }

    function configureOneCrop(selected){
        var width = (selected.width * inputWidth).toFixed(0);
        var height = (selected.height * inputHeight).toFixed(0);
        if (width % 2 != 0){width--}
        if (height % 2 != 0){height--}
        var lmsSplitter = {
            'params'    : {
                'id': selected.id,
                'width': parseFloat((width/inputWidth)),
                'height': parseFloat((height/inputHeight)),
                'x': parseFloat((selected.x/winWidth).toFixed(2)),
                'y': parseFloat((selected.y/winHeight).toFixed(2))
            }
        };

        apiFunctions.configureFilter(videoSplitterId, "configCrop", lmsSplitter.params)
            .then(function succesCallback(response){
                $scope.$parent.$broadcast('msg', response);
            }, function errorCallback(response){
                $scope.$parent.$broadcast('msg', response);
            });
    }

    function deleteSelectCrop(){
        var selected = $scope.mainCtrl.listCrops.filter(function(object) {return object.name == vm.selectCrop})[0];
        apiFunctions.deletePath(selected.pathId)
            .then(function succesCallback(response){
                if (vm.selectCrop == masterCrop) masterCrop = "";
                if (vm.selectCrop == soundCrop) soundCrop = "";
                if ($scope.mainCtrl.listCrops.length == 0) vm.showCrop = false;
                if ($scope.mainCtrl.listCrops.length == 1) vm.showAllCrops = false;
                var element = angular.element(document.querySelector('#' + vm.selectCrop));
                element.remove();
                $scope.$parent.$broadcast('msg', response);
            }, function errorCallback(response){
                $scope.$parent.$broadcast('msg', response);
            });
    }

    function playRTSP(){
        console.log($scope.mainCtrl.listCrops);
        angular.forEach($scope.mainCtrl.listCrops, function(receivers, key) {
            receiverFunctions.setPlay(receivers.ip, 'rtsp://' + sHost + ':8554/plainrtp' + receivers.id);
        });
    }

    function fTimeInput(){
        var lmsSplitter = {
            'params'    : {
                "fps": Number(vm.frameTime)
            }
        };
        apiFunctions.configureFilter(videoSplitterId, "configure", lmsSplitter.params)
            .then(function succesCallback(response){
                $scope.$parent.$broadcast('msg', response);
            }, function errorCallback(response){
                $scope.$parent.$broadcast('msg', response);
            });
    }

    function load(){
        apiFunctions.getState()
            .then(function succesCallback(){
                angular.forEach(lmsState.filters, function(filterIn, key) {
                    if (filterIn.type == "videoDecoder"){
                        videoDecoder = key;
                    }
                });
                if (videoDecoder >=0) {
                    inputInfoRight(videoDecoder)
                        .then( function succesCallback(response){
                                inputWidth = Number(lmsState.filters[videoDecoder].inputInfo.width);
                                inputHeight = Number(lmsState.filters[videoDecoder].inputInfo.height);
                                var msg = {
                                    'response': response,
                                    'state': true
                                };
                                $scope.$parent.$broadcast('msg', msg);
                                $scope.$parent.$broadcast('inputInfo');
                            }, function errorCallback(response){
                                lmsState = null;
                                var msg = {
                                    'response': response,
                                    'state': false
                                };
                                $scope.$parent.$broadcast('msg', msg);
                            }
                        );

                }
            }, function errorCallback(response){
                lmsState = null;
                var msg = {
                    'response': response,
                    'state': false
                };
                $scope.$parent.$broadcast('msg', msg);
            });
    }

    function inputInfoRight(filterIn){
        var deferred = $q.defer();
        apiFunctions.getState()
            .then(function succesCallback(){
                if (Number(lmsState.filters[filterIn].inputInfo.height) == 0) {
                    inputInfoRight(videoDecoder)
                        .then(function succesCallback(response){
                            deferred.resolve(response);
                        })
                } else {
                    var response = 'OK';
                    deferred.resolve(response);
                }
            }, function errorCallback() {
                deferred.reject({'response': 'Api: Error sessions availables.', 'state': false});
            });
        return deferred.promise;
    }

    $scope.$on('selectCrop', function(evt, crop){
        var selected;
        if (crop.target.id != "grid") {
            angular.forEach($scope.mainCtrl.listCrops, function(cropOfList, key) {
                document.getElementById(cropOfList.name).style.zIndex = "0";
            });
            if (crop.target.id == "") {
                selected = $scope.mainCtrl.listCrops.filter(function (object) {
                    return object.name == crop.target.offsetParent.id
                })[0];
                $scope.$apply(function () {
                    vm.selectCrop = crop.target.offsetParent.id;
                    vm.xCrop = selected.x;
                    vm.yCrop = selected.y;
                    vm.hCrop = (selected.height * winHeight).toFixed(0);
                    vm.wCrop = (selected.width * winWidth).toFixed(0);
                });
                document.getElementById(crop.target.offsetParent.id).style.zIndex = "1";
            } else {
                selected = $scope.mainCtrl.listCrops.filter(function (object) {
                    return object.name == crop.target.id
                })[0];
                $scope.$apply(function () {
                    vm.selectCrop = crop.target.id;
                    vm.xCrop = selected.x;
                    vm.yCrop = selected.y;
                    vm.hCrop = (selected.height * winHeight).toFixed(0);
                    vm.wCrop = (selected.width * winWidth).toFixed(0);
                });
                document.getElementById(crop.target.id).style.zIndex = "1";
            }

        }
    });

    $scope.$on('newCrop', function(evt){
        if ($scope.mainCtrl.listCrops.length > 0) vm.showCrop = true;
        if ($scope.mainCtrl.listCrops.length > 1) vm.showAllCrops = true;
    });
}



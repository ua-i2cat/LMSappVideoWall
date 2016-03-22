'use strict';

angular
    .module('video-wall-app')
    .controller('controlController', controlController);

function controlController(apiFunctions, $scope, $q){
    var vm = this,
        videoDecoder = -1;
    vm.selectCrop = "";
    vm.xCrop = "";
    vm.yCrop = "";
    vm.hCrop = "";
    vm.wCrop = "";
    vm.frameTime = "";
    vm.fTimeInput = fTimeInput;
    vm.configureCrop = configureCrop;
    vm.configureAllCrops = configureAllCrops;
    vm.deleteSelectCrop = deleteSelectCrop;
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
        var lmsSplitter = {
            'params'    : {
                'id': selected.id,
                'width': selected.width,
                'height': selected.height,
                'x':selected.x/winWidth,
                'y':selected.y/winHeight
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

    $scope.$on('selectCrop', function(evt, crop){
        var selected = $scope.mainCtrl.listCrops.filter(function(object) {return object.name == crop.target.id})[0];
        $scope.$apply(function(){
            vm.selectCrop = crop.target.id;
            vm.xCrop = selected.x;
            vm.yCrop = selected.y;
            vm.hCrop = selected.height * winHeight;
            vm.wCrop = selected.width * winWidth;
        });
    });
}



'use strict';

angular
    .module('video-wall-app')
    .controller('controlController', controlController);

function controlController(apiFunctions, $scope, $q){
    var vm = this,
        videoDecoder = -1;

    load();

    function load(){
        apiFunctions.getState()
            .then(function succesCallback(){
                for (var filterIn in lmsState.filters){
                    if (lmsState.filters[filterIn].type == "videoDecoder"){
                        videoDecoder = filterIn;
                    }
                }
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
                            $scope.$parent.$broadcast('eventInput');
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
}



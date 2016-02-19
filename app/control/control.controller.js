'use strict';

angular
    .module('video-wall-app')
    .controller('controlController', controlController);

function controlController(apiFunctions, $scope){
    var vm = this;
    load();

    function load(){
        apiFunctions.getState()
            .then(function succesCallback(response){
                lmsState = response;
                var msg = {
                    'response': response,
                    'state': true
                };
                $scope.$parent.$broadcast('msg', msg);
                if (lmsState.filters != null){
                    for(var filterIn in lmsState.filters){
                        if (lmsState.filters[filterIn].type == "videoDecoder"){
                            while(Number(lmsState.filters[filterIn].inputInfo.height)==0){
                                apiFunctions.getState();
                            }
                            inputWidth = Number(lmsState.filters[filterIn].inputInfo.width);
                            inputHeight = Number(lmsState.filters[filterIn].inputInfo.height);
                            var grid = document.getElementById('grid-snap');
                            winWidth = Number($("#grid-snap").width());
                            winHeight=((inputHeight*winWidth)/inputWidth).toFixed(0);
                            grid.style.height= winHeight+'px';
                            break;
                        }
                    }
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
}



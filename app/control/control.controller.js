'use strict';

angular
    .module('video-wall-app')
    .controller('controlController', controlController);

function controlController(apiFunctions, $window){
    var vm = this;
    load();

    function load(){
        apiFunctions.getState()
            .then(function succesCallback(response){
                lmsState = response;
                vm.succesControl();
            }, function errorCallback(response){
                lmsState = null;
                vm.errorControl(response);
            });

        console.log(lmsState);

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

    }

    vm.succesControl = function(){
        $scope.mainCtrl.successAlert = true;
        $timeout(function(){$scope.mainCtrl.successAlert = false;},1000);
        $window.location.href='#/control';
    };

    vm.errorControl = function(response){
        $scope.mainCtrl.alertMessage = response;
        $scope.mainCtrl.errorAlert = true;
        $timeout(function () {
            $scope.mainCtrl.errorAlert = false;
        }, 2000);
    };
}



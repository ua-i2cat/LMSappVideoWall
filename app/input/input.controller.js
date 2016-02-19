'use strict';

angular
    .module('video-wall-app')
    .controller('inputController', inputController);

function inputController(inputService, $window, $scope){
    var vm = this;

    $scope.mainCtrl.disconnectShow = true;

    vm.connectUriRTMP = function(){
        inputService.connectUriRTMP()
            .then(function succesCallback(response) {
                $scope.$parent.$broadcast('msg', response);
                $window.location.href = '#/control';
            })
            .catch(function errorCallback(response) {
                $scope.$parent.$broadcast('msg', response);

            });

    };

    vm.connectUriRTSP = function(){
        inputService.connectUriRTSP()
            .then(function succesCallback(response) {
                $scope.$parent.$broadcast('msg', response);
                $window.location.href = '#/control';
            })
            .catch(function errorCallback(response) {
                $scope.$parent.$broadcast('msg', response);

            });
    };
}


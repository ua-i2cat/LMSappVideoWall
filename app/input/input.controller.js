'use strict';

angular
    .module('video-wall-app')
    .controller('inputController', inputController);

function inputController(inputService, $window, $scope){
    var vm = this;
    $scope.mainCtrl.disconnectShow = true;

    vm.connectUriRTMP = connectUriRTMP;
    vm.connectUriRTSP = connectUriRTSP;

    function connectUriRTMP(){
        inputService.connectUriRTMP(vm.uri)
            .then(function succesCallback(response) {
                $scope.$parent.$broadcast('msg', response);
                $scope.mainCtrl.pageLocation = "control";
                $window.location.href = '#/control';
            })
            .catch(function errorCallback(response) {
                $scope.$parent.$broadcast('msg', response);

            });

    }

    function connectUriRTSP(){
        inputService.connectUriRTSP(vm.uri)
            .then(function succesCallback(response) {
                $scope.$parent.$broadcast('msg', response);
                $scope.mainCtrl.pageLocation = "control";
                $window.location.href = '#/control';
            })
            .catch(function errorCallback(response) {
                $scope.$parent.$broadcast('msg', response);

            });
    }
}


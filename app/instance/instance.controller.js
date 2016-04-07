'use strict';

angular
    .module('video-wall-app')
    .controller('instanceController', instanceController);

function instanceController($scope, $window, instanceService){
    var vm = this;
    vm.connectInstance = connectInstance;

    function connectInstance() {
        sHost = vm.serverHostname;
        sPort = vm.serverPort;
        apiUri = 'http://'+ vm.apiHostname +':'+ vm.apiPort +'/api';

        instanceService.connect()
            .then(function succesCallback(response) {
                $scope.$parent.$broadcast('msg', response);
                $scope.mainCtrl.pageLocation = "input";
                $window.location.href = '#/input';
            })
            .catch(function errorCallback(response) {
                $scope.$parent.$broadcast('msg', response);
            });
    }


}
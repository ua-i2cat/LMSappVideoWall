'use strict';

function instanceController($http, $window, $timeout){
    var vm = this;
    vm.instance = {};
    vm.connectInstance = function(){
        var message = {
            'host' : vm.instance.serverHostname,
            'port' : vm.instance.serverPort
        };

        sHost = vm.instance.serverHostname;
        sPort = vm.instance.serverPort;

        apiUri = 'http://'+ vm.instance.apiHostname +':'+ vm.instance.apiPort +'/api';

        $http({
            method: 'POST',
            url: apiUri + '/connect',
            data: message,
            headers: {'Content-Type': 'application/json'}
        }).then(function succesCallback() {
            vm.successAlert = true;
            $timeout(function(){vm.successAlert = false;},1000);
            $window.location.href='#/input';
        }, function errorCallback(response) {
            vm.alertMessage = response.config.url + " is not available...";
            vm.errorAlert = true;
            $timeout(function(){vm.errorAlert = false;},2000);
        });
    };
}

angular
    .module('video-wall-app')
    .controller('instanceController', instanceController);
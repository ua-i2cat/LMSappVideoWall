'use strict';

function instanceController($http, $window){
    var vm = this;
    vm.instance = {};
    vm.connectInstance = function(){
        var message = {
            'host' : vm.instance.serverHostname,
            'port' : vm.instance.serverPort
        };

        sHost = vm.instance.serverHostname;
        sPort = vm.instance.serverPort;

        var uri = 'http://'+ vm.instance.apiHostname +':'+ vm.instance.apiPort +'/api';

        $http({
            method: 'POST',
            url: uri + '/connect',
            data: message,
            headers: {'Content-Type': 'application/json'}
        }).then(function succesCallback(response) {
            console.log("success");
            apiUri = uri;
            $window.location.href='#/input';
        }, function errorCallback(response) {
            console.log("error");
            console.log(response.name);
        });
    };
}

angular
    .module('video-wall-app')
    .controller('instanceController', instanceController);
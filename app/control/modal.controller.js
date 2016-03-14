'use strict';

angular
    .module('video-wall-app')
    .controller('modalController', modalController);

function modalController($rootScope) {
    var vm = this;

    vm.addCrop = addCrop;

    function addCrop() {
        var addCrop = {
            'IP': vm.IP
        };
        $rootScope.$broadcast('addCrop', addCrop);
    }
}
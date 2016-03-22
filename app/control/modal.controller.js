'use strict';

angular
    .module('video-wall-app')
    .controller('modalController', modalController);

function modalController($rootScope) {
    var vm = this;
    vm.sound = false;
    vm.addCrop = addCrop;
    vm.showSound = showSound;
    vm.inputAspectRatio = {
        aspectRatioSelect: '16:9',
        availableAspectRatios: [
            {name: '16:10'},
            {name: '16:9'},
            {name: '4:3'},
            {name: '3:2'}
        ]
    };

    vm.inputTypes = {
        typeSelect: 'Master',
        availableTypes: [
            {name: 'Master'},
            {name: 'Slave'}
        ]
    };

    function addCrop() {
        var addCrop = {
            'IP': vm.IP,
            'aspectRatio': vm.inputAspectRatio.aspectRatioSelect,
            'type': vm.inputTypes.typeSelect,
            'sound': vm.sound
        };
        $rootScope.$broadcast('addCrop', addCrop);
    }
}
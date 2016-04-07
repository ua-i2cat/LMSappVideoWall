'use strict';

angular
    .module('video-wall-app')
    .controller('modalController', modalController);

function modalController($rootScope) {
    var vm = this;

    vm.sound = false;
    vm.addCrop = addCrop;
    if (soundCrop == "") {
        vm.showSound = showSound;
    } else {
        vm.showSound = false;
    }
    vm.inputAspectRatio = {
        aspectRatioSelect: '16:9',
        availableAspectRatios: [
            {name: '16:10'},
            {name: '16:9'},
            {name: '4:3'},
            {name: '3:2'}
        ]
    };

    if (masterCrop == "") {
        vm.inputTypes = {
            typeSelect: 'Master',
            availableTypes: [
                {name: 'Master'},
                {name: 'Slave'}
            ]
        };
    } else {
        vm.inputTypes = {
            typeSelect: 'Slave',
            availableTypes: [
                {name: 'Slave'}
            ]
        };
    }

    function addCrop() {
        var addCrop = {
            'IP': vm.IP,
            'aspectRatio': vm.inputAspectRatio.aspectRatioSelect,
            'type': vm.inputTypes.typeSelect
        };
        if (vm.showSound){
            addCrop['sound'] = vm.sound;
        }
        $rootScope.$broadcast('addCrop', addCrop);
    }
}
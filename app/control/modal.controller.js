'use strict';

angular
    .module('video-wall-app')
    .controller('modalController', modalController);

function modalController($rootScope, $scope) {
    var vm = this;

    vm.sound = false;
    vm.addCrop = addCrop;
    vm.addCrops = addCrops;

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


    if($scope.mainCtrl) {
        angular.forEach($scope.mainCtrl.configurations.availableConfigs, function (config, key) {
            if (config.name == $scope.mainCtrl.configurations.configSelect.name) {
                vm.crops = [];
                for (var i = 1; i <= config.x; i++) {
                    for (var j = 1; j <= config.y; j++) {
                        var newCrop = {
                            'IP': '',
                            'aspectRatio': {
                                aspectRatioSelect: '16:9',
                                availableAspectRatios: [
                                    {name: '16:10'},
                                    {name: '16:9'},
                                    {name: '4:3'},
                                    {name: '3:2'}
                                ]
                            },
                            'lenX': config.x,
                            'lenY': config.y,
                            'posX': i,
                            'posY': j
                        };
                        if (vm.showSound) {
                            addCrop['sound'] = vm.sound;
                        }
                        vm.crops.push(newCrop);
                    }
                }
            }
        });
    }

    function addCrop() {
        var addCrop = {
            'IP': vm.IP,
            'aspectRatio': vm.inputAspectRatio.aspectRatioSelect
        };
        if (vm.showSound){
            addCrop['sound'] = vm.sound;
        }
        $rootScope.$broadcast('addCrop', addCrop);
    }
    function addCrops() {
        $rootScope.$broadcast('addCrops', vm.crops);
    }
}
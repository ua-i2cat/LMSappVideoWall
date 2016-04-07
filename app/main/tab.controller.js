'use strict';

angular
    .module('video-wall-app')
    .controller('tabController', tabController);

function tabController($scope){
    var vm = this;
    vm.tab = 1;

    vm.setTab = function(setTab){
        vm.tab = setTab;
    };
    vm.isSet = function(isSet){
        return vm.tab === isSet;
    };
}

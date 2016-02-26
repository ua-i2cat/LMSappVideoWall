'use strict';

angular
    .module('video-wall-app')
    .controller('cropController', cropController);

function cropController() {
    var vm = this;

    load();

    function load(){
        vm.myStyle = {height: 100 + 'px', width: 100 + 'px'} ;
    }
}
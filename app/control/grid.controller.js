'use strict';

angular
    .module('video-wall-app')
    .controller('gridController', gridController);

function gridController($scope, $element) {
    var vm = this;
    vm.addCrop = addCrop;

    $scope.$on('eventInput', function(evt){
        winWidth = $element[0].firstElementChild.clientWidth;
        winHeight=Number(((inputHeight*winWidth)/inputWidth).toFixed(0));
        vm.myStyle = {height: winHeight + 'px'} ;
    });

    function addCrop(){
        console.log($scope);
        console.log($element);
        $element[0].firstElementChild.appendChild('<crop-directive></crop-directive>');
    }
}



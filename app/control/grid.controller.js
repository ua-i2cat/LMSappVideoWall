'use strict';

angular
    .module('video-wall-app')
    .controller('gridController', gridController);

function gridController($scope, $element, $compile, ngDialog, appFunctions, $rootScope) {
    var vm = this,
        element;

    $scope.$on('eventInput', function(evt){
        winWidth = $element[0].firstElementChild.clientWidth;
        winHeight=Number(((inputHeight*winWidth)/inputWidth).toFixed(0));
        vm.myStyle = {height: winHeight + 'px'} ;
        element = $element[0];
    });

    $scope.dragOptions = {
        start: function(e) {
            console.log("STARTING");
        },
        drag: function(e) {
            console.log("DRAGGING");
        },
        stop: function(e) {
            console.log("STOPPING");
            $scope.$parent.$broadcast('selectCrop', e);
        },
        resize: function(e){
            console.log("RESIZE");
        },
        container: 'grid'
    };

    $rootScope.$on('addCrop', function(evt, infoCrop){
        ngDialog.close();
        var configCrop = {
            'id' : idCrops,
            'name' : "crop" + idCrops,
            'ip' : infoCrop.IP,
            'x' : 0,
            'y' : 0,
            'width' : 0.5,
            'height' : 0.5,
            'pathId': pathTransmitterId
        };
        appFunctions.setSplitterToTransmitter(configCrop)
            .then(function succesCallback(response){
                $scope.$parent.$broadcast('msg', response);
                var crop = angular.element('<div class="outputCrop" ng-draggable="dragOptions"></div>')[0];
                crop.id = configCrop.name;
                $scope.mainCtrl.listCrops.push(configCrop);
                element.firstChild.appendChild(crop);
                $compile(crop)($scope);
            }, function errorCallback(response) {
                $scope.$parent.$broadcast('msg', response);
            });
    });

    vm.clickToView = function (){
        ngDialog.open({
            template: 'pushCrop'
        });
    };


}



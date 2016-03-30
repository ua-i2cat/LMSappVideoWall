'use strict';

angular
    .module('video-wall-app')
    .controller('gridController', gridController);

function gridController($scope, $element, $compile, ngDialog, appFunctions, $rootScope) {
    var vm = this,
        element;
    console.log($scope);
    vm.showAll = false;

    $scope.$on('inputInfo', function(evt){
        winWidth = $element[0].firstElementChild.clientWidth;
        winHeight=Number(((inputHeight*winWidth)/inputWidth).toFixed(0));
        element = $element[0];
        var el = $element.find("div");
        el.css({
            height: winHeight + 'px'
        });
        vm.showAll = true;
    });

    $scope.dragOptions = {
        start: function(e) {
            $scope.$parent.$broadcast('selectCrop', e);
        },
        drag: function(e) {
            $scope.$parent.$broadcast('selectCrop', e);
        },
        stop: function(e) {},
        container: 'grid'
    };

    $scope.resizeOptions = {
        start: function(e) {
            $scope.$parent.$broadcast('selectCrop', e);
        },
        resize: function(e) {
            $scope.$parent.$broadcast('selectCrop', e);
        },
        stop: function(e) {},
        container: 'grid'
    };

    $rootScope.$on('addCrop', function(evt, infoCrop){
        ngDialog.close();
        var configCrop = {
            'id': idCrops,
            'name': "crop" + idCrops,
            'ip': infoCrop.IP,
            'x': 0,
            'y': 0,
            'width': 0.5,
            'height': 0.5,
            'pathId': pathTransmitterId,
            'aspectRatio': infoCrop.aspectRatio,
            'type': infoCrop.type
        };
        if (showSound) {
            configCrop['sound'] = infoCrop.sound;
        }
        appFunctions.setSplitterToTransmitter(configCrop)
            .then(function succesCallback(response){
                var crop = angular.element('<div class="outputCrop" ng-draggable="dragOptions" ce-resize="resizeOptions">' + configCrop.name + '</div></div>')[0];
                crop.id = configCrop.name;
                $scope.mainCtrl.listCrops.push(configCrop);
                element.firstChild.appendChild(crop);
                $compile(crop)($scope);
                $scope.$parent.$broadcast('newCrop');
                $scope.$parent.$broadcast('msg', response);
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



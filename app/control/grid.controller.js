'use strict';

angular
    .module('video-wall-app')
    .controller('gridController', gridController);

function gridController($scope, $element, $compile, ngDialog, appFunctions, $rootScope, $window, apiFunctions) {
    var vm = this,
        element,
        gridSnap;
    vm.showAll = false;
    //$scope.mainCtrl.saveShow = true;

    angular.element($window).on('resize', function(){
        var newWinWidth = $element[0].offsetParent.clientWidth - 30;
        var newWinHeight = Number(((inputHeight*newWinWidth)/inputWidth).toFixed(0));
        gridSnap = $element.find("div");
        gridSnap.css({
            width: newWinWidth + 'px',
            height: newWinHeight + 'px'
        });
        winWidth = newWinWidth;
        winHeight = newWinHeight;
    });

    $scope.$on('inputInfo', function(evt){
        winWidth = $element[0].firstElementChild.clientWidth;
        winHeight=Number(((inputHeight*winWidth)/inputWidth).toFixed(0));
        element = $element[0];
        gridSnap = $element.find("div");
        gridSnap.css({
            height: winHeight + 'px'
        });
        vm.showAll = true;
    });

    /*$scope.dragDropOptions = {
        start: function(e) {
            $scope.$parent.$broadcast('selectCrop', e);
        },
        drag: function(e) {
            $scope.$parent.$broadcast('selectCrop', e);
        },
        resize: function(e) {
            $scope.$parent.$broadcast('selectCrop', e);
        },
        stop: function(e) {},
        container: 'grid'
    };*/

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
        idCrops++;
        var configCrop = {
            'id': idCrops,
            'name': "crop" + idCrops,
            'ip': infoCrop.IP,
            'x': 0,
            'y': 0,
            'width': 0.5,
            'height': 0.5,
            'pathId': pathTransmitterId,
            'aspectRatio': infoCrop.aspectRatio
        };
        if (showSound) {
            configCrop['sound'] = infoCrop.sound;
        }
        addOneCrop(configCrop);
    });

    $rootScope.$on('addCrops', function(evt, crops){
        ngDialog.close();

        for(var count = 0; count < crops.length; count++) {
            idCrops++;
            var configCrop = {
                'id': idCrops,
                'name': "crop" + idCrops,
                'ip': crops[count].IP,
                'x': (crops[count].posX-1)/crops[count].lenX,
                'y': (crops[count].posY-1)/crops[count].lenY,
                'width': 1/crops[count].lenX,
                'height': 1/crops[count].lenY,
                'pathId': pathTransmitterId,
                'aspectRatio': crops[count].aspectRatio.aspectRatioSelect
            };

            if (showSound) {
                configCrop['sound'] = crops[count].sound;
            }
            addOneCrop(configCrop);
        }

    });

    function addOneCrop(configCrop){
        resamplerId++;
        encoderId++;
        pathTransmitterId++;
        appFunctions.setSplitterToTransmitter(configCrop, resamplerId, idCrops, encoderId, pathTransmitterId)
            .then(function succesCallback(response) {
                var crop,
                    css ={
                        'top': configCrop.y,
                        'left':  configCrop.x
                    };
                if (showSound && configCrop.sound) {
                    crop = angular.element('<div class="outputCrop" ng-draggable="dragOptions" ce-resize="resizeOptions" ng-style="css">'
                        + configCrop.name
                        + '<br>Sound</div>')[0];
                    soundCrop = configCrop.name;
                } else {
                    //crop = angular.element('<div class="outputCrop" ng-drag-drop="dragDropOptions">'
                    crop = angular.element('<div class="outputCrop" ng-draggable="dragOptions" ce-resize="resizeOptions" ng-style="css">'
                        + configCrop.name
                        + '</div>')[0];
                }
                crop.id = configCrop.name;
                $scope.mainCtrl.listCrops.push(configCrop);
                element.firstChild.appendChild(crop);
                $compile(crop)($scope);
                $scope.$parent.$broadcast('newCrop');
                $scope.$parent.$broadcast('msg', response);
            }, function errorCallback(response) {
                $scope.$parent.$broadcast('msg', response);
            });
    }

    vm.clickToView = function (){
        ngDialog.open({
            template: 'pushCrop'
        });
    };
}



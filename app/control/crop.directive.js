angular
    .module('video-wall-app')
    .directive('cropDirective', cropDirective);

function cropDirective(){
    var directive = {
        restrict: 'E',
        controller: 'cropController',
        controllerAs: 'cropCtrl',
        template: '<div class="outputCrop" ng-style="cropCtrl.myStyle"></div>'
    };

    return directive;
}
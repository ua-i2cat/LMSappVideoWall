'use explicit'

angular
    .module('video-wall-app')
    .directive('cropDirective', cropDirective);

function cropDirective(){
    var directive = {
        restrict: 'E',
        template: '<div class="crop"></div>'
    };

    return directive;
}
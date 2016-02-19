'use explicit'

angular
    .module('video-wall-app')
    .directive('gridDirective', gridDirective);

function gridDirective() {
    var directive = {
        restrict: 'E',
        template: '<div class="grid-snap"></div>'
    };

    return directive;

}
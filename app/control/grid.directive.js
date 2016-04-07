angular
    .module('video-wall-app')
    .directive('gridDirective', gridDirective);

function gridDirective() {
    var directive = {
        restrict: 'E',
        controller: 'gridController',
        controllerAs: 'gridCtrl',
        templateUrl: '/app/control/gridTemplate.html'/*,
        link: function(scope, elem, attrs){
            elem.on('$destroy', function(){
                alert('destroyed');
            })
        }*/
    };

    return directive;

}
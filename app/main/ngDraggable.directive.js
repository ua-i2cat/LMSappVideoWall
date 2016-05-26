angular
    .module('video-wall-app')
    .directive('ngDraggable', ngDraggable);

function ngDraggable($document, $window){
    return {
        restrict: 'A',
        scope: true,
        /*scope: {
            dragOptions: '=ngDraggable'
        },*/
        link: function(scope, elem, attr) {
            var startX, startY, x, y,
                start, stop, drag, container, containerParent;
            elem[0].style.width = scope.mainCtrl.listCrops[scope.mainCtrl.listCrops.length-1].width * winWidth + 'px';
            elem[0].style.height = scope.mainCtrl.listCrops[scope.mainCtrl.listCrops.length-1].height * winHeight + 'px';
            x = scope.mainCtrl.listCrops[scope.mainCtrl.listCrops.length-1].x;
            y = scope.mainCtrl.listCrops[scope.mainCtrl.listCrops.length-1].y;

            var width  = elem[0].offsetWidth,
                height = elem[0].offsetHeight;

            // Obtain drag options
            if (scope.dragOptions) {
                start  = scope.dragOptions.start;
                drag   = scope.dragOptions.drag;
                stop   = scope.dragOptions.stop;
                var id = scope.dragOptions.container;
                if (id) {
                    containerParent = document.getElementById(id).getBoundingClientRect();
                }
            }

            angular.element($window).on('resize', function(){
                containerParent = document.getElementById(id).getBoundingClientRect();
                var oldWidth = container.width;
                var oldHeight = container.height;
                container = {
                    'x': containerParent.x,
                    'y': containerParent.y,
                    'width': containerParent.width,
                    'height': containerParent.height,
                    'top': 0,
                    'right': containerParent.width + 15,
                    'bottom': containerParent.height,
                    'left': 15
                };
                var selected = scope.mainCtrl.listCrops.filter(function(object) {return object.name == elem[0].id})[0];
                x = Number((x * container.width / oldWidth).toFixed(0));
                y = Number((y * container.height / oldHeight).toFixed(0));
                elem[0].style.width = selected.width * winWidth + 'px';
                elem[0].style.height = selected.height * winHeight + 'px';

                elem.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
            });

            container = {
                'x': containerParent.x,
                'y': containerParent.y,
                'width': containerParent.width,
                'height': containerParent.height,
                'top': 0,
                'right': containerParent.width + 15,
                'bottom': containerParent.height,
                'left': 15
            };

            elem.css({
                top: Number((y * container.height).toFixed(0))  + 'px',
                left:  Number((x * container.width).toFixed(0)) + 15 + 'px'
            });
            var selected = scope.mainCtrl.listCrops.filter(function (object) {
                return object.name == elem[0].id;
            })[0];
            selected.x = Number((x * container.width).toFixed(0));
            selected.y = Number((y * container.height).toFixed(0));
            console.log(selected);

            // Bind mousedown event
            elem.on('mousedown', function(e) {
                e.preventDefault();
                startX = e.clientX - elem[0].offsetLeft;
                startY = e.clientY - elem[0].offsetTop;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
                if (start) start(e);
            });

            // Handle drag event
            function mousemove(e) {
                if(e.target.id != "grid" && e.target.id != "" ) {
                    y = e.clientY - startY;
                    x = e.clientX - startX;
                    setPosition(e);
                    if (drag) drag(e);
                }
            }

            // Unbind drag events
            function mouseup(e) {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
                if (stop) stop(e);
            }

            // Move element, within container if provided
            function setPosition(e) {

                if (container) {
                    if (x < container.left) {
                        x = container.left;
                    } else if (x > container.right - elem[0].offsetWidth) {
                        x = container.right - elem[0].offsetWidth;
                    }
                    if (y < container.top) {
                        y = container.top;
                    } else if (y > container.bottom - elem[0].offsetHeight) {
                        y = container.bottom - elem[0].offsetHeight;
                    }
                }

                elem.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
                var selected = scope.mainCtrl.listCrops.filter(function (object) {
                    return object.name == e.target.id
                })[0];
                selected.x = x - 15;
                selected.y = y;
            }
        }
    }

}
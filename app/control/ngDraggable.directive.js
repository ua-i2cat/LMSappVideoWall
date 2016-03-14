angular
    .module('video-wall-app')
    .directive('ngDraggable', ngDraggable);

function ngDraggable($document){
    return {
        restrict: 'A',
        scope: true,
        /*scope: {
            dragOptions: '=ngDraggable'
        },*/
        link: function(scope, elem, attr) {
            var startX, startY, x = 0, y = 0,
                start, stop, drag, container, containerParent;
            elem[0].style.width = scope.mainCtrl.listCrops[scope.mainCtrl.listCrops.length-1].width * winWidth + 'px';
            elem[0].style.height = scope.mainCtrl.listCrops[scope.mainCtrl.listCrops.length-1].height * winHeight + 'px';

            console.log(attr);

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

            container = {
                'x': containerParent.x,
                'y': containerParent.y,
                'width': containerParent.width,
                'height': containerParent.height,
                'top': 5,
                'right': containerParent.width + 15,
                'bottom': containerParent.height + 5,
                'left': 15
            };


            // Bind mousedown event
            elem.on('mousedown', function(e) {
                e.preventDefault();
                startX = e.clientX - elem[0].offsetLeft;
                startY = e.clientY - elem[0].offsetTop;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
                if (start) start(e);
            });

            elem.on('resize', function(e){
                e.preventDefault();
                console.log(e);
            });

            // Handle drag event
            function mousemove(e) {
                y = e.clientY - startY;
                x = e.clientX - startX;
                setPosition(e);
                if (drag) drag(e);
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
                    } else if (x > container.right - width) {
                        x = container.right - width;
                    }
                    if (y < container.top) {
                        y = container.top;
                    } else if (y > container.bottom - height) {
                        y = container.bottom - height;
                    }
                }

                elem.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
                var selected = scope.mainCtrl.listCrops.filter(function(object) {return object.name == e.target.id})[0];
                selected.x = x - 15;
                selected.y = y -5;
            }
        }
    }

}
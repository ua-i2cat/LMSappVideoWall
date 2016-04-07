angular
    .module('video-wall-app')
    .directive('ngDragDrop', ngDragDrop);

function ngDragDrop($document, $window){
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, elem, attr) {
            var startX, startY, x = 0, y = 0,
                start, stop, drag, resize, container, containerParent;

            // Create a div to catch resize down right event
            var newElement = angular.element('<div class="se-resize"></div>');
            elem.append(newElement);

            //Set configuration
            elem[0].style.width = scope.mainCtrl.listCrops[scope.mainCtrl.listCrops.length-1].width * winWidth + 'px';
            elem[0].style.height = scope.mainCtrl.listCrops[scope.mainCtrl.listCrops.length-1].height * winHeight + 'px';

            // Obtain options
            if (scope.dragDropOptions) {
                start  = scope.dragDropOptions.start;
                drag   = scope.dragDropOptions.drag;
                resize = scope.dragDropOptions.resize;
                stop   = scope.dragDropOptions.stop;
                var id = scope.dragDropOptions.container;
                if (id) {
                    containerParent = document.getElementById(id).getBoundingClientRect();
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
                }
            }

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
                if(e.target.id == "" ) {
                    resizeSE(e);
                    if (resize) resize(e);
                } else if(e.target.id != "grid") {
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

            // Function to manage resize right event
            function resizeSE(e) {
                console.log(elem[0]);
                var width = e.clientX - elem[0].offsetParent.offsetLeft - 15 - startX + $window.scrollX;
                var height = e.clientY - elem[0].offsetParent.offsetTop - startY + $window.scrollY;

                if (container){
                    if (width + x + 15 > container.right){
                        elem.css({
                            width: container.right - startX - 15 + "px"
                        });
                    } else {
                        elem.css({
                            width: width + "px"
                        });
                    }
                    if (height + y > container.bottom) {
                        elem.css({
                            height: container.bottom - startY + "px"
                        });
                    } else {
                        elem.css({
                            height: height + "px"
                        });
                    }
                }

                //if (e.target.id != "grid") {
                    var selected;
                    if (e.target.id == ""){
                        selected = scope.mainCtrl.listCrops.filter(function (object) {
                            return object.name == e.target.parentElement.id;
                        })[0];
                        selected.width = width/winWidth;
                        selected.height = height/winHeight;
                    } else {
                        selected = scope.mainCtrl.listCrops.filter(function (object) {
                            return object.name == e.target.id
                        })[0];
                        selected.width = width/winWidth;
                        selected.height = height/winHeight;
                    }
                //}
            }

            //Resize if windows resize
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
        }
    }

}
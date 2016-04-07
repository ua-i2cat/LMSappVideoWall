angular
    .module('video-wall-app')
    .directive('ceResize', ceResize);

function ceResize($document, $window){
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, elem, attr) {
            var startX, startY, container, containerParent,
                x, y, resize, start, stop;

            // Create a div to catch resize down right event
            var newElement = angular.element('<div class="se-resize"></div>');
            elem.append(newElement);

            // Obtain drag options
            if (scope.resizeOptions) {
                resize = scope.resizeOptions.resize;
                start = scope.resizeOptions.start;
                stop = scope.resizeOptions.stop;
                var id = scope.resizeOptions.container;
                if (id) {
                    containerParent = document.getElementById(id).getBoundingClientRect();
                }
            }

            angular.element($window).on('resize', function(){
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

            newElement.on("mousedown", function(e) {
                x = elem[0].offsetLeft - 15;
                y = elem[0].offsetTop;
                $document.on("mousemove", mousemove);
                $document.on("mouseup", mouseup);
                if (start) start(e);
            });

            function mousemove(e) {
                e.preventDefault();
                resizeSE(e);
                if (resize) resize(e);
            }

            function mouseup(e) {
                $document.unbind("mousemove", mousemove);
                $document.unbind("mouseup", mouseup);
                if (stop) stop(e);
            }

            // Function to manage resize right event
            function resizeSE(e) {
                var width = e.clientX - elem[0].offsetParent.offsetLeft - 15 - x + $window.scrollX;
                var height = e.clientY - elem[0].offsetParent.offsetTop - y + $window.scrollY;

                if (container){
                    if (width + x + 15 > container.right){
                        elem.css({
                            width: container.right - x - 15 + "px"
                        });
                    } else {
                        elem.css({
                            width: width + "px"
                        });
                    }
                    if (height + y > container.bottom) {
                        elem.css({
                            height: container.bottom - y + "px"
                        });
                    } else {
                        elem.css({
                            height: height + "px"
                        });
                    }
                }

                if (e.target.id != "grid") {
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
                }

            }
        }
    }
}
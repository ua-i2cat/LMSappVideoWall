angular
    .module('video-wall-app')
    .directive('ceResize', ceResize);

function ceResize($document){
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, elem, attr) {
            var startX, startY, container, containerParent,
                x, y, resize;

            // Create a div to catch resize down right event
            var newElement = angular.element('<div class="se-resize"></div>');
            elem.append(newElement);

            // Obtain drag options
            if (scope.resizeOptions) {
                resize  = scope.dragOptions.resize;
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

            newElement.on("mousedown", function(e) {
                x = elem[0].offsetLeft - 15;
                y = elem[0].offsetTop - 5;
                $document.on("mousemove", mousemove);
                $document.on("mouseup", mouseup);
            });

            function mousemove(e) {
                e.preventDefault();
                resizeSE(e);
                if (resize) resize(e);
            }

            function mouseup() {
                $document.unbind("mousemove", mousemove);
                $document.unbind("mouseup", mouseup);
            }

            // Function to manage resize right event
            function resizeSE(e) {
                console.log("resize");
                var width = e.clientX - elem[0].offsetParent.offsetLeft - 15;
                var height = e.clientY - elem[0].offsetParent.offsetTop - 5;

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
                    if (height + y - 5 > container.bottom) {
                        elem.css({
                            height: container.bottom - y - 5 + "px"
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
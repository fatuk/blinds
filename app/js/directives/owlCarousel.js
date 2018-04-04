(function () {
    'use strict';
    angular
        .module('angular-owl-carousel', [])
        .directive('owlCarousel', [
            '$parse',
            owlCarouselDirective
        ]);

    function owlCarouselDirective($parse) {

        var owlOptions = [
            'items',
            'itemsDesktop',
            'itemsDesktopSmall',
            'itemsTablet',
            'itemsTabletSmall',
            'itemsMobile',
            'itemsCustom',
            'singleItem',
            'itemsScaleUp',
            'slideSpeed',
            'paginationSpeed',
            'rewindSpeed',
            'autoPlay',
            'stopOnHover',
            'navigation',
            'navigationText',
            'rewindNav',
            'scrollPerPage',
            'pagination',
            'paginationNumbers',
            'responsive',
            'responsiveRefreshRate',
            'responsiveBaseWidth',
            'baseClass',
            'theme',
            'lazyLoad',
            'lazyFollow',
            'lazyEffect',
            'autoHeight',
            'jsonPath',
            'jsonSuccess',
            'dragBeforeAnimFinish',
            'mouseDrag',
            'touchDrag',
            'addClassActive',
            'transitionStyle',
        ];

        var callbacks = [
            // Callbacks
            'beforeUpdate',
            'afterUpdate',
            'beforeInit',
            'afterInit',
            'beforeMove',
            'afterMove',
            'afterAction',
            'startDragging',
            'afterLazyLoad'
        ];

        return {
            restrict: 'A',
            transclude: true,
            link: function (scope, element, attributes, controller, $transclude) {

                scope.owlCarousel = {};

                var options = {},
                    id = attributes.id || 1,
                    $element = $(element);
                scope.carouselData = attributes.owlCarousel;

                //add attributes to options
                for (var i = 0; i < owlOptions.length; i++) {
                    var opt = owlOptions[i];
                    if (attributes[opt] !== undefined) {
                        options[opt] = $parse(attributes[opt])();
                    }
                }
                //add callbacks to options
                for (var j = 0; j < callbacks.length - 1; j++) {
                    var item = callbacks[j];
                    if (attributes[item] !== undefined) {
                        options[item] = scope[attributes[item]];
                    }
                }

                function jumpToItem(owl, index) {
                    if (index) {
                        var _index = parseInt(index, 10);
                        owl.jumpTo(_index);
                    }
                }

                scope.$watchCollection(scope.carouselData, function (newItems, oldItems) {
                    if (scope.owlCarousel[id]) {
                        scope.owlCarousel[id].destroy();
                    }
                    $element.empty();

                    for (var i in newItems) {
                        $transclude(function (clone, scope) {
                            scope.item = newItems[i];
                            $element.append(clone[1]);
                        });
                    }

                    $element.owlCarousel(options);
                    scope.owlCarousel[id] = $element.data('owlCarousel');

                    attributes.currentItem && jumpToItem(scope.owlCarousel[id], attributes.currentItem);

                    scope.$watch('carouselData', function () {
                        if (scope.owlCarousel[id]) {
                            // Wait for height calculated
                            setTimeout(function () {
                                scope.owlCarousel[id].reinit();
                                attributes.currentItem && jumpToItem(scope.owlCarousel[id], attributes.currentItem);
                            }, 1000);
                        }
                    }, true);
                });
            }
        };
    }
})();
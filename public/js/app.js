'use strict';

(function () {
	angular.module('app', ['LocalStorageModule', 'ngDropdowns', 'angular-owl-carousel']).constant('API_PATH', 'data/');
})();
'use strict';

(function () {
    angular.module('app').controller('CartCtrl', controller);

    function controller(CartService) {
        console.log('Cart ctrl');
    }
})();
'use strict';

(function () {
    angular.module('app').controller('FeedbackCtrl', controller);

    function controller() {
        console.log('Feedback ctrl');
    }
})();
'use strict';

(function () {
    angular.module('app').controller('MainCtrl', controller);

    function controller($rootScope, $scope, CartService, DialogService, ConfigService) {
        console.log('Main ctrl');
        var self = this;
        self.isHover = {};
        self.currentTexture = {};
        $scope.state = {
            complete: false,
            loading: false
        };
        $scope.hours = [];
        for (var i = ConfigService.openHour; i < ConfigService.closeHour; i++) {
            $scope.hours.push({
                id: i,
                label: (i < 10 ? '0' + i : i.toString()) + ' ч'
            });
        }
        $scope.minutes = [];
        for (var _i = 0; _i < 60; _i += 15) {
            $scope.minutes.push({
                id: _i,
                label: (_i < 10 ? '0' + _i : _i.toString()) + ' м'
            });
        }

        $scope.$watch(function () {
            return self.currentTexture;
        }, function () {
            self.texture = angular.fromJson(self.currentTexture);
        }, true);

        self.hoverIt = function (id, bValue) {
            self.isHover[id] = bValue;
        };

        $scope.order = {
            phone: '',
            name: '',
            hour: $scope.hours[0],
            min: $scope.minutes[0]
        };

        self.oneClickProduct = {
            phone: '',
            name: '',
            hour: $scope.hours[0],
            min: $scope.minutes[0]
        };

        $scope.message = {
            name: '',
            email: '',
            text: ''
        };

        self.addProductToCart = function (product) {
            // window.ga ('send', 'event', 'knopka_vkorzinu', 'vkorzinu');
            product = angular.fromJson(product);
            product.texture = angular.fromJson(self.currentTexture).model;
            product.price = angular.fromJson(self.currentTexture).price;
            console.log(product);
            CartService.addProduct(product);
        };

        self.removeProduct = function (key) {
            console.log('removeProduct');
            CartService.removeProduct(key);
            if (self.cartItems.length === 0) {
                self.dropdownVisible = false;
            }
        };

        self.openSearch = function () {
            $scope.state.complete = false;
            $scope.state.loading = false;
            self['is-search-open'] = true;
            $rootScope.modalOpen = true;
        };

        self.openOrder = function () {
            $scope.state.complete = false;
            $scope.state.loading = false;
            self['is-order-open'] = true;
            $rootScope.modalOpen = true;
        };

        self.buyOneClick = function (product) {
            self.oneClickProduct = angular.fromJson(product);
            self.oneClickProduct.priceExactly = self.oneClickProduct.oldPrice - self.oneClickProduct.oldPrice * self.oneClickProduct.sale / 100;
            $scope.state.complete = false;
            $scope.state.loading = false;
            self['is-oneclick-open'] = true;
            $rootScope.modalOpen = true;
        };

        self.openFeedback = function () {
            $scope.state.complete = false;
            $scope.state.loading = false;
            self['is-feedback-open'] = true;
            $rootScope.modalOpen = true;
        };

        self.openCallme = function () {
            $scope.state.complete = false;
            $scope.state.loading = false;
            $scope.order = {
                phone: '',
                name: '',
                hour: $scope.hours[0],
                min: $scope.minutes[0]
            };
            self['is-callme-open'] = true;
            $rootScope.modalOpen = true;
        };

        self.closeDialogs = function () {
            self['is-search-open'] = false;
            self['is-feedback-open'] = false;
            self['is-callme-open'] = false;
            self['is-order-open'] = false;
            self['is-oneclick-open'] = false;
            $rootScope.modalOpen = false;
        };

        self.showDropdown = function () {
            self.dropdownVisible = true;
        };

        self.hideDropdown = function () {
            self.dropdownVisible = false;
        };

        self.callmeSubmit = function () {
            var params = {};
            $scope.state.loading = true;
            angular.extend(params, {
                context: $scope.context
            }, $scope.order);

            console.log($scope.order);
            $scope.state.complete = true;

            CartService.submitCallMe(params).then(function (data) {
                // window.ga('send', 'event', 'knopka_perezvonite', 'perezvonit');
                $scope.state.loading = false;
                $scope.state.complete = true;
            }, function (err) {
                $scope.state.loading = false;
            });
        };

        self.orderSubmit = function () {
            var params = {};
            $scope.state.loading = true;
            angular.extend(params, { context: $scope.context }, $scope.order);
            params.context = 'order';
            // if (params.context === 'order') {
            //     window.ga('send', 'event', 'knopka_vkorzinu', 'vkorzinu');
            // } else if (params.context === 'oneclick') {
            //     window.ga('send', 'event', 'knopka_perezvonite_oneclick', 'perezvonit_oneclick');
            // }
            CartService.submitOrder(params).then(function (data) {
                $scope.state.loading = false;
                $scope.state.complete = true;
            }, function (err) {
                $scope.state.loading = false;
            });
        };

        self.oneClickSubmit = function () {
            var params = {};
            $scope.state.loading = true;
            angular.extend(params, { context: $scope.context }, self.oneClickProduct);
            params.context = 'order';
            CartService.submitOrder(params).then(function (data) {
                $scope.state.loading = false;
                $scope.state.complete = true;
            }, function (err) {
                $scope.state.loading = false;
            });
        };

        self.feedbackSubmit = function () {
            $scope.state.loading = true;
            CartService.submitFeedback($scope.message).then(function (data) {
                $scope.state.loading = false;
                $scope.state.complete = true;
            }, function (err) {
                $scope.state.loading = false;
            });
        };

        self.cartItems = CartService.getProducts();
    }
})();
'use strict';

(function () {
    angular.module('app').controller('OrderCtrl', controller);

    function controller() {
        console.log('Order ctrl');
    }
})();
'use strict';

(function () {
    angular.module('app').controller('ProductCtrl', controller);

    function controller() {
        console.log('Product ctrl');
    }
})();
'use strict';

(function () {
    angular.module('app').controller('SearchCtrl', controller);

    function controller() {
        console.log('Search ctrl');
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('app').factory('CartService', service);

    function service($rootScope, API_PATH, $http, $q, $interpolate, localStorageService, ConfigService) {
        var products = JSON.parse(localStorageService.get('cart_products')) || [];
        var oneClickProduct = {};
        var service = {
            addProduct: addProduct,
            removeProduct: removeProduct,
            getProducts: getProducts,
            getOneClick: getOneClick,
            addOneClick: addOneClick,
            submitOrder: submitOrder,
            submitCallMe: submitCallMe,
            submitFeedback: submitFeedback
        };
        return service;

        function addProduct(product) {
            var clone = _.cloneDeep(product);
            products.push(clone);
            localStorageService.set('cart_products', JSON.stringify(products));
        }

        function removeProduct(idx) {
            products.splice(idx, 1);
            localStorageService.set('cart_products', JSON.stringify(products));
        }

        function getProducts() {
            return products;
        }

        function addOneClick(product) {
            oneClickProduct = _.cloneDeep(product);
        }

        function getOneClick() {
            return oneClickProduct;
        }

        function formatProduct(product) {
            if (!!product.allowHeight && product.dimensions) {
                return $interpolate('{{product.title}}' + (product.texture ? " модель {{product.texture}}" : " ") + (!!product.dimensions.width && !!product.dimensions.height ? " ({{product.dimensions.width}} cм x {{product.dimensions.height}} cм)" : "") + (product.withCornice ? " + {{product.cornice.cartText}}" : ""))({
                    product: product
                });
            } else if (!product.allowHeight && product.dimensions) {
                return $interpolate('{{product.title}}' + (product.texture ? " модель {{product.texture}}" : " ") + (!!product.dimensions.width ? " ({{product.dimensions.width}} см)" : "") + (product.withCornice ? " + {{product.cornice.cartText}}" : ""))({
                    product: product
                });
            } else {
                return $interpolate('{{product.title}}' + (product.texture ? " модель {{product.texture}}" : " ") + (product.withCornice ? " + {{product.cornice.cartText}}" : ""))({
                    product: product
                });
            }
        };

        function submitOrder(params) {
            var url = API_PATH + ConfigService.orderPath;
            var defer = $q.defer();
            var data = {};
            if (params.context === 'oneclick') {
                data.text = formatProduct(oneClickProduct);
            } else if (params.context === 'order') {
                data.text = _.reduce(products, function (result, product, key) {
                    result += key + 1 + '. ' + formatProduct(product) + '\n';
                    return result;
                }, '');
            }
            data.time = params.hour.label + ' ' + params.min.label;
            angular.extend(data, params);
            delete data.context;
            delete data.hour;
            delete data.min;
            $http.post(url, data).then(function (response) {
                defer.resolve(response);
            }, function (err) {
                $log.log(err);
            });

            return defer.promise;
        };

        function submitCallMe(params) {
            var url = API_PATH + ConfigService.callMe;
            var defer = $q.defer();
            var data = {};
            data.text = 'Перезвоните мне';
            data.time = params.hour.label + ' ' + params.min.label;
            angular.extend(data, params);
            delete data.context;
            delete data.hour;
            delete data.min;
            $http.post(url, data).then(function (response) {
                defer.resolve(response);
            }, function (err) {
                $log.log(err);
            });
            return defer.promise;
        };

        function submitFeedback(params) {
            var url = API_PATH + ConfigService.feedbackPath;
            var defer = $q.defer();
            $http.post(url, params).then(function (response) {
                defer.resolve(response);
            }, function (err) {
                $log.log(err);
            });
            return defer.promise;
        };
    }
})();
'use strict';

(function () {
	'use strict';

	angular.module('app').factory('ConfigService', service);

	function service() {
		var config = angular.extend({}, {
			featuredProductPath: 'featuredProduct.json',
			productListPath: 'productList.json',
			productHomeListPath: 'productList.json',
			productSeeAlsoListPath: 'similarGoods.json',
			productPagePath: 'product.json',
			questionPath: 'questions.json',
			articlePath: 'article.json',
			catalogPath: 'catalog.json',
			catalogRootPath: 'catalogList.json',
			constructorTexturesPath: 'textures.json',
			texturesPath: 'textures.json',
			reviewsProductPath: 'reviews.json',
			reviewsArticlePath: 'articleReviews.json',
			newProductReviewPath: 'review-post-response.json',
			newArticleReviewPath: 'articleReviewPostResponse.json',
			newReviewPath: 'review-post-response.json',
			newsPath: 'news.json',
			searchPath: 'search.json',
			minPrice: 0,
			maxPrice: 99999,
			serverTime: 'serverTime.json',
			openHour: 9,
			closeHour: 21,
			callMe: 'call-me.json',
			orderPath: 'order.json',
			feedbackPath: 'feedback.json',
			structurePath: 'structure.json',
			homeArticleSlug: 'trends',
			homeArticlePath: 'mainPageAds.json',
			pastProductsCount: 4

		}, window.appLicationConfig);
		return config;
	}
})();
'use strict';

(function () {
	'use strict';

	angular.module('app').factory('DialogService', service);

	function service($rootScope) {
		var opened = false;
		var image = '';

		var setState = function setState(newState) {
			opened = newState;
			$rootScope.$broadcast('DialogService.updateState');
		};

		var getState = function getState() {
			return opened;
		};

		var setImage = function setImage(picture) {
			image = picture;
		};
		var getImage = function getImage() {
			return image;
		};

		var service = {
			getState: getState,
			setState: setState,
			getImage: getImage,
			setImage: setImage
		};

		return service;
	}
})();
'use strict';

(function () {
    'use strict';

    angular.module('angular-owl-carousel', []).directive('owlCarousel', ['$parse', owlCarouselDirective]);

    function owlCarouselDirective($parse) {

        var owlOptions = ['items', 'itemsDesktop', 'itemsDesktopSmall', 'itemsTablet', 'itemsTabletSmall', 'itemsMobile', 'itemsCustom', 'singleItem', 'itemsScaleUp', 'slideSpeed', 'paginationSpeed', 'rewindSpeed', 'autoPlay', 'stopOnHover', 'navigation', 'navigationText', 'rewindNav', 'scrollPerPage', 'pagination', 'paginationNumbers', 'responsive', 'responsiveRefreshRate', 'responsiveBaseWidth', 'baseClass', 'theme', 'lazyLoad', 'lazyFollow', 'lazyEffect', 'autoHeight', 'jsonPath', 'jsonSuccess', 'dragBeforeAnimFinish', 'mouseDrag', 'touchDrag', 'addClassActive', 'transitionStyle'];

        var callbacks = [
        // Callbacks
        'beforeUpdate', 'afterUpdate', 'beforeInit', 'afterInit', 'beforeMove', 'afterMove', 'afterAction', 'startDragging', 'afterLazyLoad'];

        return {
            restrict: 'A',
            transclude: true,
            link: function link(scope, element, attributes, controller, $transclude) {

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
//# sourceMappingURL=../js/app.js.map
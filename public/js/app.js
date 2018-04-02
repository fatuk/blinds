'use strict';

(function () {
	angular.module('app', ['LocalStorageModule', 'ngDropdowns']).constant('API_PATH', 'data/');
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
            self['is-search-open'] = true;
            $rootScope.modalOpen = true;
        };

        self.openOrder = function () {
            self['is-order-open'] = true;
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

            // CartService.submitCallMe(params)
            //     .then(function(data){
            //         // window.ga('send', 'event', 'knopka_perezvonite', 'perezvonit');
            //         $scope.state.loading = false;
            //         $scope.state.complete = true;
            //     }, function(err){
            //         $scope.state.loading = false;
            //     });
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
            $http.post(url, data).success(function (response) {
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
            $http.post(url, data).success(function (response) {
                defer.resolve(response);
            }, function (err) {
                $log.log(err);
            });
            return defer.promise;
        };

        function submitFeedback(params) {
            var url = API_PATH + ConfigService.feedbackPath;
            var defer = $q.defer();
            $http.post(url, params).success(function (response) {
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
//# sourceMappingURL=../js/app.js.map
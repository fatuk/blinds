(() => {
    angular.module('app')
        .controller('MainCtrl', controller);

    function controller($scope, CartService, DialogService, ConfigService) {
        console.log('Main ctrl');
        const self = this;
        self.isHover = false;
        self.currentTexture = {};
        $scope.state = {
            complete: false,
            loading: false
        };
        $scope.hours = [];
        for (let i = ConfigService.openHour; i < ConfigService.closeHour; i++) {
            $scope.hours.push({
                id: i,
                label: ((i<10) ? ('0'+i) : i.toString()) + ' ч'
            });
        }
        $scope.minutes = [];
        for (let i = 0; i < 60; i+=15) {
            $scope.minutes.push({
                id: i,
                label: ((i<10) ? ('0'+i) : i.toString()) + ' м'
            });
        }

        $scope.$watch(() => {
            return self.currentTexture;
        }, () => {
            self.texture = angular.fromJson(self.currentTexture);
        }, true);

        self.hoverIt = function(bValue){
			self.isHover = bValue;
        };

        $scope.order = {
            phone: '',
            name: '',
            hour: $scope.hours[0],
            min: $scope.minutes[0]
        };
        
        self.addProductToCart = product => {
            // window.ga ('send', 'event', 'knopka_vkorzinu', 'vkorzinu');
            product = angular.fromJson(product);
            product.texture = angular.fromJson(self.currentTexture).model;
            product.price = angular.fromJson(self.currentTexture).price;
            console.log(product);
			CartService.addProduct(product);
        };

        self.removeProduct = key => {
            console.log('removeProduct');
            CartService.removeProduct(key);
            if (self.cartItems.length === 0) {
                self.dropdownVisible = false;
            }
        };
        
        self.openSearch = () => {
            self['is-search-open'] = true;
        }

        self.openCallme = () => {
            $scope.state.complete = false;
            $scope.state.loading = false;
            $scope.order = {
                phone: '',
                name: '',
                hour: $scope.hours[0],
                min: $scope.minutes[0]
            };
            self['is-callme-open'] = true;
        };

        self.closeDialogs = () => {
            self['is-search-open'] = false;
            self['is-feedback-open'] = false;
            self['is-callme-open'] = false;
        }

        self.showDropdown = () => {
			self.dropdownVisible = true;
		};

		self.hideDropdown = () => {
			self.dropdownVisible = false;
        };

        self.callmeSubmit = () => {
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
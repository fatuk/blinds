(() => {
    angular.module('app')
        .controller('MainCtrl', controller);

    function controller($scope, CartService) {
        console.log('Main ctrl');
        const self = this;
        self.isHover = false;
        self.currentTexture = {};

        $scope.$watch(() => {
            return self.currentTexture;
        }, () => {
            self.texture = angular.fromJson(self.currentTexture);
        }, true);

        self.hoverIt = function(bValue){
			self.isHover = bValue;
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

        self.showDropdown = () => {
			self.dropdownVisible = true;
		};

		self.hideDropdown = () => {
			self.dropdownVisible = false;
        };

        self.cartItems = CartService.getProducts();
    }
})();
(() => {
    angular.module('app')
        .controller('CartCtrl', controller);

    function controller(CartService) {
        console.log('Cart ctrl');
    }
})();

(() => {
    angular.module('app')
        .controller('OrderCtrl', controller);

    function controller() {
        console.log('Order ctrl');
    }
})();
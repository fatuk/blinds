(() => {
    angular.module('app')
        .controller('ProductCtrl', controller);

    function controller() {
        console.log('Product ctrl');
    }
})();
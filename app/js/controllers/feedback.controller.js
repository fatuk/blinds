(() => {
    angular.module('app')
        .controller('FeedbackCtrl', controller);

    function controller() {
        console.log('Feedback ctrl');
    }
})();
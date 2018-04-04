(() => {
	angular.module('app', [
		'LocalStorageModule',
		'ngDropdowns',
		'angular-owl-carousel'
	])
		.constant('API_PATH', 'data/');
})();

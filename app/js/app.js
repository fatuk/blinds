(() => {
	angular.module('app', [
		'LocalStorageModule',
		'ngDropdowns'
	])
		.constant('API_PATH', 'data/');
})();

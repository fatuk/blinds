(() => {
	'use strict';
	angular.module('app').
	factory('DialogService', service);

	function service($rootScope) {
		let opened = false;
		let image = '';

		let setState = function(newState){
			opened = newState;
			$rootScope.$broadcast('DialogService.updateState');
		};

		let getState = function(){
			return opened;
		};

		let setImage = function(picture) {
			image = picture;
		}
		let getImage = function(){
			return image;
		};

		const service = {
			getState: getState,
			setState: setState,
			getImage: getImage,
			setImage: setImage
		};

		return service;
	}
})();

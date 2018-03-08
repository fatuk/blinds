'use strict';

$(function () {
	$('.js-hover').on('mouseover', function (e) {
		var $target = $(e.currentTarget);
		$target.addClass($target.data('class'));
	});

	$('.js-hover').on('mouseout', function (e) {
		var $target = $(e.currentTarget);
		$target.removeClass($target.data('class'));
	});
});
//# sourceMappingURL=../js/app.js.map
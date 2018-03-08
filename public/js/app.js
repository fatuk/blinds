'use strict';

$(function () {
	// Mouse hover
	$('.js-hover').on('mouseover', function (e) {
		var $target = $(e.currentTarget);
		$target.addClass($target.data('class'));
	});

	$('.js-hover').on('mouseout', function (e) {
		var $target = $(e.currentTarget);
		$target.removeClass($target.data('class'));
	});

	// Hide on scroll
	var $hideOnScroll = $('[data-scroll-class]');
	$(window).on('scroll', function () {
		if ($(window).scrollTop() >= 330) {
			$hideOnScroll.addClass($hideOnScroll.data('scroll-class'));
		} else {
			$hideOnScroll.removeClass($hideOnScroll.data('scroll-class'));
		}
	});
});
//# sourceMappingURL=../js/app.js.map
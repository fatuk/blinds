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

	// Open search
	$('.js-openSearch').click(function () {
		$('.js-dialog-search').removeClass('hide');
	});
	$('.js-close-search').click(function () {
		$('.js-dialog-search').addClass('hide');
	});

	// Open feedback
	$('.js-openFeedback').click(function () {
		$('.js-dialog-feedback').removeClass('hide');
	});
	$('.js-close-feedback').click(function () {
		$('.js-dialog-feedback').addClass('hide');
	});

	//Open callMe
	$('.js-openCallMe').click(function () {
		$('.js-dialog-callme').removeClass('hide');
	});
	$('.js-close-callme').click(function () {
		$('.js-dialog-callme').addClass('hide');
	});
});
//# sourceMappingURL=../js/app.js.map
(() => {
	angular.module('app', [
		'LocalStorageModule'
	])
		.constant('API_PATH', 'data/');
})();

// $(() => {
// 	// Mouse hover
// 	$('.js-hover').on('mouseover', (e) => {
// 		const $target = $(e.currentTarget);
// 		$target.addClass($target.data('class'));
// 	});

// 	$('.js-hover').on('mouseout', (e) => {
// 		const $target = $(e.currentTarget);
// 		$target.removeClass($target.data('class'));
// 	});
	
// 	// Hide on scroll
// 	const $hideOnScroll = $('[data-scroll-class]');
// 	$(window).on('scroll', () => {
// 		if ($(window).scrollTop() >= 330) {
// 			$hideOnScroll.addClass($hideOnScroll.data('scroll-class'));
// 		} else {
// 			$hideOnScroll.removeClass($hideOnScroll.data('scroll-class'));
// 		}
// 	});

// 	// Open search
// 	$('.js-openSearch').click(() => {
// 		$('.js-dialog-search').removeClass('hide');
// 	});
// 	$('.js-close-search').click(() => {
// 		$('.js-dialog-search').addClass('hide');
// 	});

// 	// Open feedback
// 	$('.js-openFeedback').click(() => {
// 		$('.js-dialog-feedback').removeClass('hide');
// 	});
// 	$('.js-close-feedback').click(() => {
// 		$('.js-dialog-feedback').addClass('hide');
// 	});

// 	//Open callMe
// 	$('.js-openCallMe').click(() => {
// 		$('.js-dialog-callme').removeClass('hide');
// 	});
// 	$('.js-close-callme').click(() => {
// 		$('.js-dialog-callme').addClass('hide');
// 	});
// });

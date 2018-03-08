$(() => {
	// Mouse hover
	$('.js-hover').on('mouseover', (e) => {
		const $target = $(e.currentTarget);
		$target.addClass($target.data('class'));
	});

	$('.js-hover').on('mouseout', (e) => {
		const $target = $(e.currentTarget);
		$target.removeClass($target.data('class'));
	});
	
	// Hide on scroll
	const $hideOnScroll = $('[data-scroll-class]');
	$(window).on('scroll', () => {
		if ($(window).scrollTop() >= 330) {
			$hideOnScroll.addClass($hideOnScroll.data('scroll-class'));
		} else {
			$hideOnScroll.removeClass($hideOnScroll.data('scroll-class'));
		}
	});
});

$(() => {
	$('.js-hover').on('mouseover', (e) => {
		const $target = $(e.currentTarget);
		$target.addClass($target.data('class'));
	});

	$('.js-hover').on('mouseout', (e) => {
		const $target = $(e.currentTarget);
		$target.removeClass($target.data('class'));
	});
});

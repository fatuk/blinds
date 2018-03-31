(() => {
	'use strict';
	angular.module('app').
        factory('ConfigService', service);

	function service() {
		const config = angular.extend({}, {
			featuredProductPath: 'featuredProduct.json',
			productListPath: 'productList.json',
			productHomeListPath: 'productList.json',
			productSeeAlsoListPath: 'similarGoods.json',
			productPagePath: 'product.json',
			questionPath: 'questions.json',
			articlePath: 'article.json',
			catalogPath: 'catalog.json',
			catalogRootPath: 'catalogList.json',
			constructorTexturesPath: 'textures.json',
			texturesPath: 'textures.json',
            reviewsProductPath: 'reviews.json',
            reviewsArticlePath: 'articleReviews.json',
            newProductReviewPath: 'review-post-response.json',
            newArticleReviewPath: 'articleReviewPostResponse.json',
			newReviewPath: 'review-post-response.json',
			newsPath: 'news.json',
			searchPath: 'search.json',
			minPrice: 0,
			maxPrice: 99999,
			serverTime: 'serverTime.json',
			openHour: 9,
			closeHour: 21,
			callMe: 'call-me.json',
			orderPath: 'order.json',
			feedbackPath: 'feedback.json',
			structurePath: 'structure.json',
			homeArticleSlug: 'trends',
			homeArticlePath: 'mainPageAds.json',
            pastProductsCount: 4,
			
		}, window.appLicationConfig);
		return config;
	}
})();

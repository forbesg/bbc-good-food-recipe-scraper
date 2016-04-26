(function () {
	'use strict';
	angular.module('app')
		.directive('recipeForm', function () {
			return {
				restrict: 'E',
				templateUrl: 'partials/directives/recipe-form.html'
			};
		});
})();
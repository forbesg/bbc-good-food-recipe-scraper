(function () {
	'use strict';
	angular.module('app')
	  .controller('homeController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
	  	$scope.getRecipe = function () {
				if ($scope.recipe) {

		  		var url = '/api/scrape?url=' + $scope.recipe.url;

		  		$http.get(url).then(function (response, error) {

		  			if (response.data.error) {
		  				return $scope.error = response.data.error;
		  			}

		  			$scope.json = response.data;
						$scope.recipe.url = "";

		  		});

				} else {

					return console.log('no input');

				}
	  	};

			$scope.closeError = function () {
				$scope.error = null;
				$scope.recipe.url = "";
			};
			
	  }]);
})();

(function () {
	'use strict';
	angular.module('app')
	  .controller('homeController', ['$scope', '$http', function ($scope, $http) {
	  	$scope.getRecipe = function () {
	  		var url = '/api/scrape?url=' + $scope.recipe.url;
	  		$http.get(url).then(function (response, error) {
	  			if (error) {
	  				return $scope.error = error;
	  			}
	  			$scope.json = response.data;
					$scope.recipe.url = "";
	  		});
	  	};
	  }]);
})();

(function () {
	'use strict';
	var app = angular.module('app', ['ngRoute']);
	app.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: "partials/home.html",
				controller: 'homeController'
			})
			.when('/about', {
				template: "<h1>About</h1>"
			})
			.otherwise({
				redirectTo: '/'
			});
	})
})()

angular
	.module('home', [ 'ngMaterial' ]);
angular
	.module('home')
	.controller('HomeController', ['$log', '$q',
	  HomeController
	]);

function HomeController($log) {
	var self = this;

	self.name = "Marc-Andre";
}
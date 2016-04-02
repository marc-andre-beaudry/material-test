angular
	.module('request', [ 'ngMaterial' ]);
angular
	.module('request')
	.controller('RequestController', ['$log', '$q',
	  RequestController
	]);

function RequestController($log) {
	var self = this;

	self.temp = "Request temp var";
}
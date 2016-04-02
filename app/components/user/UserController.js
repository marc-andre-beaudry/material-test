angular
	.module('user', [ 'ngMaterial' ]);
angular
	.module('user')
	.controller('UserController', ['$log', '$q',
	  UserController
	]);

function UserController($log) {
	var self = this;
	self.temp = "User temp var";
}
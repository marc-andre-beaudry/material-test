angular
	.module('unit', [ 'ngMaterial' ]);
angular
	.module('unit')
	.controller('UnitController', ['$log', '$q',
	  UnitController
	]);

function UnitController($log) {
	var self = this;

	self.temp = "Unit temp var";
}
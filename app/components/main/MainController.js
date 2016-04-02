
angular
	.module('main', [ 'ngMaterial' ]);
angular
	.module('main')
	.controller('MainController', ['$mdSidenav', '$mdBottomSheet', '$log', '$location', '$q',
	  MainController
	]);


	/**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function MainController($mdSidenav, $mdBottomSheet, $log, $location) {
    var self = this;

    self.selected     = null;
    self.actions        = [ ];
    self.selectAction   = selectedAction;
    self.toggleList   = toggleActionList;

    self.actions.push({ name: "Home" }, { name: "Unit Manager" }, {name: "User Manager" }, {name: "Service Requests" });
    // *********************************
    // Internal methods
    // *********************************

    function toggleActionList() {
      $mdSidenav('left').toggle();
    }

    function selectedAction ( action ) {
      self.selected = angular.isNumber(action) ? $scope.actions[action] : action;
      if(action.name == "Unit Manager") {
        $location.path('units');
      } else if(action.name == "User Manager") {
        $location.path('users');
      } else if(action.name == "Service Requests") {
        $location.path('requests');
      } else {
        $location.path('home');
      }
    }

  }
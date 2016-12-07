function AppToolbarController($rootScope, $mdSidenav, $location, dataService, appLocationService) {
    var vm = this;
    vm.loadTestData = function () {
        dataService.loadTestData();
    };
    $rootScope.$on('$locationChangeSuccess', updatePath);
    function updatePath() {
        var path = $location.path();
        vm.location = appLocationService.getNameForType(path);
    };
    vm.updatePath = updatePath;
    vm.updatePath();

   vm.toggleAppNavbar = function() {
       $mdSidenav('left').toggle();
   }
}

angular.module('navigation', ['ngMaterial', 'services']);
angular.module('navigation').component('appToolbar', {
    templateUrl: 'components/navigation/AppToolbar.html',
    controller: ['$rootScope', '$mdSidenav', '$location', 'DataService', 'AppLocationService', AppToolbarController],
    bindings: {
        onSelect: '&'
    }
});

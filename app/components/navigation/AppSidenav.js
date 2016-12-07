function AppSidenavController($rootScope, $location, appLocationService) {
    var vm = this;
    vm.selected = null;
    vm.actions = appLocationService.getActions();
    vm.selectedAction = function (selectedAction) {
        $location.path(selectedAction.type);
    };

    $rootScope.$on('$locationChangeSuccess', updateSelectedLocation);
    vm.updateSelectedLocation = updateSelectedLocation;
    vm.updateSelectedLocation();

    function updateSelectedLocation() {
        var type = $location.path();
        type = type.split('/')[1];
        vm.actions.forEach(function(action) {
            if (action.type === type) {
                action.isSelected = true;
            } else {
                action.isSelected = false;
            }
        });
    }
}

angular.module('navigation').component('appSidenav', {
    templateUrl: 'components/navigation/AppSidenav.html',
    controller: ['$rootScope', '$location', 'AppLocationService', AppSidenavController],
    bindings: {
        onSelect: '&'
    }
});

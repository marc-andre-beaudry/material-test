function AppToolbarController(DataService) {
    var vm = this;
    vm.dataService = DataService;

    vm.loadTestData = function () {
        vm.dataService.loadTestData();
    }
}

angular.module('toolbar', ['ngMaterial', 'services']);
angular.module('toolbar').component('appToolbar', {
    templateUrl: 'app/components/toolbar/AppToolbar.html',
    controller: ['DataService', AppToolbarController],
    bindings: {
        onSelect: '&'
    }
});

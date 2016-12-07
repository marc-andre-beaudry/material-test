function AppBottomViewController($rootScope, $location) {
    var vm = this;
    vm.isVisible = false;

    function updatePath() {
        var path = $location.path();
        if(path === '/payment_gateway') {
            vm.isVisible = true;
        } else {
            vm.isVisible = false;
        }
    };
    $rootScope.$on('$locationChangeSuccess', updatePath);
}

angular
    .module('bottom_view', ['ngMaterial', 'services']);
angular.module('bottom_view').component('appBottomView', {
    templateUrl: 'components/bottom_view/AppBottomView.html',
    controller: ['$rootScope', '$location', AppBottomViewController],
    bindings: {
        onSelect: '&'
    }
});

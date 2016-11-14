function AppNavbarController($location) {
    var vm = this;
    vm.selected = null;
    vm.actions = [];

    vm.actions.push(
        {type: "payment_gateway", name: "Payment Gateway", icon: "account_balance", selected: false},
        {type: "user", name: "User", icon: "person", selected: false},
        {type: "cart", name: "Cart", icon: "shopping_cart", selected: false},
        {type: "payment_instrument", name: "Payment Instrument", icon: "credit_card", selected: false},
        {type: "tester", name: "Tester", icon: "build", selected: false}
    );

    vm.selectedAction = function (action) {
        $location.path(action.type);
    }
}

angular.module('toolbar').component('appNavbar', {
    templateUrl: 'app/components/toolbar/AppNavbar.html',
    controller: ['$location', AppNavbarController],
    bindings: {
        onSelect: '&'
    }
});

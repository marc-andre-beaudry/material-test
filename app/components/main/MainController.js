angular
    .module('main', ['ngMaterial', 'services']);
angular
    .module('main')
    .controller('MainController', ['$mdSidenav', '$location', 'UserService', 'CartService', 'PaymentGatewayService', 'PaymentInstrumentService', MainController]);

function MainController($mdSidenav, $location, UserService, CartService, PaymentGatewayService, PaymentInstrumentService) {
    var vm = this;
    vm.userService = UserService;
    vm.cartService = CartService;
    vm.paymentGatewayService = PaymentGatewayService;
    vm.paymentInstrumentService = PaymentInstrumentService;

    vm.selected = null;
    vm.actions = [];

    vm.actions.push(
        {name: "Payment Gateway", icon: "account_balance"},
        {name: "User Manager", icon: "person"},
        {name: "Cart", icon: "shopping_cart"},
        {name: "Payment Instrument", icon: "credit_card"},
        {name: "Tester", icon: "build"}
    );

    vm.toggleAction = function () {
        $mdSidenav('left').toggle();
    };

    vm.selectedAction = function (action) {
        if (action.name == "Cart") {
            $location.path('cart');
        } else if (action.name == "Payment Instrument") {
            $location.path('payment_instrument');
        } else if (action.name == "Payment Gateway") {
            $location.path('payment_gateway');
        } else if (action.name == "Tester") {
            $location.path('tester');
        } else {
            $location.path('user');
        }
        vm.selected = angular.isNumber(action) ? $scope.actions[action] : action;
    };
}

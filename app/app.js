var app = angular.module(
    'app',
    ['ngMaterial', 'services', 'main', 'cart', 'user', 'payment_instrument', 'payment_gateway', 'tester', 'ngRoute']
);

app.config(function ($mdThemingProvider, $mdIconProvider) {

    var defaultPalette = 'indigo';
    $mdThemingProvider.setDefaultTheme(defaultPalette);
    $mdThemingProvider
        .theme(defaultPalette)
        .primaryPalette(defaultPalette)
        .accentPalette('blue')
        .warnPalette('red');
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/user', {
        templateUrl: 'app/components/user/UserView.html',
        controller: 'UserController as controller'
    });
    $routeProvider.when('/cart', {
        templateUrl: 'app/components/cart/CartView.html',
        controller: 'CartController as controller'
    });
    $routeProvider.when('/payment_instrument', {
        templateUrl: 'app/components/payment_instrument/PaymentInstrumentView.html',
        controller: 'PaymentInstrumentController as controller'
    });
    $routeProvider.when('/payment_gateway', {
        templateUrl: 'app/components/payment_gateway/PaymentGatewayView.html',
        controller: 'PaymentGatewayController as controller'
    });
    $routeProvider.when('/tester', {
        templateUrl: 'app/components/tester/TesterView.html',
        controller: 'TesterController as controller'
    });
    $routeProvider.otherwise({
        redirectTo: '/tester'
    });
}
]);
var app = angular.module(
    'app',
    ['ngMaterial', 'services', 'cart', 'user', 'payment_instrument', 'payment_gateway', 'tester', 'navigation', 'bottom_view', 'ngRoute']
);

app.config(function ($mdThemingProvider, $mdAriaProvider) {
    let appColorPaletteName = 'appColorPalette';
    let appAccentPaletteName = 'appAccentPalette';
    let appColorPaletteExtension = $mdThemingProvider.extendPalette('blue', {
        '500': '326de6',
    });

    $mdThemingProvider.definePalette(appColorPaletteName, appColorPaletteExtension);
    $mdThemingProvider.definePalette(appAccentPaletteName, appColorPaletteExtension);
    $mdThemingProvider.theme('default')
        .primaryPalette(appColorPaletteName)
        .accentPalette(appAccentPaletteName);

    $mdAriaProvider.disableWarnings();
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/user', {
        templateUrl: 'components/user/UserView.html',
        controller: 'UserController as controller'
    });
    $routeProvider.when('/cart', {
        templateUrl: 'components/cart/CartView.html',
        controller: 'CartController as controller'
    });
    $routeProvider.when('/payment_instrument', {
        templateUrl: 'components/payment_instrument/PaymentInstrumentView.html',
        controller: 'PaymentInstrumentController as controller'
    });
    $routeProvider.when('/payment_gateway', {
        templateUrl: 'components/payment_gateway/PaymentGatewayView.html',
        controller: 'PaymentGatewayController as controller'
    });
    $routeProvider.when('/tester', {
        templateUrl: 'components/tester/TesterView.html',
        controller: 'TesterController as controller'
    });
    $routeProvider.when('/tester/:paymentGateway/return', {
        templateUrl: 'components/tester/TesterView.html',
        controller: 'TesterController as controller'
    });
    $routeProvider.when('/tester/:paymentGateway/cancel', {
        templateUrl: 'components/tester/TesterView.html',
        controller: 'TesterController as controller'
    });
    $routeProvider.otherwise({
        redirectTo: '/tester'
    });
}
]);

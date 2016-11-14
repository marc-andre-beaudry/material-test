var app = angular.module(
    'app',
    ['ngMaterial', 'services', 'main', 'cart', 'user', 'payment_instrument', 'payment_gateway', 'tester', 'toolbar', 'ngRoute']
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
    $routeProvider.when('/tester/:paymentGateway/return', {
        templateUrl: 'app/components/tester/TesterView.html',
        controller: 'TesterController as controller'
    });
    $routeProvider.when('/tester/:paymentGateway/cancel', {
        templateUrl: 'app/components/tester/TesterView.html',
        controller: 'TesterController as controller'
    });
    $routeProvider.otherwise({
        redirectTo: '/tester'
    });
}
]);

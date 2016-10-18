angular
    .module('main', ['ngMaterial', 'services']);
angular
    .module('main')
    .controller('MainController', ['$mdSidenav', '$mdBottomSheet', '$log', '$location', '$q', '$http', 'UserService', 'CartService', 'PaymentGatewayService', 'PaymentInstrumentService', MainController]);

function MainController($mdSidenav, $mdBottomSheet, $log, $location, $q, $http, UserService, CartService, PaymentGatewayService, PaymentInstrumentService) {
    var self = this;
    self.userService = UserService;
    self.cartService = CartService;
    self.paymentGatewayService = PaymentGatewayService;
    self.paymentInstrumentService = PaymentInstrumentService;

    self.selected = null;
    self.actions = [];

    self.actions.push(
        {name: "Payment Gateway", icon: "account_balance"},
        {name: "User Manager", icon: "person"},
        {name: "Cart", icon: "shopping_cart"},
        {name: "Payment Instrument", icon: "credit_card"},
        {name: "Tester", icon: "build"}
    );

    self.toggleAction = function () {
        $mdSidenav('left').toggle();
    };

    self.selectedAction = function (action) {
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
        self.selected = angular.isNumber(action) ? $scope.actions[action] : action;
    };

    self.loadTestData = function () {
        var gatewayConfig = {
            "tenantId": "BILLING_INTEGRATION_TEST",
            "currencies": null,
            "timeout": 0,
            "paymentServiceName": "PayflowPro",
            "payload": null,
            "password": "qnS6VG5jUZRprTaG",
            "environment": null,
            "partner": "PayPal",
            "hostname": "pilot-payflowpro.paypal.com",
            "port": 443,
            "user.login": "testwww",
            "vendor.login": "appdirecttest",
            "merchant.description": "AppDirect",
            "merchant.contact": "1-877-404-APPS",
            "avs.enabled": true,
            "description.with.application.name": false,
            "description.max.length": 35
        };

        var userMarc = {
            "firstname": "Marc-Andre",
            "lastname": "Beaudry",
            "email": "marc-andre.beaudry@appdirect.com",
            "phoneNumber": "450-518-3720",
            "address": {
                "street1": "279 Prince Street",
                "street2": "",
                "city": "Montreal",
                "zipCode": "1Q12E2",
                "stateOrProvince": "QC",
                "countryCode": "CA"
            }
        };

        var userSebastien = {
            "firstname": "Sebastien",
            "lastname": "Coquelin",
            "email": "sebastien.coquelin@appdirect.com",
            "phoneNumber": "514-111-1111",
            "address": {
                "street1": "279 Prince Street",
                "street2": "",
                "city": "Montreal",
                "zipCode": "1Q12E2",
                "stateOrProvince": "QC",
                "countryCode": "CA"
            }
        };

        var ccMarc = {
            "type": "CREDIT_CARD",
            "gatewayKey": "",
            "userId": 1,
            "name": "Marc-Andre Beaudry",
            "number": "4111111111111111",
            "expiryMonth": 3,
            "expiryYear": 2020,
            "securityCode": "123",
            "creditCardType": "VISA"
        };

        var ccSebastien = {
            "type": "CREDIT_CARD",
            "gatewayKey": "",
            "userId": 2,
            "name": "Sebastien Coquelin",
            "number": "4111111111111111",
            "expiryMonth": 5,
            "expiryYear": 2019,
            "securityCode": "234",
            "creditCardType": "VISA"
        };

        var simpleOrderCart1 = {
            "userId": "1",
            "description": "Simple Euro Cart #1",
            "currency": "EUR",
            "orders": [{
                "orderItems": [
                    {
                        "id": "1",
                        "price": 10.00,
                        "description": "Description #1",
                        "type": "ITEM"
                    },
                    {
                        "id": "2",
                        "price": 1.50,
                        "description": "Description #2",
                        "type": "TAX"
                    }
                ]
            }]
        };

        var simpleOrderCart2 = {
            "userId": "1",
            "description": "Simple USD Cart #2",
            "currency": "USD",
            "orders": [{
                "orderItems": [
                    {
                        "id": "1",
                        "price": 45.00,
                        "description": "Description #1",
                        "type": "ITEM"
                    },
                    {
                        "id": "2",
                        "price": 7.50,
                        "description": "Description #2",
                        "type": "TAX"
                    }
                ]
            }]
        };
        var simpleOrderCart3 = {
            "userId": "2",
            "description": "Simple CAD Cart #3",
            "currency": "CAD",
            "orders": [{
                "orderItems": [
                    {
                        "id": "1",
                        "price": 1.23,
                        "description": "Description #1",
                        "type": "ITEM"
                    },
                    {
                        "id": "2",
                        "price": 0.45,
                        "description": "Description #2",
                        "type": "TAX"
                    }
                ]
            }]
        };

        self.paymentGatewayService.createPaymentService(gatewayConfig)
            .then(function (response) {
                return self.userService.createUser(userMarc)
            })
            .then(function (response) {
                return self.userService.createUser(userSebastien)
            })
            .then(function (response) {
                return self.paymentInstrumentService.createPaymentInstrument(gatewayConfig.paymentServiceName, ccMarc);
            })
            .then(function (response) {
                return self.paymentInstrumentService.createPaymentInstrument(gatewayConfig.paymentServiceName, ccSebastien);
            })
            .then(function (response) {
                return self.cartService.createOrderCart(simpleOrderCart1);
            })
            .then(function (response) {
                return self.cartService.createOrderCart(simpleOrderCart2);
            })
            .then(function (response) {
                return self.cartService.createOrderCart(simpleOrderCart3);
            });
    }
}
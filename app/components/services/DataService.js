angular.module('services')
    .service('DataService', ['UserService', 'CartService', 'PaymentGatewayService', 'PaymentInstrumentService', DataService]);

function DataService(UserService, CartService, PaymentGatewayService, PaymentInstrumentService) {
    var vm = this;
    vm.userService = UserService;
    vm.cartService = CartService;
    vm.paymentGatewayService = PaymentGatewayService;
    vm.paymentInstrumentService = PaymentInstrumentService;

    return {
        loadTestData: function () {
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

            var simpleOrderCart4 = {
                "userId": "1",
                "description": "Expensive order cart",
                "currency": "CAD",
                "orders": [{
                    "orderItems": [
                        {
                            "id": "1",
                            "price": 15000.00,
                            "description": "Expensive Item",
                            "type": "ITEM"
                        }
                    ]
                }]
            };

            var simpleOrderCart5 = {
                "userId": "1",
                "description": "Another order cart",
                "currency": "CAD",
                "orders": [{
                    "orderItems": [
                        {
                            "id": "1",
                            "price": 2500.00,
                            "description": "Random Item",
                            "type": "ITEM"
                        }
                    ]
                }]
            };

            vm.paymentGatewayService.createPaymentService(gatewayConfig)
                .then(function () {
                    return vm.userService.createUser(userMarc)
                })
                .then(function () {
                    return vm.userService.createUser(userSebastien)
                })
                .then(function () {
                    return vm.paymentInstrumentService.createPaymentInstrument(gatewayConfig.paymentServiceName, ccMarc);
                })
                .then(function () {
                    return vm.paymentInstrumentService.createPaymentInstrument(gatewayConfig.paymentServiceName, ccSebastien);
                })
                .then(function () {
                    return vm.cartService.createOrderCart(simpleOrderCart1);
                })
                .then(function () {
                    return vm.cartService.createOrderCart(simpleOrderCart2);
                })
                .then(function () {
                    return vm.cartService.createOrderCart(simpleOrderCart3);
                })
                .then(function () {
                    return vm.cartService.createOrderCart(simpleOrderCart4);
                })
                .then(function () {
                    return vm.cartService.createOrderCart(simpleOrderCart5);
                });
        }
    };
}

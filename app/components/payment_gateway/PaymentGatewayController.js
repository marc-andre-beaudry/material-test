angular
    .module('payment_gateway', ['ngMaterial', 'services']);
angular
    .module('payment_gateway')
    .controller('PaymentGatewayController', ['PaymentGatewayService',
        PaymentGatewayController
    ]);

function PaymentGatewayController(paymentGatewayService) {
    var vm = this;
    vm.gateways = [];

    paymentGatewayService.getPaymentServices().then(function (response) {
        if (response.data && response.data.length && response.data.length > 0) {
            response.data.forEach(vm.getPaymentGatewayInfo);
        }
    });

    vm.getPaymentGatewayInfo = function (gateway) {
        paymentGatewayService.getPaymentServiceInfo(gateway).then(
            function (response) {
                vm.gateways.push({name: gateway, isConfigured: true, type: response.data.type});
            }, function () {
                vm.gateways.push({name: gateway, isConfigured: false});
            });
    };
}

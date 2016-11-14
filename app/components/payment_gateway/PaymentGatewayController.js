angular
    .module('payment_gateway', ['ngMaterial', 'services']);
angular
    .module('payment_gateway')
    .controller('PaymentGatewayController', ['PaymentGatewayService',
        PaymentGatewayController
    ]);

function PaymentGatewayController(PaymentGatewayService) {
    var vm = this;
    vm.paymentGatewayService = PaymentGatewayService;
    vm.gateways = [];

    vm.paymentGatewayService.getPaymentServices().then(function (response) {
        if (response.data && response.data.length && response.data.length > 0) {
            response.data.forEach(vm.getPaymentGatewayInfo);
        }
    });

    vm.getPaymentGatewayInfo = function (gateway) {
        vm.paymentGatewayService.getPaymentServiceInfo(gateway).then(
            function (response) {
                vm.gateways.push({name: gateway, isConfigured: true, type: response.data.type});
            }, function (response) {
                vm.gateways.push({name: gateway, isConfigured: false});
            });
    };
}

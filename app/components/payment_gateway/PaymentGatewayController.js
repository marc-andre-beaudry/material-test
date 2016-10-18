angular
    .module('payment_gateway', ['ngMaterial', 'services']);
angular
    .module('payment_gateway')
    .controller('PaymentGatewayController', ['PaymentGatewayService', '$log', '$q', '$mdDialog',
        PaymentGatewayController
    ]);

function PaymentGatewayController(PaymentGatewayService, $log, $q, $mdDialog) {
    var self = this;
    self.paymentGatewayService = PaymentGatewayService;
    self.gateways = [];

    self.paymentGatewayService.getPaymentServices().then(function (response) {
        if (response.data && response.data.length && response.data.length > 0) {

            response.data.forEach(function (gateway) {
                self.paymentGatewayService.getPaymentServiceInfo(gateway).then(
                    function (response) {
                        self.gateways.push({name: gateway, isConfigured:true, type:response.data.type});
                    }, function (response) {
                        self.gateways.push({name: gateway, isConfigured:false});
                    });
            });
        }
    })
}

angular.module('services')
    .service('PaymentGatewayService', ['$http', PaymentGatewayService]);

function PaymentGatewayService($http) {
    return {
        createPaymentService: function (gatewayConfig) {
            return $http.post('http://localhost:8091/api/v1/paymentServices/' + gatewayConfig.paymentServiceName, gatewayConfig);
        },
        getPaymentServiceInfo: function(paymentServiceName) {
            return $http.get('http://localhost:8091/api/v1/paymentServices/' + paymentServiceName);
        },
        getPaymentServices: function() {
            return $http.get('http://localhost:8091/api/v1/paymentServices');
        }
    };
}
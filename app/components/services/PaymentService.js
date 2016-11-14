angular.module('services')
    .service('PaymentService', ['$http', PaymentService]);

function PaymentService($http) {
    return {
        preAuthCartRedirect: function(orderCartId) {
            return $http.post('http://localhost:8091/api/v1/payments/preauth/' + orderCartId + "/initRedirect",
                { returnUrl:"http://localhost:9000/#/tester/express_checkout/return", cancelUrl:"http://localhost:9000/#/tester/express_checkout/cancel"});
        },
        preAuthCartRedirectFinalize: function () {
            
        },
        payInvoice: function (invoice) {
            return $http.post('http://localhost:8091/api/v1/payments', invoice);
        },
        refundInvoice: function (paymentId, invoice) {
            return $http.post('http://localhost:8091/api/v1/payments/' + paymentId + '/refund', invoice);
        },
        preAuthCart: function (orderCartId) {
            return $http.post('http://localhost:8091/api/v1/payments/preauth/' + orderCartId);
        }
    };
}
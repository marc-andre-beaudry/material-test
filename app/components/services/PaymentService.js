angular.module('services')
    .service('PaymentService', ['$http', '$q', PaymentService]);

function PaymentService($http, $q) {
    return {
        preAuthCartRedirect: function(orderCartId) {
            return $http.post('http://localhost:8091/api/v1/payments/preauth/' + orderCartId + "/initRedirect",
                { returnUrl:"http://127.0.0.1:8080/user", cancelUrl:"http://127.0.0.1:8080/user"});
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
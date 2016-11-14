angular.module('services')
    .service('PaymentInstrumentService', ['$http', PaymentInstrumentService]);

function PaymentInstrumentService($http) {
    return {
        createPaymentInstrument: function (paymentServiceName, paymentInstrumentPayload) {
            return $http.post('http://localhost:8091/api/v1/paymentInstruments/' + paymentServiceName, paymentInstrumentPayload);
        },
        getDefaultPaymentInstrument: function (paymentServiceName, userId) {
            return $http.get('http://localhost:8091/api/v1/paymentInstruments/' + paymentServiceName + "?userId=" + userId);
        }
    };
}
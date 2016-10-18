angular.module('services')
    .service('InvoiceService', ['$http', '$q', InvoiceService]);

function InvoiceService($http, $q) {
    return {
        createInvoice: function (orderCartId) {
            return $http.post('http://localhost:8091/api/v1/invoices?orderCartId=' + orderCartId);
        }
    };
}
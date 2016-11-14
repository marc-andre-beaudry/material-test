angular.module('services')
    .service('InvoiceService', ['$http', InvoiceService]);

function InvoiceService($http) {
    return {
        createInvoice: function (orderCartId) {
            return $http.post('http://localhost:8091/api/v1/invoices?orderCartId=' + orderCartId);
        }
    };
}
angular.module('services')
    .service('StockService', ['$http', StockService]);

function StockService($http) {
    return {
        getStocks: function () {
            return $http.get('http://localhost:8091/api/v1/orderCarts?userId=' + userId);
        }
    };
}
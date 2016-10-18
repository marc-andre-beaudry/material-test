angular.module('services')
    .service('CartService', ['$http', '$q', CartService]);

function CartService($http, $q) {
    return {
        getOrderCartsForUser: function (userId) {
            return $http.get('http://localhost:8091/api/v1/orderCarts?userId=' + userId);
        },
        createOrderCart: function (orderCart) {
            return $http.post('http://localhost:8091/api/v1/orderCarts', orderCart);
        }
    };
}
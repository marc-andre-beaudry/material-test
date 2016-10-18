angular.module('services')
    .service('UserService', ['$http', '$q', UserService]);

function UserService($http, $q) {
    return {
        getUsers: function () {
            return $http.get('http://localhost:8091/api/v1/users');
        },
        getUser: function (id) {
            return $http.get('http://localhost:8091/api/v1/users/' + id);
        },
        createUser: function (user) {
            return $http.post('http://localhost:8091/api/v1/users', user);
        },
        updateUser: function (id, user) {
            return $http.put('http://localhost:8091/api/v1/users/' + id, user);
        },
        deleteUser: function (id) {
            return $http.delete('http://localhost:8091/api/v1/users/' + id);
        }
    };
}
angular.module('services')
    .service('UserService', ['$http', UserService]);

function UserService($http) {
    return {
        getUsers: function () {
            return $http.get('http://localhost:8091/api/v1/users');
        },
        createUser: function (user) {
            return $http.post('http://localhost:8091/api/v1/users', user);
        },
        updateUser: function (user) {
            return $http.put('http://localhost:8091/api/v1/users/' + user.id, user);
        },
        deleteUser: function (user) {
            return $http.delete('http://localhost:8091/api/v1/users/' + user.id);
        }
    };
}
angular.module('services')
    .service('EventService', ['$http', EventService]);

function EventService($http) {
    return {
        createEvent: function (event) {
            return $http.post('http://localhost:8091/api/v1/events', event);
        },
        getEvents: function () {
            return $http.get('http://localhost:8091/api/v1/events');
        }
    };
}
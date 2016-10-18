angular
    .module('user', ['ngMaterial', 'services']);
angular
    .module('user')
    .controller('UserController', ['UserService', '$log', '$q', '$mdDialog', UserController]);

function UserController(UserService, $log, $q, $mdDialog) {
    var self = this;
    self.userService = UserService;

    self.isLoading = false;
    self.editMode = "NEW";
    self.currentUser = undefined;
    self.users = [];

    self.fetchUsers = function () {
        isLoading = true;
        self.userService.getUsers()
            .then(function (response) {
                isLoading = false;
                self.users = response.data;
            }, function (response) {
                isLoading = false;
            });
    };

    self.newUser = function (event) {
        self.editMode = "NEW";
        var newId = self.users.length + 1;
        var user = {id: newId};
        self.currentUser = user;
    };

    self.editUser = function (event, user) {
        self.editMode = "EDIT";
        self.currentUser = user;
    };

    self.deleteUser = function (event, user) {
        self.users.splice(self.users.indexOf(user), 1);
    };

    self.cancelEditUser = function (event) {
        self.currentUser = undefined;
    };

    self.confirmEditUser = function (event) {
        if (self.editMode == "NEW") {
            self.users.push(self.currentUser);
        }
        self.currentUser = undefined;
    };
    self.fetchUsers();
}
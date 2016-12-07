angular
    .module('user', ['ngMaterial', 'services']);
angular
    .module('user')
    .controller('UserController', ['UserService', UserController]);

function UserController(userService) {
    var vm = this;
    vm.editMode = "NEW";
    vm.currentUser = undefined;
    vm.users = [];

    vm.newUser = function () {
        vm.editMode = "NEW";
        var newId = vm.users.length + 1;
        var user = { id: newId };
        vm.currentUser = user;
    };

    vm.editUser = function (user) {
        vm.editMode = "EDIT";
        vm.currentUser = JSON.parse(JSON.stringify(user));
    };

    vm.deleteUser = function (user) {
        userService.deleteUser(user).then(function () {
            vm.fetchUsers();
        });
    };

    vm.cancelEditUser = function () {
        vm.currentUser = undefined;
    };

    vm.confirmEditUser = function () {
        if (vm.editMode == "NEW") {
            userService.createUser(vm.currentUser).then(function() {
                vm.fetchUsers();
            });
        } else if (vm.editMode == "EDIT") {
            userService.updateUser(vm.currentUser).then(function() {
                vm.fetchUsers();
            });
        }
    };

    vm.fetchUsers = function () {
        userService.getUsers()
            .then(function (response) {
                vm.users = response.data;
                vm.currentUser = undefined;
            });
    };
    vm.fetchUsers();
}

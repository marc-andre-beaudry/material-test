angular
    .module('user', ['ngMaterial', 'services']);
angular
    .module('user')
    .controller('UserController', ['UserService', UserController]);

function UserController(UserService) {
    var vm = this;
    vm.userService = UserService;
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
        vm.userService.deleteUser(user).then(function (success) {
            vm.fetchUsers();
        });
    };

    vm.cancelEditUser = function () {
        vm.currentUser = undefined;
    };

    vm.confirmEditUser = function () {
        if (vm.editMode == "NEW") {
            vm.userService.createUser(vm.currentUser).then(function(response) {
                vm.fetchUsers();
            });
        } else if (vm.editMode == "EDIT") {
            vm.userService.updateUser(vm.currentUser).then(function(response) {
                vm.fetchUsers();
            });
        }
    };

    vm.fetchUsers = function () {
        vm.userService.getUsers()
            .then(function (response) {
                vm.users = response.data;
                vm.currentUser = undefined;
            });
    };
    vm.fetchUsers();
}
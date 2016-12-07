function UserPickerController(userService) {
    var vm = this;
    userService.getUsers()
        .then(function (response) {
            vm.users = response.data;
            if (vm.users.length > 0) {
                vm.selectedUser = vm.users[0];
                vm.select();
            }
        }, function (response) {
        });
    vm.select = function () {
        vm.onSelect({user: vm.selectedUser});
    };
}

angular.module('user').component('userPicker', {
    templateUrl: 'components/user/UserPicker.html',
    controller: ['UserService', UserPickerController],
    bindings: {
        onSelect: '&'
    }
});

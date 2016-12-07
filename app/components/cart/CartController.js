angular
    .module('cart', ['ngMaterial', 'services']);
angular
    .module('cart')
    .controller('CartController', ['CartService', CartController]);

function CartController(cartService) {
    var vm = this;

    vm.selectedUser = undefined;

    vm.orderCarts = [];
    vm.currentOrderCart = undefined;

    vm.newOrderCart = function () {
        vm.editMode = "NEW";
        var newId = vm.orderCarts.length + 1;
        var cart = {id: newId, orders: [{id: 1, orderItems:[]}]};
        vm.currentOrderCart = cart;
    };

    vm.editOrderCart = function (cart) {
        vm.editMode = "EDIT";
        vm.currentOrderCart = cart;
    };

    vm.cancelEditOrderCart = function () {
        vm.currentOrderCart = undefined;
    };

    vm.confirmEditOrderCart = function () {
        if (vm.editMode == "NEW") {
            vm.orderCarts.push(vm.currentOrderCart);
        }
        vm.currentOrderCart = undefined;
    };

    vm.addItemToCurrentCart = function () {
        var nextId = vm.currentOrderCart.orders[0].orderItems.length + 1;
        var defaultItem = {id: nextId, type: "ITEM"};
        vm.currentOrderCart.orders[0].orderItems.push(defaultItem);
    };

    vm.deleteItemFromCurrentCart = function (item) {
        vm.currentOrderCart.orders[0].orderItems.splice(vm.currentOrderCart.orders[0].orderItems.indexOf(item), 1);
    };

    vm.getCartTotal = function(orderCart) {

    };

    vm.selectedUserChanged = function (user) {
        vm.selectedUser = user;
        cartService.getOrderCartsForUser(vm.selectedUser.id)
            .then(function (response) {
                vm.orderCarts = response.data;
            });
    };
};

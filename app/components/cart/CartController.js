angular
    .module('cart', ['ngMaterial', 'services']);
angular
    .module('cart')
    .controller('CartController', ['UserService', 'CartService', '$log', '$q', CartController]);

function CartController(UserService, CartService, $log, $q) {
    var self = this;
    self.userService = UserService;
    self.cartService = CartService;

    self.users = [];
    self.selectedUser = undefined;

    self.orderCarts = [];
    self.currentOrderCart = undefined;

    self.newOrderCart = function (event) {
        self.editMode = "NEW";
        var newId = self.orderCarts.length + 1;
        var cart = {id: newId, orders: [{id: 1, orderItems:[]}]};
        self.currentOrderCart = cart;
    };

    self.editOrderCart = function (event, cart) {
        self.editMode = "EDIT";
        self.currentOrderCart = cart;
    };

    self.cancelEditOrderCart = function (event) {
        self.currentOrderCart = undefined;
    };

    self.confirmEditOrderCart = function (event) {
        if (self.editMode == "NEW") {
            self.orderCarts.push(self.currentOrderCart);
        }
        self.currentOrderCart = undefined;
    };

    self.addItemToCurrentCart = function (event) {
        var nextId = self.currentOrderCart.orders[0].orderItems.length + 1;
        var defaultItem = {id: nextId, type: "ITEM"};
        self.currentOrderCart.orders[0].orderItems.push(defaultItem);
    };

    self.deleteItemFromCurrentCart = function (event, item) {
        self.currentOrderCart.orders[0].orderItems.splice(self.currentOrderCart.orders[0].orderItems.indexOf(item), 1);
    };

    self.selectedUserChanged = function () {
        self.cartService.getOrderCartsForUser(self.selectedUser.id)
            .then(function (response) {
                self.orderCarts = response.data;
            }, function (response) {
                self.orderCarts = [];
            });
    };

    self.fetchUsers = function () {
        self.userService.getUsers()
            .then(function (response) {
                self.users = response.data;
                if(self.users.length > 1) {
                    self.selectedUser = self.users[0];
                    self.selectedUserChanged();
                }
            }, function (response) {
            });
    };
    self.fetchUsers();
}
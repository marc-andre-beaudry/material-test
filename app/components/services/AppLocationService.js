angular.module('services')
    .service('AppLocationService', [AppLocationService]);

function AppLocationService() {
    var actions = [];
    actions.push(
        {type: "payment_gateway", name: "Payment Gateway", icon: "account_balance", selected: false},
        {type: "user", name: "User", icon: "person", selected: false},
        {type: "cart", name: "Cart", icon: "shopping_cart", selected: false},
        {type: "payment_instrument", name: "Payment Instrument", icon: "credit_card", selected: false},
        {type: "tester", name: "Tester", icon: "build", selected: false}
    );

    return {
        getActions: function () {
            return actions;
        },
        getNameForType: function(type) {
            type = type.split('/')[1];
            var action = actions.find(function(elem) {
                return elem.type === type;
            });
            return action.name || "";
        }
    };
}
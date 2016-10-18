angular
    .module('payment_instrument', ['ngMaterial', 'services']);
angular
    .module('payment_instrument')
    .controller('PaymentInstrumentController', ['UserService', 'PaymentInstrumentService', '$log', '$q', '$mdDialog',
        PaymentInstrumentController
    ]);

function PaymentInstrumentController(UserService, PaymentInstrumentService, $log, $q,  $mdDialog) {
    var self = this;
    self.userService = UserService;
    self.paymentInstrumentService = PaymentInstrumentService;

    self.users = [];
    self.selectedUser = undefined;

    self.selectedUserChanged = function () {
        self.paymentInstrumentService.getDefaultPaymentInstrument('PayflowPro', self.selectedUser.id)
            .then(function (response) {
                self.currentPaymentInstrument = response.data;
            }, function (response) {
                self.currentPaymentInstrument = undefined;
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

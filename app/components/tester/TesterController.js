angular
    .module('tester', ['ngMaterial', 'services']);
angular
    .module('tester')
    .controller('TesterController', ['UserService', 'CartService', 'InvoiceService', 'PaymentService', 'PaymentInstrumentService', '$log', '$q', '$mdDialog', '$window',
        TesterController
    ]);

function TesterController(UserService, CartService, InvoiceService, PaymentService, PaymentInstrumentService, $log, $q, $mdDialog, $window) {
    var self = this;
    self.userService = UserService;
    self.cartService = CartService;
    self.invoiceService = InvoiceService;
    self.paymentService = PaymentService;
    self.paymentInstrumentService = PaymentInstrumentService;

    self.events = [];
    self.eventId = 0;

    self.generateInvoice = function (event) {
        self.invoiceService.createInvoice(self.selectedOrderCart.id)
            .then(function (response) {
                var event = {
                    id: self.eventId++,
                    type: "INVOICE_EVENT",
                    payload: response.data
                };
                self.events.push(event);
            }, function () {
            });
    };
    
    self.preAuthCartRedirect = function (event) {
        self.paymentService.preAuthCartRedirect(self.selectedOrderCart.id)
            .then(function (response) {
                console.log(response);
                if(response.data.redirectUrl) {
                    console.log('Redirecting');
                    $window.location.href = response.data.redirectUrl;
                }
            }, function (response) {
                console.log(response);
            });
    };

    self.preAuthCart = function (event) {
        self.paymentService.preAuthCart(self.selectedOrderCart.id)
            .then(function (response) {
                var event = {
                    id: self.eventId++,
                    type: "PREAUTH_EVENT",
                    payload: response.data
                };
                self.events.push(event);
            }, function (response) {
            });

    };

    self.payInvoice = function (event, invoiceId) {
        self.paymentService.payInvoice({id: invoiceId})
            .then(function (response) {
                var event = {
                    id: self.eventId++,
                    type: "PAYMENT_EVENT",
                    payload: response.data
                };
                self.events.push(event);
            }, function () {
            });
    };

    self.refundPayment = function (event, paymentId, invoiceId) {
        self.paymentService.refundInvoice(paymentId, {id: invoiceId})
            .then(function (response) {
                var event = {
                    id: self.eventId++,
                    type: "REFUND_EVENT",
                    payload: response.data
                };
                self.events.push(event);
            }, function () {
            });
    };

    self.selectedUserChanged = function () {
        self.cartService.getOrderCartsForUser(self.selectedUser.id)
            .then(function (response) {
                self.orderCarts = response.data;
                if(self.orderCarts.length > 1) {
                    self.selectedOrderCart = self.orderCarts[0];
                }
            }, function (response) {
                self.orderCarts = [];
            });
        self.fetchDefaultPaymentInstrument();
    };
    
    self.fetchDefaultPaymentInstrument = function () {
        self.paymentInstrumentService.getDefaultPaymentInstrument("PayflowPro", self.selectedUser.id)
            .then(function(response) {
                self.paymentInstruments = [response.data];
                self.selectedPaymentInstrument = response.data;
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

angular
    .module('tester', ['ngMaterial', 'services']);
angular
    .module('tester')
    .controller('TesterController', ['CartService', 'InvoiceService', 'PaymentService', 'PaymentInstrumentService', 'EventService', '$routeParams', '$window',
        TesterController
    ]);

function TesterController(cartService, invoiceService, paymentService, paymentInstrumentService, eventService, $routeParams, $window) {
    var vm = this;

    vm.events = [];
    vm.eventId = 0;

    vm.handleRouteParams = function() {
        if($routeParams.paymentGateway) {

            var redirectInitPayload = {
                isSuccess: true
            };
            var event = {
                type: "REDIRECT_INIT_EVENT",
                payload: JSON.stringify(redirectInitPayload)
            };
            eventService.createEvent(event).then(function () {
                vm.fetchEvents();
            });
        }
    };

    vm.generateInvoice = function () {
        invoiceService.createInvoice(vm.selectedOrderCart.id)
            .then(function (response) {
                console.log(response.data);
                var event = {
                    type: "INVOICE_EVENT",
                    payload: JSON.stringify(response.data)
                };
                eventService.createEvent(event).then(function () {
                    vm.fetchEvents();
                });
            });
    };
    
    vm.preAuthCartRedirect = function () {
        paymentService.preAuthCartRedirect(vm.selectedOrderCart.id)
            .then(function (response) {
                console.log(response.data);
                if(response.data.redirectUrl) {
                    $window.location.href = response.data.redirectUrl;
                }
            });
    };

    vm.preAuthCart = function () {
        paymentService.preAuthCart(vm.selectedOrderCart.id)
            .then(function (response) {
                console.log(response.data);
                var event = {
                    id: vm.eventId++,
                    type: "PREAUTH_EVENT",
                    payload: JSON.stringify(response.data)
                };
                eventService.createEvent(event).then(function () {
                    vm.fetchEvents();
                });
            });

    };

    vm.payInvoice = function (event, invoiceId) {
        paymentService.payInvoice({id: invoiceId})
            .then(function (response) {
                console.log(response.data);
                var event = {
                    id: vm.eventId++,
                    type: "PAYMENT_EVENT",
                    payload: JSON.stringify(response.data)
                };
                eventService.createEvent(event).then(function () {
                    vm.fetchEvents();
                });
            });
    };

    vm.refundPayment = function (event, paymentId, invoiceId) {
        paymentService.refundInvoice(paymentId, {id: invoiceId})
            .then(function (response) {
                console.log(response.data);
                var event = {
                    id: vm.eventId++,
                    type: "REFUND_EVENT",
                    payload: JSON.stringify(response.data)
                };
                eventService.createEvent(event).then(function () {
                    vm.fetchEvents();
                });
            });
    };

    vm.selectedUserChanged = function (user) {
        vm.selectedUser = user;
        cartService.getOrderCartsForUser(vm.selectedUser.id)
            .then(function (response) {
                vm.orderCarts = response.data;
                if(vm.orderCarts.length > 1) {
                    vm.selectedOrderCart = vm.orderCarts[0];
                }
            }, function (response) {
                vm.orderCarts = [];
            });
        vm.fetchDefaultPaymentInstrument();
    };
    
    vm.fetchDefaultPaymentInstrument = function () {
        paymentInstrumentService.getDefaultPaymentInstrument("PayflowPro", vm.selectedUser.id)
            .then(function(response) {
                vm.paymentInstruments = [response.data];
                vm.selectedPaymentInstrument = response.data;
            });
    };
    
    vm.fetchEvents = function () {
        eventService.getEvents()
            .then(function (response) {
                vm.events= [];
                response.data.forEach(function(event) {
                vm.events.push(vm.eventParser(event));
            });
        });
    };
    
    vm.eventParser = function (event) {
        var parsedEvent = {
            id: event.id,
            type: event.type,
            payload: JSON.parse(event.payload)
        };
        return parsedEvent;
    };
    vm.getBackground = function (event) {
        if(event.payload.isSuccess === true) {
            return "#66BB6A";
        } else  if(event.payload.isSuccess === false) {
            return "#EF5350";
        } else {
            return "";
        }
    };

    vm.getName = function(event) {
        var str = event.type.replace('_', ' ').toLocaleLowerCase();
        return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };
    
    vm.getPrettyString = function (str) {
        str = str.replace('_', ' ').toLocaleLowerCase();
        return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    vm.fetchEvents();
}

angular
    .module('payment_instrument', ['ngMaterial', 'services']);
angular
    .module('payment_instrument')
    .controller('PaymentInstrumentController', ['PaymentInstrumentService', '$log', '$q', '$mdDialog',
        PaymentInstrumentController
    ]);

function PaymentInstrumentController(PaymentInstrumentService, $log, $q,  $mdDialog) {
    var vm = this;
    vm.paymentInstrumentService = PaymentInstrumentService;

    vm.selectedUserChanged = function (user) {
        vm.paymentInstrumentService.getDefaultPaymentInstrument('PayflowPro', user.id)
            .then(function (response) {
                vm.currentPaymentInstrument = response.data;
            }, function (response) {
                vm.currentPaymentInstrument = undefined;
            });
    };
}

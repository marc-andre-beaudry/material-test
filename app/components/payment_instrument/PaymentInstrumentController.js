angular
    .module('payment_instrument', ['ngMaterial', 'services']);
angular
    .module('payment_instrument')
    .controller('PaymentInstrumentController', ['PaymentInstrumentService', '$log', '$q', '$mdDialog',
        PaymentInstrumentController
    ]);

function PaymentInstrumentController(paymentInstrumentService, $log, $q,  $mdDialog) {
    var vm = this;

    vm.selectedUserChanged = function (user) {
        paymentInstrumentService.getDefaultPaymentInstrument('PayflowPro', user.id)
            .then(function (response) {
                vm.currentPaymentInstrument = response.data;
            }, function () {
                vm.currentPaymentInstrument = undefined;
            });
    };
}

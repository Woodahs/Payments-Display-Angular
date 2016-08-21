(function() {
    var app = angular.module("paymentsViewer", []);
    var currentPage = 0;

    var MainController = function($scope, payments) {
        var onPaymentDataFetch = function(data) {
            $scope.paymentList = data.payments || false;
            $scope.pagination = data.pagination || false;
            console.debug(data);
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch the data.";
        };

        $scope.search = function(query) {
        	payments.getPaymentList({
				query: this.supplierName
        	});
        };

        $scope.resetSearchForm = function() {
			this.supplierName = "";
        };

        var init = function() {
        	$scope.supplierName = "";
            payments.getMainPage().then(onPaymentDataFetch, onError);
        };
        init();
    };

    app.controller("MainController", MainController);
}());

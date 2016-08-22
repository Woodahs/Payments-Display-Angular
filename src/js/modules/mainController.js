/*
 *	main controller for the application
 */

(function() {
    var app = angular.module("paymentsViewer", ["pathgather.popeye"]);

    var MainController = function($scope, payments, pagination, modal, Popeye) {
        var paymentData;

        // handler for displaying data from payment API
        var onPaymentDataFetch = function(data) {
            $scope.error = false;
            $scope.paymentList = data.payments || false;
            $scope.pagination = data.pagination || false;
            if (!data.payments) {
                $scope.error = "There are no payments for provided query!";
            }
            paymentData = data;
        };

        // handler for setting error on payment API error
        var onError = function(reason) {
            $scope.error = "Could not fetch the data.";
        };

        // make search query to payment API and add proper handle for the success and error response
        var search = function(settings) {
            var settings = settings || {};

            var supplier = settings.supplier || $scope.search.supplier;
            var rating = settings.rating || $scope.search.rating;
            var page = settings.page || 0;

            // handler for prev/next elements in pagination
            if (typeof settings.pageOffset !== "undefined") {
                page = pagination.getCurrentPage(paymentData, settings.pageOffset);
            }

            // if there is query provided in settings object, then get payment list for that query
            if (typeof settings.query === "string") {
                payments.getPaymentListFromQuery(settings.query).then(onPaymentDataFetch, onError);
            } else {
                payments.getPaymentList(supplier, rating, page).then(onPaymentDataFetch, onError);
            }
        };

        // make search function available in $scope
        $scope.search = search;

        // reset search form and load default payments page
        $scope.resetSearchForm = function() {
            this.search.supplier = "";
            this.search.rating = "";
            search();
        };

        $scope.openModal = function(payment) {
        	$scope.payment = payment;
        	modal.openModal($scope);
        };

		// search for payments on initialization
        var init = function() {
        	search();
        };

		init();
    };

    app.controller("MainController", MainController);
}());

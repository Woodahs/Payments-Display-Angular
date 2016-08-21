/*
 *	main controller for the application
 */

(function() {
    var app = angular.module("paymentsViewer", []);

    var MainController = function($scope, payments) {
        var paymentData;

        // get current page number with provided offset
        var getCurrentPage = function(offset) {
            var currentPage = offset;

            if (typeof paymentData !== "undefined") {
                currentPage = currentPage + parseInt(paymentData.pagination.current);
                if (currentPage > paymentData.pagination.total) {
                    currentPage = paymentData.pagination(total);
                }
            }

            if (currentPage < 0) {
                currentPage = 0;
            }

            return currentPage;
        };

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
                page = getCurrentPage(settings.pageOffset);
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

        search();
    };

    app.controller("MainController", MainController);
}());

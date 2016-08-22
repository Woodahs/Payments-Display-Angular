/*
 *  module for pagination functionality
 */

(function() {
    var pagination = function() {
        // get current page number with provided offset
        var getCurrentPage = function(paymentData, offset) {
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

        return {
            getCurrentPage: getCurrentPage
        };

    };

    var module = angular.module("paymentsViewer");
    module.factory("pagination", pagination);
})();

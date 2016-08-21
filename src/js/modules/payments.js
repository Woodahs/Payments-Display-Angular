/*
 *  module for handling HTTP reqests from payments API
 */

(function() {
    var payments = function($http) {
        // make HTTP request to payment API with provided query
        var paymentRequest = function(query) {
            return $http.get("http://test-api.kuria.tshdev.io/" + query)
                .then(function(response) {
                    return response.data
                });
        };
        
        // get payment list with provided query
        var getPaymentListFromQuery = function(query) {
            return paymentRequest(query);
        };
        
        // get payment list with provided data (supplier name, rating, page)
        var getPaymentList = function(supplier, rating, page) {
            var query = `?query=${supplier || ""}&rating=${rating || 0}&page=${page || 0}`;
            return paymentRequest(query);
        };

        return {
            getPaymentList: getPaymentList,
            getPaymentListFromQuery: getPaymentListFromQuery
        };

    };

    var module = angular.module("paymentsViewer");
    module.factory("payments", payments);
})();

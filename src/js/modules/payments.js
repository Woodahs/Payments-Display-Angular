/*
 *  module for handling HTTP reqests from payments API
 */

(function() {

    var payments = function($http) {
        var getMainPage = function() {
            return $http.get("//test-api.kuria.tshdev.io/")
                .then(function(response) {
                    return response.data
                });
        }

        var getPaymentList = function(settings) {
            console.debug(settings);
        };

        return {
            getMainPage: getMainPage,
            getPaymentList: getPaymentList
        };

    };

    var module = angular.module("paymentsViewer");
    module.factory("payments", payments);
})();

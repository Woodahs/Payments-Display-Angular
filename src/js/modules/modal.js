/*
 *  module for modal functionality
 */

(function() {
    var modal = function(Popeye) {
        // get current page number with provided offset

        var openModal = function($scope) {
            Popeye.openModal({
                templateUrl: "templates/modal.html",
                scope: $scope
            });
        };

        return {
            openModal: openModal
        };

    };

    var module = angular.module("paymentsViewer");
    module.factory("modal", modal);
})();

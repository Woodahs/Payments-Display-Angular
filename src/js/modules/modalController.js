/*
 *	controller for modal
 */

(function() {
    var app = angular.module("paymentsViewer", ["pathgather.popeye"]);
    
    var ModalController = function($scope) {
    	console.debug($scope);
    };

    app.controller("ModalController", ModalController);
}());

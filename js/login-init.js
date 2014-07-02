// create angular app
var validationApp = angular.module('validationApp', []);
var showILT = false;
var isILTlogin = false;

// create angular controller
validationApp.controller('mainController', function($scope) {

	// function to submit the form after all validation has occurred			
	$scope.authenticate = function(isValid) {

		// check to make sure the form is completely valid
		if (isValid) { 
			alert('Done :) ');
		}

	};

});
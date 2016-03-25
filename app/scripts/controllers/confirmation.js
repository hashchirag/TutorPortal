'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('ConfirmationCtrl', function ($scope,$location,$route) {
 	var $button = document.querySelector('#proceed');
 	$button.addEventListener('click', function() {
 		
 		var res = $location.path().replace("confirmation", "policy");
 		$location.path(res);

 		$route.reload();
 		alert('async()');
 	});
 });

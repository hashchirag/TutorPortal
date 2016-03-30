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
 		
 		$location.path('/'+ 'policy');
 		$route.reload();
 	});
 });

'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('SorryCtrl', function ($scope,$location,$route,$http) {

 	$(document).ready(function() {

 		$('#okay').click(function(){
 			window.location="http://now.hashlearn.com/";
 		});


 	});
 });
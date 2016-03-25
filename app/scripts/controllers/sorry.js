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
	// this is ugly, threw it together to make it work.
	var state = true;

	$('.redo').click(function() {
		reanimate();
	});

	$('.error').hide().removeClass('animate');

	var reanimate = function() {
		if (state === false) {
			state = true;
			$('.success').show().addClass('animate');
			$('.error').hide().removeClass('animate');
		} else {
			state = false;
			$('.success').hide().removeClass('animate');
			$('.error').show().addClass('animate');
		}
	};

});
 });
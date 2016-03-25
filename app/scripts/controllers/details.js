'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('DetailsCtrl', function ($scope,$location,$route) {



 	$scope.addCheckbox = function(a){
 		var container = $('#cb');
 		var inputs = container.find('input');
 		var id = inputs.length+1;

 		$('<input />', { type: 'checkbox', id: 'cb'+id, value: name }).appendTo(container);
 		$('<label />', { 'for': 'cb'+id, text: a}).appendTo(container);
 		$('</br>').appendTo(container);
 	}

 	$scope.array1= ["first","second"];

 	for(var i =0 ; i < $scope.array1.length ; i ++ ){
 		$scope.addCheckbox($scope.array1[i]);
 	}



 });

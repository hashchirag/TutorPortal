'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('examdashboardCtrl', function ($scope,$location,$route,$http) {

 	if(typeof(Storage) !== "undefined") {
 		var isLoggedIn = sessionStorage.getItem("loggedIntoFB");
 		console.log(isLoggedIn);

 		if(isLoggedIn === null){
 			$location.path('/'+ 'tologinpage');
 			$route.reload();
 		}
 	}
 	else {
 		alert("Use an updated version of the browser to proceed");
 	}

 	var arr = ["asdasd","bbob","gjdlfsdf","rfspa"];

 	for (var i=0;i<arr.length;i++)
 	{
 		$("#exams").append("<input id='r" + i + "'type='radio' name='exam' value='" + arr[i] +"'><label for='r" + i + "'><i></i>" + arr[i] + "</label>");

 	}

 	var $button = document.querySelector('#taketest');
 	$button.addEventListener('click', function() {

 		if ($('input[name=exam]:checked', '#exams').val() !=null){

 		}
 		else{
 			alert("Select an exam to proceed");
 		}
 		// window.location="http://localhost:8000/#/examdashboard";
 		// $location.path('/'+ 'examdashboard');
 		// $route.reload();
 	});

 	$('#exams input').on('change', function() {
 		//Listen to change in radio buttons
 	});

 });
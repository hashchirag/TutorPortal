'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('PolicyCtrl', function ($scope,$location,$route) {

// See if logged into fb .If not, redirect to FB Login Page


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

var $button = document.querySelector('#taketest');
$button.addEventListener('click', function() {
 		// var duration = 0.3,
 		// delay = 0.08;
 		// TweenMax.to($button, duration, {scaleY: 1.6, ease: Expo.easeOut});
 		// TweenMax.to($button, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
 		// TweenMax.to($button, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });

 		window.location="http://localhost:9000/#/policytest";
 		// $location.path('/'+ 'policytest');
 		// $route.reload();
 	});
});

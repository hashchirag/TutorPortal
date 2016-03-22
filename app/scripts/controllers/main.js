'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('MainCtrl', function ($scope,$location,$route) {

 	$scope.doLogin = function(){
 		FB.login(function(response) {
 			if (response.authResponse) {
 				console.log('Welcome!  Fetching your information.... ');
 				FB.api('/me', function(response) {
 					console.log('Good to see you, ' + response.name + '.');
 					var path = 'http://localhost:9000/#/';
 					$location.path($location.path()+ 'details');
 					$route.reload();
 				});
 			} else {
 				console.log('User cancelled login or did not fully authorize.');
 			}
 		}, {scope: 'public_profile,email'});
 	}

 	window.fbAsyncInit = function() {
 		FB.init({
 			appId      : '1726590084223735',
 			xfbml      : true,
 			version    : 'v2.1'
 		});

 		FB.getLoginStatus(function (response) {
 			if (response.status === 'connected') {
                // the user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token 
                // and signed request each expire
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook, 
                // but has not authenticated your app
            } else {
                // the user isn't logged in to Facebook.
            }
        });
 	};

 	(function(d, s, id){
 		var js, fjs = d.getElementsByTagName(s)[0];
 		if (d.getElementById(id)) {return;}
 		js = d.createElement(s); js.id = id;
 		js.src = "//connect.facebook.net/en_US/sdk.js";
 		fjs.parentNode.insertBefore(js, fjs);
 	}(document, 'script', 'facebook-jssdk'));


//Animation
var image_default = 350;

$(document).ready(function() {
	$('#facebook-button').mouseenter(function(button) {
		$(this).animate({
			width: '+=12px',
			height: '+=12px',
			borderRadius: '+=6px',
			marginLeft: '-=6px',
			marginTop: '-=6px'
		}, 100, 'swing');
	}).mouseleave(function(button) {
		$(this).animate({
			width: image_default,
			height: image_default,
			borderRadius: image_default/2,
			marginLeft: -(image_default/2),
			marginTop: -(image_default/2)
		}, 100, 'swing');
	}).click(function(button) {
		$(this).animate({
			width: '-=24px',
			height: '-=24px',
			borderRadius: '-=12px',
			marginLeft: '+=12px',
			marginTop: '+=12px'
		}, {
			duration: 100,
			complete: function() {
				$(this).animate({
					width: 10000,
					height: 10000,
					borderRadius: 5000,
					marginLeft: -5000,
					marginTop: -5000
				}, {

				});
			}
		});
	});

});
//Animation Ending


});

 angular.module('angularPortalApp')
 .controller('RedirectingCtrl', function ($scope,$location,$route,$http) {
 	window.location="http://localhost:9000/#/communicationtest";
 });
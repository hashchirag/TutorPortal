 angular.module('angularPortalApp')
 .controller('ToexamdashboardCtrl', function ($scope,$location,$route,$http) {
 	// window.location="http://localhost:9000";

 	$location.path('/'+ 'examdashboard');
 	$route.reload();
 });
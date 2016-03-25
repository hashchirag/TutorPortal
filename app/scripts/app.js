'use strict';

/**
 * @ngdoc overview
 * @name angularPortalApp
 * @description
 * # angularPortalApp
 *
 * Main module of the application.
 */
 angular
 .module('angularPortalApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
  ])
 .config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/details', {
    templateUrl: 'views/details.html',
    controller: 'DetailsCtrl'
  })
  .when('/policy', {
    templateUrl: 'views/policyVideo.html',
    controller: 'PolicyCtrl'
  })
  .when('/confirmation', {
    templateUrl: 'views/confirmation.html',
    controller: 'ConfirmationCtrl'
  })
  .when('/lowergradelanding', {
    templateUrl: 'views/lowergradelandingpage.html',
    controller: 'LowergradelandingCtrl'
  })  
  .when('/lowergradetest', {
    templateUrl: 'views/lowergradetest.html',
    controller: 'LowergradetestCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});

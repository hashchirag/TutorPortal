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
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  })
  .when('/details', {
    templateUrl: 'views/detailspage.html',
    controller: 'DetailsCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});

'use strict';

/**
 * @ngdoc overview
 * @name angularAirApp
 * @description
 * # angularAirApp
 *
 * Main module of the application.
 */
angular
  .module('angularAirApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'formly', 
    'formlyBootstrap',
    'lbServices'
  ])

  .config(function(LoopBackResourceProvider) {
 
   LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
  })

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/adminproduct', {
        templateUrl: 'views/adminproduct.html',
        controller: 'AdminproductCtrl',
        controllerAs: 'adminproduct'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  });

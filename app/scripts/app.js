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
    'lbServices',
    'luegg.directives',
    'angularMoment'
  ])

  .config(function(LoopBackResourceProvider,$httpProvider) {
 
   LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');

    // Inside app config block
    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
      return {
        responseError: function(rejection) {
          if (rejection.status === 401) {
            //Now clearing the loopback values from client browser for safe logout...
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            $location.nextAfterLogin = $location.path();
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    });
 
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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
      })
      .when('/chat/:roomid', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl',
        controllerAs: 'chat'
      })
      .when('/room', {
        templateUrl: 'views/room.html',
        controller: 'RoomCtrl',
        controllerAs: 'room'
      })
      .otherwise({
        redirectTo: '/#/'
      });
  });

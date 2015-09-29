'use strict';

/**
 * @ngdoc function
 * @name angularAirApp.controller:AuthcontrollerCtrl
 * @description
 * # AuthcontrollerCtrl
 * Controller of the angularAirApp
 */
angular.module('angularAirApp')
  .controller('AuthCtrl', function ($rootScope,$scope,$location,User,Auth) {

	   $scope.signup = function(newUser){
       Auth.signup(newUser);
     };

  	 $scope.login = function(user){
  	 	Auth.login(user);
  	 };


  	 $scope.loginFields = [{
        key: 'email',
        type: 'input',
        templateOptions: {
          required: true,
          label: 'Email',
        }
      },{
        key: 'password',
        type: 'input',
        templateOptions: {
          type:"password",	
          required: true,
          label: 'Password',
        }
      }];


  	 $scope.RegisterFields = [
      {
        key: 'firstName',
        type: 'input',
        templateOptions: {
          required: true,
          label: 'First Name',
        }
      },{
        key: 'lastName',
        type: 'input',
        templateOptions: {
          required: true,
          label: 'Last Name',
        }
      },{
        key: 'email',
        type: 'input',
        templateOptions: {
          required: true,
          label: 'Email',
        }
      },{
        key: 'password',
        type: 'input',
        templateOptions: {
          type:"password",	
          required: true,
          label: 'Password',
        }
      }];


  });

'use strict';

/**
 * @ngdoc function
 * @name angularAirApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the angularAirApp
 */
angular.module('angularAirApp')
  .controller('NavbarCtrl', function ($rootScope,$scope,User,Auth) {


  		Auth.ensureCurrentUser(function(){
  			$scope.currentUser=Auth.currentUser;
  		});

		$rootScope.$watch('islogged', function(newValue, oldValue) {
 			$scope.isLoggedin=newValue;
 			console.log('islogged changed value : '+newValue);
 			if(newValue){
 				$scope.currentUser=Auth.currentUser;
        $scope.isLoggedin=newValue;
 			}
 		});

  		$scope.isLoggedin=$rootScope.islogged=User.isAuthenticated();

  		$scope.logout = function  () {
  			Auth.logout();  			
  		};

  });

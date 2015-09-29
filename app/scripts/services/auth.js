'use strict';

/**
 * @ngdoc service
 * @name angularAirApp.Auth
 * @description
 * # Auth
 * Service in the angularAirApp.
 */
angular.module('angularAirApp')
  .factory('Auth', function ($rootScope,User,$location) {

  	var self ={
      signup:function(data){
        User.create(data).$promise.then(function () {
          User.login(data).$promise.then(function () {
            $rootScope.islogged=true;
            $location.path('/');
          });
        });
      },
  		login: function(user){
  			User.login(user,function(data){
  				self.currentUser=data.user;
  				console.log(self.currentUser);
  				$rootScope.islogged=true;
          console.log($location.nextAfterLogin);
          if($location.nextAfterLogin === null) {
            $location.path('/');
          }else{
             $location.path($location.nextAfterLogin);
          } 				
  			});
  		},
  		logout: function(){
  			User.logout(function(){
  				$location.path('/');
  				$rootScope.islogged=false;
  				self.currentUser=null;
  			});
  		},
  		ensureCurrentUser: function(cb){
  			if(User.isAuthenticated() && self.currentUser == null){
  				$rootScope.islogged=true;  				
  				User.getCurrent(function(data){
  					self.currentUser = data;
  					cb();
  				});
  			}
  		},
  		currentUser:null

  	};
  		
  	return self;
  
  	});

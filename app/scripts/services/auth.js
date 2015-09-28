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
  		login: function(user){
  			User.login(user,function(data){
  				self.currentUser=data.user;
  				console.log(self.currentUser);
  				$rootScope.islogged=true;
  				$location.path('/');
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

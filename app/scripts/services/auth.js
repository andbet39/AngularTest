'use strict';

/**
 * @ngdoc service
 * @name angularAirApp.Auth
 * @description
 * # Auth
 * Service in the angularAirApp.
 */
angular.module('angularAirApp')
  .factory('Auth', function ($rootScope,ChatUser,$location) {

  	var self ={
      signup:function(data){
        ChatUser.create(data).$promise.then(function () {
          ChatUser.login(data).$promise.then(function (data) {
            self.currentUser=data.user;

            $rootScope.islogged=true;
            $location.path('/');
          });
        });
      },
  		login: function(user){
  			ChatUser.login(user,function(data){
  				self.currentUser=data.user;
  				console.log(self.currentUser);
  				$rootScope.islogged=true;
          
          if($location.nextAfterLogin === null) {
            $location.path('/');
          }else{
             $location.path($location.nextAfterLogin);
          } 				
  			});
  		},
  		logout: function(){
  			ChatUser.logout(function(){
  				$location.path('/');
  				$rootScope.islogged=false;
  				self.currentUser=null;
  			});
  		},
  		ensureCurrentUser: function(cb){
  			if(ChatUser.isAuthenticated() && self.currentUser == null){
  				$rootScope.islogged=true;  				
  				ChatUser.getCurrent(function(data){
  					self.currentUser = data;
  					cb();
  				});
  			}
  		},
  		currentUser:null

  	};
  		
  	return self;
  
  	});

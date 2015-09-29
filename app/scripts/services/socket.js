'use strict';


/**
 * @ngdoc service
 * @name angularAirApp.Socket
 * @description
 * # Socket
 * Service in the angularAirApp.
 */
angular.module('angularAirApp')
  .service('Socket', function ($timeout) {
		
		this.socket = io('http://localhost:3000/');

		this.on = function(eventName, callback) {
		      if (this.socket) {
		        this.socket.on(eventName, function(data) {
		          $timeout(function() {
		            callback(data);
		          });
		        });
  	    	}
		};

  	    this.emit = function(eventName, data) {
      		if (this.socket) {
        		this.socket.emit(eventName, data);
      		}
    	};
  	 
  });

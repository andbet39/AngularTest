'use strict';

/**
 * @ngdoc function
 * @name angularAirApp.controller:RoomCtrl
 * @description
 * # RoomCtrl
 * Controller of the angularAirApp
 */
angular.module('angularAirApp')
  .controller('RoomCtrl', function ($scope,$location,Room,ChatUser,Auth) {
    	
    	$scope.rooms = Room.find();

    	$scope.join= function (roomid){

    			ChatUser.joinroom({'room_id':roomid,'user_id':Auth.currentUser.id},function(){

    				$location.path('/chat/'+roomid);
    			});
    	};

    	$scope.createRoom = function(newRoom){
    		Room.create(newRoom,function(room){

    			$scope.rooms.push(room);
    			$scope.join(room.id);
    		});
    	}



  });

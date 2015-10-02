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
                if(Auth.currentUser){
    			ChatUser.joinroom({'room_id':roomid,'user_id':Auth.currentUser.id},function(){

    				$location.path('/chat/'+roomid);
    			});
            }else{
                $location.path("/login");
            }
    	};

    	$scope.createRoom = function(newRoom){
             if(Auth.currentUser){
    		Room.create(newRoom,function(room){

    			$scope.rooms.push(room);
    			$scope.join(room.id);
    		}); 
        }else{
                $location.path("/login");
            }
    	}



  });

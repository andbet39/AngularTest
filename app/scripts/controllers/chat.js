'use strict';

/**
 * @ngdoc function
 * @name angularAirApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the angularAirApp
 */
angular.module('angularAirApp')
    .controller('ChatCtrl', function(Socket, $scope, Message, ChatUser, Auth, Room, $routeParams) {

        $scope.messages = [];
        $scope.selectedRoom = null;
        $scope.joinedrooms = ChatUser.joinedrooms({
            'id': Auth.currentUser.id
        });

        Room.findById({'id': $routeParams.roomid}, 
          function(room) {
            $scope.selectedRoom = room;

            Message.find({
                filter: {where:{roomId: room.id},include:['user']}
              },function(data) {
                $scope.messages[room.id] = data;
                Socket.emit('subscribe', room.id);
            });
            
            /*Message.getmessages({
                'room_id': room.id
            }, function(data) {
                $scope.messages[room.id] = data.messages;
                Socket.emit('subscribe', room.id);
            });*/
        });

        
        $scope.selectRoom = function(room_id) {

            $scope.selectedRoom = Room.findById({
                'id': room_id
            }, function(room) {
                if (!$scope.messages[room.id]) {
                    console.log(room.name + "first join");

                        Message.find({
                filter: {where:{roomId: room.id},include:['user']}
                        },function(data){  
                            $scope.messages[room.id] = data;
                            Socket.emit('subscribe', room.id);
                      });
            

                    /*Message.getmessages({
                            'room_id': room.id
                        },
                        function(data) {
                            Socket.emit('subscribe', room_id);
                            $scope.messages[room_id] = data.messages;
                            console.log($scope.messages);
                        });*/
                } else {
                    console.log(room.name + "already joined");
                }
            });
        }


        $scope.send = function(mess) {
           
            Message.sendmessagenew({
                'content': mess,
                'user_id': Auth.currentUser.id,
                'room_id': $scope.selectedRoom.id
            }).$promise.then(function() {
                $scope.newMessage = '';
            });
        };

        Socket.on('message', function(message) {

            $scope.messages[message.roomId].push(message);
            console.log('message received : ' + message.content);

        });
    });

angular.module('angularAirApp').directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
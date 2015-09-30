'use strict';

/**
 * @ngdoc function
 * @name angularAirApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the angularAirApp
 */
angular.module('angularAirApp')
  .controller('ChatCtrl', function (Socket,$scope,Message,User) {
  		
  		$scope.messages = Message.getmessages().$promise.then(
  				function(data){
            console.log(data.messages);  
  				$scope.messages=data.messages;
  			console.log('loaded old message');
  		});

  		$scope.send = function(mess){
  			console.log(mess);
  			Message.sendmessagenew({'content':mess,'user_id':User.getCurrentId() ,'room_id':1}).$promise.then(function(){
  				console.log("message sent");
  				$scope.newMessage='';
  			});	
  		};

  		Socket.on('message',function(message){
  			$scope.messages.push(message);
  			console.log('message received : ' + message.content);
  		});
  });

angular.module('angularAirApp').directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});


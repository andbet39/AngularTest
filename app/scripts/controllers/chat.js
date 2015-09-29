'use strict';

/**
 * @ngdoc function
 * @name angularAirApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the angularAirApp
 */
angular.module('angularAirApp')
  .controller('ChatCtrl', function (Socket,$scope,Message) {
  		
  		$scope.messages = Message.find().$promise.then(
  				function(data){
  				$scope.messages=data;
  			console.log('loaded old message');
  		});

  		$scope.send = function(mess){
  			console.log(mess);
  			Message.sendmessage({'content':mess}).$promise.then(function(){
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

angular.module('angularAirApp').directive('heightBind', function() {
  return {
    scope: {
      heightValue: '='
    },
    link: function($scope, $element) {
      $scope.$watch(function() {
        $scope.heightValue = $element.height();
      });
    }
  }
})
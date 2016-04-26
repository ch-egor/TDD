var app = angular.module('VirtualFriend', []);

app.factory('friendFactory', function () {
  function Friend() {
    // TODO write Friend constructor
  }
  
  Friend.prototype = {
    // TODO write Friend methods
  };
  
  return Friend;
});

app.controller('chatCtrl', [
  '$scope', 'friendFactory',
  function($scope, Friend) {
    $scope.friend = new Friend();
    
    $scope.messageText = '';
    $scope.messages = [];
    
    $scope.sendMessage = function () {
      if (!$scope.messageText)
        return;
      
      var message = {
        from: 'Me',
        timestamp: Date.now(),
        text: $scope.messageText
      };
      $scope.messages.unshift(message);
      
      $scope.messageText = '';
    };
  }
]);

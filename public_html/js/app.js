var app = angular.module('VirtualFriend', []);

app.factory('friendFactory', function () {
  function Friend() {
    this._userSaid = null;
    this._currentBranch = this._askName;
  }
  
  Friend.prototype = {
    say: function () {
      return this._currentBranch();
    },
    listen: function (userSaid) {
      this._userSaid = userSaid;
    },
    _askName: function () {
      if (this._userSaid === null)
        return "Hi! My name's VF. And what's yours?";
      
      var nameRegexp = /^\s*(?:I'm |My name is )?([\w\s]+)\s*\.?$/.exec(this._userSaid);
      if (!nameRegexp)
        return "Sorry, didn't catch it. :( Say again, please.";
      
      this._userName = nameRegexp[1].trim();
      return "Nice to meet you, " + this._userName + '!';
    }
  };
  
  return Friend;
});

app.controller('chatCtrl', [
  '$scope', '$timeout', 'friendFactory',
  function($scope, $timeout, Friend) {
    var friend = new Friend();
    
    $scope.messageText = '';
    $scope.messages = [];
    
    replyToUser();
    
    $scope.sendMessage = function () {
      if (!$scope.messageText)
        return; 
      
      var message = {
        from: 'Me',
        timestamp: Date.now(),
        text: $scope.messageText
      };
      $scope.messages.unshift(message);
      friend.listen($scope.messageText);
      $scope.messageText = '';
      
      var delay = 1000 + Math.floor(Math.random() * 2000);
      $timeout(replyToUser, delay);
    };
    
    function replyToUser() {
      var message = {
        from: 'VF',
        timestamp: Date.now(),
        text: friend.say()
      };
      $scope.messages.unshift(message);
    }
  }
]);

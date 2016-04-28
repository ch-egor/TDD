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
      this._userSaid = null;
      this._currentBranch = this._askTopic;
      return "Nice to meet you, " + this._userName + '! ' + this.say();
    },
    _askTopic: function () {
      if (this._userSaid === null)
        return "So, what would you like to talk about?";
      
      var topicRegexp = /^\s*(?:Let's talk about )?([\w\s]+)\s*\.?$/.exec(this._userSaid);
      if (!topicRegexp)
        return "By which you mean what exactly?";
      
      this._topic = topicRegexp[1].trim();
      if (this._topic === "Don't know")
        return "We can talk about weather. Or me, for example. We can also talk about sports, you know.";
      return "Sorry, don't know anything about " + this._topic + ".";
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

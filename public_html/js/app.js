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
    // TODO write code for controller
  }
]);

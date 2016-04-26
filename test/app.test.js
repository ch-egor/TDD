describe('VirtualFriend', function () {
  beforeEach(module('VirtualFriend'));

  var $controller, $timeout;

  beforeEach(inject(function (_$controller_, _$timeout_) {
    $controller = _$controller_;
    $timeout = _$timeout_;
  }));

  var $scope, controller;

  beforeEach(function () {
    $scope = {};
    controller = $controller('chatCtrl', {$scope: $scope});
  });

  it('ensures that the message has been sent', function () {
    $scope.messageText = 'test message';
    $scope.sendMessage();
    expect($scope.messages[0].from).toEqual('Me');
    expect($scope.messages[0].text).toEqual('test message');
  });

  it('makes sure the bot gets the username right', function () {
    $scope.messageText = 'test name';
    $scope.sendMessage();
    $timeout.flush();
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('test name');
  });
});

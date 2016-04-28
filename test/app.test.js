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

  it('ensures the message has been sent', function () {
    $scope.messageText = 'test message';
    $scope.sendMessage();
    expect($scope.messages[0].from).toEqual('Me');
    expect($scope.messages[0].text).toEqual('test message');
  });

  it('makes sure the bot gets the username right 1', function () {
    $scope.messageText = 'test name';
    $scope.sendMessage();
    $timeout.flush();
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('test name');
  });
  
  it('makes sure the bot gets the username right 2', function () {
    $scope.messageText = "Hey, I'm Bob ";
    $scope.sendMessage();
    $timeout.flush();
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('Say again');
    $scope.messageText = "  I'm Bob   ";
    $scope.sendMessage();
    $timeout.flush();
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('Nice to meet you, Bob!');
  });
  
  it('makes sure the bot gets the username right 3', function () {
    $scope.messageText = 'My name is Hanna.';
    $scope.sendMessage();
    $timeout.flush();
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('Nice to meet you, Hanna!');
  });
  
  it('asks for a list of topics 1', function () {
    $scope.messageText = 'Username';
    $scope.sendMessage();
    $timeout.flush();
    $scope.messageText = "Don't know";
    $scope.sendMessage();
    $timeout.flush();
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('me');
    expect($scope.messages[0].text).toMatch('weather');
    expect($scope.messages[0].text).toMatch('sports');
  });
  
  it('asks for a list of topics 2', function () {
    $scope.messageText = 'Username';
    $scope.sendMessage();
    $timeout.flush();
    $scope.messageText = 'We can talk about "War and peace", maybe.';
    $scope.sendMessage();
    $timeout.flush();
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('By which you mean');
    $scope.messageText = "Let's talk about toads";
    $scope.sendMessage();
    $timeout.flush();
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch("don't know");
    expect($scope.messages[0].text).toMatch("toads");
  });
});

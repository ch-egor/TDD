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
    sendMessage('test message', true);
    expect($scope.messages[0].from).toEqual('Me');
    expect($scope.messages[0].text).toEqual('test message');
  });

  it('makes sure the bot gets the username right 1', function () {
    sendMessage('test name');
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('test name');
  });
  
  it('makes sure the bot gets the username right 2', function () {
    sendMessage("Hey, I'm Bob ");
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('Say again');
    sendMessage("  I'm Bob   ");
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('Nice to meet you, Bob!');
  });
  
  it('makes sure the bot gets the username right 3', function () {
    sendMessage('My name is Hanna.');
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('Nice to meet you, Hanna!');
  });
  
  it('asks for a list of topics 1', function () {
    sendMessage('Username');
    sendMessage("Don't know");
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('me');
    expect($scope.messages[0].text).toMatch('weather');
    expect($scope.messages[0].text).toMatch('sports');
  });
  
  it('asks for a list of topics 2', function () {
    sendMessage('Username');
    sendMessage('We can talk about "War and peace", maybe.');
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('By which you mean');
    sendMessage("Let's talk about toads");
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch("don't know");
    expect($scope.messages[0].text).toMatch("toads");
  });
  
  it('talks about weather 1', function () {
    sendMessage('Username');
    sendMessage('weather');
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('like it');
    expect($scope.messages[0].text).toMatch('sunny');
    sendMessage('Yes');
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('excellent');
  });
  
  it('talks about weather 2', function () {
    sendMessage('Username');
    sendMessage('weather');
    sendMessage("I don't");
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('shame');
  });
  
  it('talks about me 1', function () {
    sendMessage('Username');
    sendMessage('you');
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('innovative bot');
    sendMessage('yes');
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('flattering');
  });
  
  it('talks about me 2', function () {
    sendMessage('Username');
    sendMessage('you');
    sendMessage('No');
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch('I thought we were friends');
  });
  
  it('talks about me 3', function () {
    sendMessage('Username');
    sendMessage('you');
    sendMessage('maybe a little bit');
    expect($scope.messages[0].from).toEqual('VF');
    expect($scope.messages[0].text).toMatch("don't understand");
  });
  
  function sendMessage(text, skipFlush) {
    $scope.messageText = text;
    $scope.sendMessage();
    if (!skipFlush) {
      $timeout.flush();
    }
  }
});

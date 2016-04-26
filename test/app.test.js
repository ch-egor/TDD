describe('VirtualFriend', function() {
  beforeEach(module('VirtualFriend'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));
  
  var $scope, controller;
  
  beforeEach(function() {
    $scope = {};
    controller = $controller('chatCtrl', { $scope: $scope });
  });
  
  it('ensures that the message has been sent', function() {
    $scope.messageText = 'test message';
    $scope.sendMessage();
    expect($scope.messages[0].from).toEqual('Me');
    expect($scope.messages[0].text).toEqual('test message');
  });
});

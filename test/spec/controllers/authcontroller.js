'use strict';

describe('Controller: AuthcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('angularAirApp'));

  var AuthcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthcontrollerCtrl = $controller('AuthcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AuthcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});

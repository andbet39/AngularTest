'use strict';

describe('Controller: AdminproductCtrl', function () {

  // load the controller's module
  beforeEach(module('angularAirApp'));

  var AdminproductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminproductCtrl = $controller('AdminproductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminproductCtrl.awesomeThings.length).toBe(3);
  });
});

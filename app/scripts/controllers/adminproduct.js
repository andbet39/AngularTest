'use strict';

/**
 * @ngdoc function
 * @name angularAirApp.controller:AdminproductCtrl
 * @description
 * # AdminproductCtrl
 * Controller of the angularAirApp
 */
angular.module('angularAirApp')
  .controller('AdminproductCtrl', function ($scope,Product) {
    	
    	$scope.products = Product.find();
  });

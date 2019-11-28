maxisApp.controller('productController',function($scope, $window, $http, $timeout, $location){
	
	$scope.hasError = false;
	$scope.errors = [];
	$scope.product = {};
	$scope.products = [];
	
	var BASE_URL = 'http://127.0.0.1:9101/gateway/inventory/';
	
	$scope.createProduct = function(){
		$scope.loader = true;
		var data = $scope.product;
		$http({
			'url': BASE_URL + 'product',
			'method': 'POST',
			'data': data
		})
		.then(function(response) {
			if( response && response.data ){
				var result = response.data;
				if( result.isSuccess ){
					$scope.loader = false;
					$scope.isSuccess = true;
					$scope.successMessage = result.data;
					$scope.hideErrorMessage();
				}else{
					$scope.loader = false;
					if( result.data ){
						$scope.hasListError = true;
						$scope.errors = result.data;
						$scope.hideErrorMessage();
						$scope.getProducts();
					}else{
						$scope.hasError = true;
						$scope.errorMessage = result.errorMessage;
						$scope.hideErrorMessage();
					}
				}
			}
		});
	}
	
	$scope.deleteProduct = function(productId){
		$scope.loader = true;
		var data = $scope.product;
		$http({
			'url': BASE_URL + 'product/'+productId,
			'method': 'DELETE',
		})
		.then(function(response) {
			if( response && response.data ){
				var result = response.data;
				if( result.isSuccess ){
					$scope.loader = false;
				}else{
					$scope.loader = false;
				}
			}
		});
	}
	
	$scope.getProducts = function(){
		$scope.loader = true;
		$http.get(BASE_URL+'products').then(function(response) {
		    if( response && response.data && response.data.isSuccess){
				$scope.products = response.data.data;
				$scope.loader = false;
		    }
			else{
				$scope.loader = false;
			}
		});
	}
	
	
	
	$scope.getProducts();
	
	$scope.hideErrorMessage = function(){
		$timeout(function(){
			$scope.hasListError = false;
		    $scope.hasError = false;
			$scope.isSuccess = false;
		}, 5000);
	}
	
	$scope.addToCart = function(productId){
		$scope.loader = true;
		$http({
			'url': 'http://127.0.0.1:9101/gateway/cart/add?productId='+productId,
			'method': 'POST',
		})
		.then(function(response) {
			if( response && response.data ){
				var result = response.data.data;
				if( result.isSuccess ){
					$scope.loader = false;
				}else{
					$scope.loader = false;
				}
			}
		});
	}
	
});

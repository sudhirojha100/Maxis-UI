maxisApp.controller('cartController',function($scope, $http, $window, $location){
	
	var userId = $window.localStorage.getItem("USER_ID");
		
	$scope.cartSummary = {};
		
	$scope.checkLogout = function(){
		if( userId.length == 0 ){
			$window.location.href = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + "/login";
		}
	}
	
	$scope.getCartSummary = function(){
		$scope.loader = true;
		$http.get('http://127.0.0.1:9101/gateway/cart/cartSummary').then(function(response) {
		    if( response && response.data && response.data.isSuccess){
				$scope.cartSummary = response.data.data;
				$scope.loader = false;
		    }
			else{
				$scope.loader = false;
			}
		});
	}
	
	$scope.checkLogout();
	$scope.getCartSummary();
	
	$scope.continueShopping = function(){
		$window.location.href = $location.protocol() + '://'+ $location.host() +':'+  $location.port() +'/app/views/userDashboard.html#/products';
	}
	
	$scope.remove = function(productId){
		$scope.loader = true;
		$http.get('http://127.0.0.1:9101/gateway/cart/remove/'+productId).then(function(response) {
		    if( response && response.data && response.data.isSuccess){
				$scope.loader = false;
				$scope.getCartSummary();
		    }
			else{
				$scope.loader = false;
			}
		});
	}
	
	$scope.clearCart = function(){
		$scope.loader = true;
		$http.get('http://127.0.0.1:9101/gateway/cart/clearCart').then(function(response) {
		    if( response && response.data && response.data.isSuccess){
				$scope.loader = false;
				$scope.getCartSummary();
		    }
			else{
				$scope.loader = false;
			}
		});
	}
	
	$scope.createOrder = function(cartSummary){
		$scope.loader = true;
		cartSummary.userId = parseInt(userId);
		$http({
			'url': 'http://127.0.0.1:9101/gateway/crm/createOrder',
			'method': 'POST',
			'data': cartSummary
		})
		.then(function(response) {
			if( response && response.data ){
				var result = response.data;
				if( result.isSuccess ){
					$scope.loader = false;
					alert("Order is created and order id is : "+ result.data);
					$scope.clearCart();
				}else{
					alert(result.data);
				}
			}
		});
	}
	
});
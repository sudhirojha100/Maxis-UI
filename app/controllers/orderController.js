maxisApp.controller('orderController',function($scope, $http, $window, $location){
	
	var userId = $window.localStorage.getItem("USER_ID");
		
	$scope.orders = [];
		
	$scope.checkLogout = function(){
		if( userId.length == 0 ){
			$window.location.href = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + "/login";
		}
	}
	
	$scope.getAllOrders = function(){
		$scope.loader = true;
		$http.get('http://127.0.0.1:9101/gateway/crm/orders').then(function(response) {
		    if( response && response.data && response.data.isSuccess){
				$scope.orders = response.data.data;
				$scope.loader = false;
		    }
			else{
				$scope.loader = false;
			}
		});
	}
	
	$scope.checkLogout();
	$scope.getAllOrders();
	
	$scope.rejectOrder = function( orderId ){
		$scope.loader = true;
		$http.get('http://127.0.0.1:9101/gateway/crm/order/rejectOrder?orderId='+orderId).then(function(response) {
		    if( response && response.data && response.data.isSuccess){
				$scope.orders = response.data.data;
				$scope.loader = false;
				$scope.getAllOrders();
		    }
			else{
				$scope.loader = false;
			}
		});
	}
	
	$scope.viewOrder = function(orderId){
		$window.localStorage.setItem("ORDER_ID", orderId);
		$window.location.href = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + "/app/views/orderDetails.html";
	}
	
});
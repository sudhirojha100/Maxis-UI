maxisApp.controller('orderDetailController',function($scope, $http, $window, $location){
	
	$scope.userId = $window.localStorage.getItem("USER_ID");
	$scope.orderId = $window.localStorage.getItem("ORDER_ID");

	$scope.orderDetails = {};
	
	$scope.checkLogout = function(){
		if( $scope.userId.length == 0 ){
			$window.location.href = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + "/login";
		}
		
	}
	
	$scope.getOrderDetails = function(){
		$scope.loader = true;
		$http.get('http://127.0.0.1:9101/gateway/crm/order/orderDetails?orderId='+$scope.orderId).then(function(response) {
		    if( response && response.data && response.data.isSuccess){
				$scope.orderDetails = response.data.data;
				$scope.loader = false;
		    }
			else{
				$scope.loader = false;
			}
		});
	}
	
	$scope.cancelOrder = function(orderId){
		$scope.loader = true;
		$http.get('http://127.0.0.1:9101/gateway/crm/cancelOrder?userId='+$scope.userId+"&orderId="+orderId).then(function(response) {
		    if( response && response.data && response.data.isSuccess){
				$scope.orders = response.data.data;
				$scope.loader = false;
				$scope.getOrderDetails();
		    }
			else{
				$scope.loader = false;
			}
		});
	}
	
	$scope.continueShopping = function(){
		$window.location.href = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + "/app/views/userDashboard.html#/products";
	}
	
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
	
	$scope.back = function( ){
		$window.history.back();
	}
		
	$scope.checkLogout();
	$scope.getOrderDetails();
	
});
maxisApp.controller('myOrderController',function($scope, $http, $window, $location){
	
	var userId = $window.localStorage.getItem("USER_ID");
		
	$scope.orders = [];
		
	$scope.checkLogout = function(){
		if( userId.length == 0 ){
			$window.location.href = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + "/login";
		}
	}
	
	$scope.getMyOrders = function(){
		$scope.loader = true;
		$http.get('http://127.0.0.1:9101/gateway/crm/myOrders?userId='+userId).then(function(response) {
		    if( response && response.data && response.data.isSuccess){
				$scope.orders = response.data.data;
				$scope.loader = false;
		    }
			else{
				$scope.loader = false;
			}
		});
	}
	
	$scope.cancelOrder = function(orderId){
		$scope.loader = true;
		$http.get('http://127.0.0.1:9101/gateway/crm/cancelOrder?userId='+userId+"&orderId="+orderId).then(function(response) {
		    if( response && response.data && response.data.isSuccess){
				$scope.orders = response.data.data;
				$scope.loader = false;
				$scope.getMyOrders();
		    }
			else{
				$scope.loader = false;
			}
		});
	}
	
	$scope.checkLogout();
	$scope.getMyOrders();
	
});
maxisApp.controller('orderController',function($scope, $http, $window, $location){
	
	var userId = $window.localStorage.getItem("ADMIN_USER_ID");
		
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
	
});
maxisApp.controller('adminController',function($scope, $http, $window, $location){
	
	var userId = $window.localStorage.getItem("USER_ID");
		
	$scope.users = [];
		
	$scope.checkLogout = function(){
		if( userId.length == 0 ){
			$window.location.href = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + "/login";
		}
	}
	
	$scope.getUsers = function(){
		$scope.loader = true;
		$http.get('http://127.0.0.1:9101/gateway/crm/users').then(function(response) {
		    if( response && response.data && response.data.isSuccess){
				$scope.users = response.data.data;
				$scope.loader = false;
		    }
			else{
				$scope.loader = false;
			}
		});
	}
	$scope.checkLogout();
	$scope.getUsers();
	
	$scope.deleteUser = function(userId){
		$scope.loader = true;
		$http.get('http://127.0.0.1:9101/gateway/crm/user/'+userId).then(function(response) {
		     if( response && response.data ){
		    	$scope.users = response.data;
				$scope.loader = false;
		     }
		});
	}
});
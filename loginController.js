maxisApp.controller('loginController',function($scope, $window, $http, $timeout){
	
	$scope.hasError = false;
	$scope.loader = true;
	var BASE_URL = 'http://127.0.0.1:9101/gateway/crm/login.do';
	$scope.login = function(isFormValid){
		if( !isFormValid )
			return;
		var data = $scope.loginForm;
		$http({
			'url': BASE_URL,
			'method': 'POST',
			'data': data
		})
		.then(function(response) {
			if( response && response.data && response.data.isSuccess){
				var result = response.data.data;
				if( result.isSuccess ){
					$window.localStorage.setItem("USER_ID", result.userId);
					if( result.role === 'ROLE_ADMIN' || result.role === 'ROLE_SUPER_ADMIN' ){
						$window.location.href = 'app/views/dashboard.html';
					}else{
						$window.location.href = 'app/views/userDashboard.html';
					}
				}else{
					$scope.hasError = true;
					$scope.errorMessage = result.errorMessage;
					$scope.hideErrorMessage();
				}
			}else{
				console.log(response.data.data);
			}
		});
	}
	
	$scope.hideErrorMessage = function(){
		$timeout(function(){
		  $scope.hasError = false;
		}, 3000);
	}
	
	$scope.register = function(){
		$window.location.href = 'register.html';
	}
});

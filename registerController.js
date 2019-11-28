maxisApp.controller('registerController',function($scope, $window, $http, $timeout, $location){
	
	$scope.hasError = false;
	$scope.errors = [];
	$scope.loader = true;
	var BASE_URL = 'http://127.0.0.1:9101/gateway/crm/register';
	$scope.registration = function(isFormValid){
		if( !isFormValid )
			return;
		var data = $scope.register;
		$http({
			'url': BASE_URL,
			'method': 'POST',
			'data': data
		})
		.then(function(response) {
			if( response && response.data ){
				var result = response.data;
				if( result.isSuccess ){
					$scope.isSuccess = true;
					$scope.successMessage = result.data;
					$scope.hideErrorMessage();
				}else{
					if( result.data ){
						$scope.hasListError = true;
						$scope.errors = result.data;
						$scope.hideErrorMessage();
					}else{
						$scope.hasError = true;
						$scope.errorMessage = result.errorMessage;
						$scope.hideErrorMessage();
					}
				}
			}
		});
	}
	
	$scope.hideErrorMessage = function(){
		$timeout(function(){
			$scope.hasListError = false;
		    $scope.hasError = false;
			$scope.isSuccess = false;
		}, 3000);
	}
});

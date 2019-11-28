var maxisApp = angular.module('maxisApp',['ngRoute']);
maxisApp.config(function($routeProvider){
    $routeProvider
    .when('/users',{
        templateUrl: 'users.html'
    })
	.when('/',{
        templateUrl: 'users.html'
    })
    .when('/orders',{
		templateUrl: 'orders.html'
    })
	.when('/products',{
		templateUrl: 'configureProduct.html'
    });
});
maxisApp.controller('adminScriptController',function($scope, $window, $location){
	
	$scope.logout = function(){
		$window.localStorage.setItem("ADMIN_USER_ID", '');
		$window.location.href = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + "/login";
	}
});

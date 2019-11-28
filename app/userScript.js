var maxisApp = angular.module('maxisApp',['ngRoute']);
maxisApp.config(function($routeProvider){
    $routeProvider
    .when('/products',{
        templateUrl: 'products.html'
    })
	.when('/',{
        templateUrl: 'products.html'
    })
    .when('/myOrder',{
		templateUrl: 'myOrder.html'
    })
	.when('/myCart',{
		templateUrl: 'shoppingCart.html'
    });
});
maxisApp.controller('userScriptController',function($scope, $window, $http, $location){
	
	$scope.logout = function(){
		$http.post('http://127.0.0.1:9101/gateway/cart/logout.do').then(function(response) {
		    if( response && response.data ){
		    	$window.localStorage.setItem("USER_ID", '');
				$window.location.href = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + "/login";
		    }
		});
	}
	
	$scope.checkCart = function(userId){
		$http.get('http://127.0.0.1:9101/gateway/cart/checkCart').then(function(response) {
		    if( response && response.data ){
		    	$scope.counter = response.data.data;
		    }
		});
	}
	
	$scope.checkCart();
	
});

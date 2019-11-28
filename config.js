maxisApp.config(function($stateProvider, $locationProvider, $urlRouterProvider){
	$stateProvider
	.state('login', { 
        url : '/login', 
        templateUrl : "login.html", 
    });
	$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
	$urlRouterProvider.otherwise("login");
});
var app = angular.module('App', ['ui.router', 'AuthCtrls']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/404');
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/home.html',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.html',
      controller: 'LoginCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/views/signup.html',
      controller: 'SignupCtrl'
    })

    $locationProvider.html5Mode(true);
  }])
  .config(["$httpProvider", function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
  }]);
angular.module('AuthCtrls', ['Services'])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth){
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.userLogin = function(){
    $http.post('/api/auth', $scope.user).then(function success(res){
      Auth.saveToken(res.data.token);
      console.log("you logged in");
      $location.path("/");
    }, function error(res){
      console.log("error", res);
    });
  };
}])

.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.userSignup = function() {
    $http.post("/api/users", $scope.user).then(function success(res){
      $location.path("/");
    }, function error(res){
      console.log("error", res);
    });
  };
}])
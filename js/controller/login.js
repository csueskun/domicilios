app.controller('loginController', function($scope, apiInterface, snackbar, userInterface, $timeout) {
  // $('#main-nav').remove();
  // $('footer').remove();
  $scope.loginData = {};
  $scope.errorData = {};
  $scope.user = {};
  

  $scope.login = ()=>{
    $scope.errorData = {};
    $scope.loggingIn = true;
    let successCallback = data=>{
      if(data.status == 200){
        userInterface.login(data.data.user);
        $scope.errorData.success = true;
        $scope.loggingIn = false;
        $timeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    }
    let errorCallback = error => {
      console.error(error);
      if(error.status == 401){
        $scope.errorData.error = error.data.msg;
      }
      $scope.loggingIn = false;
    }
    apiInterface.post('login', $scope.loginData, {}, successCallback, errorCallback);
  }
});
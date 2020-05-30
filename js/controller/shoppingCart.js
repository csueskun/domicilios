app.controller('shoppingCartController', function($scope, apiInterface, snackbar, shoppingCart) {
  $scope.productoList = [];

  loadCartItems();
  shoppingCart.updateView();

  function loadCartItems(){
    $scope.shoppingCartItems = shoppingCart.getAll();
  }
  $scope.removeitem = function(id){
    shoppingCart.removeItem(id);
    loadCartItems();
    shoppingCart.updateView();
  }
});
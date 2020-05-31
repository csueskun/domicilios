app.controller('shoppingCartController', function($scope, apiInterface, snackbar, shoppingCart, userInterface) {
  $scope.productoList = [];
  $scope.total = {};

  loadCartItems();
  calculateTotal();
  $scope.auth = userInterface.auth();
  shoppingCart.updateView();

  function loadCartItems(){
    $scope.shoppingCartItems = shoppingCart.getAll();
  }
  function calculateTotal(){
    $scope.total = {
      cantidad: 0,
      total: 0
    };
    try {
      $scope.shoppingCartItems.forEach(item=>{
        $scope.total.cantidad += item.cantidad;
        $scope.total.total += item.precio1 * item.cantidad;
      });
    } catch (error) {
      
    }
  }
  $scope.removeitem = function(id){
    shoppingCart.removeItem(id);
    loadCartItems();
    shoppingCart.updateView();
  }
});
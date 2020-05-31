function routes($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "/view/home.html",
    controller: 'homeController'
  })
  .when("/shopping_cart", {
    templateUrl : "/view/shopping_cart.html",
    controller: 'shoppingCartController'
  })
  .when("/new_usuario", {
    templateUrl : "/view/new_usuario.html",
    controller: 'loginController'
  })
  .when("/login", {
    templateUrl : "/view/login.html",
    controller: 'loginController'
  });
}
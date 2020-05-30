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
  .when("/empresa", {
    templateUrl : "/view/empresa/index.html",
    controller: 'empresaController'
  })
  .when("/clase", {
    templateUrl : "/view/clase/index.html",
    controller: 'claseController'
  })
  .when("/tipocategoria", {
    templateUrl : "/view/tipocategoria/index.html",
    controller: 'tipocategoriaController'
  })
  .when("/tipoproducto", {
    templateUrl : "/view/tipoproducto/index.html",
    controller: 'tipoproductoController'
  })
  .when("/grupo", {
    templateUrl : "/view/grupo/index.html",
    controller: 'grupoController'
  });
}
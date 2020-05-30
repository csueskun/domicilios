var app = angular.module("myApp", ["ngRoute", "ngAnimate"]);

app.config(routes);
app.factory('apiInterface', ApiInterface);
app.factory('snackbar', SnackBar);
app.factory('shoppingCart', ShoppingCart);

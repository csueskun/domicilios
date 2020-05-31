const apiUrl = 'http://sgv.h-software.co/';
const imgUrl = 'http://sgv.h-software.co/img/';

class ApiInterface {
  constructor($http) {
    this.$http = $http;
    this.api_token = sessionStorage.getItem('api_token', '');
  }
  get(url, config={}, successCallback=()=>{}, errorCallback=()=>{}) {
    if(config.hasOwnProperty('params')){
      config.params.api_token = this.api_token;
    }
    else{
      config.params = { api_token: this.api_token };
    }
    this.$http.get(apiUrl+url, config).then(successCallback, errorCallback);
  }
  post(url, data={}, config={}, successCallback=()=>{}, errorCallback=()=>{}) {
    config.params = { api_token: this.api_token };
    url = apiUrl+url+paramObjectToString(config.params);
    this.$http.post(url, data, config).then(successCallback, errorCallback);
  }
  put(url, data={}, config={}, successCallback=()=>{}, errorCallback=()=>{}) {
    config.params = { api_token: this.api_token };
    url = apiUrl+url+paramObjectToString(config.params);
    this.$http.put(url, data, config).then(successCallback, errorCallback);
  }
  delete(url, config={}, successCallback=()=>{}, errorCallback=()=>{}) {
    config.params = { api_token: this.api_token };
    url = apiUrl+url+paramObjectToString(config.params);
    this.$http.delete(url, config).then(successCallback, errorCallback);
  }
  getImgUrl(imagen, carpeta){
    return imgUrl+carpeta+'/'+imagen;
  }

}
let defaultSnackBar = {
  text: '',
  backgroundColor: '#d4edda',
  textColor: '#155724',
  showAction: false,
  pos: 'bottom-center',
  customClass: 'mi-snackbar',
  duration: 5000
}
class SnackBar {
  constructor() {
  }
  green(text) {
    defaultSnackBar.text = text;
    Snackbar.show(defaultSnackBar);
  }
  yellow(text){
    defaultSnackBar.text = text;
    defaultSnackBar.backgroundColor = '#fff3cd';
    defaultSnackBar.textColor = '#856404';
    Snackbar.show(defaultSnackBar);
  }
  red(text){
    defaultSnackBar.text = text;
    defaultSnackBar.backgroundColor = '#f8d7da';
    defaultSnackBar.textColor = '#721c24';
    Snackbar.show(defaultSnackBar);
  }
}
class ShoppingCart {
  constructor($rootScope) {
    this.$rootScope = $rootScope;
  }
  addItem(item) {
    let shoppingCart = this.getAll();
    item.cartItemId = new Date().getTime();
    shoppingCart.push(item);
    updateShoppingCart(shoppingCart);
    sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }
  removeItem(id){
    let shoppingCart = this.getAll();
    let index = -1;
    let i = 0;
    shoppingCart.forEach(item=>{
      if(item.cartItemId==id){
        index = i;
        return false;
      }
      i++;
    });
    shoppingCart.splice(index, 1);
    sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }
  getItem(id){
    let shoppingCart = this.getAll();
    let itemId = null;
    shoppingCart.forEach(item=>{
      if(item.cartItemId==id){
        itemId = item;
        return false;
      }
    });
    return itemId;
  }
  getAll(){
    let shoppingCart = sessionStorage.getItem('shoppingCart');
    if(!shoppingCart){
      shoppingCart = [];
    }
    else{
      shoppingCart = JSON.parse(shoppingCart);
    }
    return shoppingCart;
  }
  updateView(){
    updateShoppingCart(this.getAll());
  }
}
class User {
  constructor($rootScope) {
    this.$rootScope = $rootScope;
  }
  login(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('api_token', user.api_token);
  }
  logout(){
    sessionStorage.setItem('user', '{}');
    sessionStorage.setItem('api_token', '');
  }
  getUser(){
    let user = sessionStorage.getItem('user');
    if(!user || user == '{}'){
      return {};
    }
    return JSON.parse(user);
  }
  auth(){
    let user = sessionStorage.getItem('user');
    if(!user || user == '{}'){
      return false;
    }
    return true;
  }
}
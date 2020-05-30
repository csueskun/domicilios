const apiUrl = 'http://sgv.h-software.co/';
const imgUrl = 'http://sgv.h-software.co/img/';
const api_token = 'b2Q1enFKNWxFM3NtUWViWTl4T1hMOTVFMDBNRXU1ZlJtcWFCTE9hbA==';

class ApiInterface {
  constructor($http) {
    this.$http = $http;
  }
  get(url, config={}, thenCallback=()=>{}, errorCallback=()=>{}, finallyCallback=()=>{}) {
    if(config.hasOwnProperty('params')){
      config.params.api_token = api_token;
    }
    else{
      config.params = { api_token: api_token };
    }
    this.$http.get(apiUrl+url, config).then(thenCallback, errorCallback);
  }
  post(url, data={}, config={}, thenCallback=()=>{}, errorCallback=()=>{}, finallyCallback=()=>{}) {
    config.params = { api_token: api_token };
    url = apiUrl+url+paramObjectToString(config.params);
    this.$http.post(url, data, config).then(thenCallback, errorCallback);
  }
  put(url, data={}, config={}, thenCallback=()=>{}, errorCallback=()=>{}, finallyCallback=()=>{}) {
    config.params = { api_token: api_token };
    url = apiUrl+url+paramObjectToString(config.params);
    this.$http.put(url, data, config).then(thenCallback, errorCallback);
  }
  delete(url, config={}, thenCallback=()=>{}, errorCallback=()=>{}, finallyCallback=()=>{}) {
    config.params = { api_token: api_token };
    url = apiUrl+url+paramObjectToString(config.params);
    this.$http.delete(url, config).then(thenCallback, errorCallback);
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
app.controller('homeController', function($scope, apiInterface, snackbar, shoppingCart, $timeout) {
  $scope.productoList = [];
  $scope.productTree = [];
  $scope.empresaSelected = loadEmpresaSelected();
  $scope.pagination = {per_page: 12};

  if($scope.empresaSelected){
    $scope.pagination.empresa = $scope.empresaSelected.id;
  }

  let units = {
    'UND': 'Unidad',
    'klg': 'Kilo',
    'kl': 'Kilo'
  }

  loadProductTree();
  loadProductos();
  shoppingCart.updateView();

  function loadProductTree(){
    $scope.loadingProductTree = true;
    let success = data=>{
      if(data.status == 200){
        $scope.productTree = data.data.data;
        $scope.loadingProductTree = false;

      }};
    let error = error=>{
      console.error(error);
      $scope.loadingProductTree = false;
    };
    apiInterface.get('product-tree', {}, success, error);
  }

  function loadProductos(){
    $scope.loadingProductos = true;
    let success = data=>{
      if(data.status == 200){
        $scope.productoList = data.data.data.data;
        $scope.pagination = data.data.data.pagination;
        $scope.loadingProductos = false;
        // setImgPath();
        setExtraData();
        $scope.showProductList();
      }};
    let error = error=>{
      console.error(error);
      $scope.loadingProductos = false;
    };
    apiInterface.get('paginated/producto', {params: $scope.pagination}, success, error);
  }

  function setExtraData(){
    if(Array.isArray($scope.productoList)){
      $scope.productoList.forEach(p=>{
        p.imagen = productoImg(p.imagen);
        p.cantidad = 1;
        if(units.hasOwnProperty(p.unidad)){
          p.unidad = units[p.unidad];
        }
        else{
          p.unidad = '';
        }
      });
    }
  }

  $scope.showProducto = function(producto){
    $scope.producto = producto;
    $('#producto-list').collapse('toggle');
    $timeout(() => {
      $('#producto-detail').collapse('toggle');
    }, 500);
    loadRelated();
  }
  
  $scope.showRelatedProducto = function(producto){
    $('#producto-detail').collapse('toggle');
    $timeout(()=>{
      $scope.producto = producto;
      $('#producto-detail').collapse('toggle');
    }, 500);
  }

  function loadRelated(){
    $scope.loadingRelated = true;
    let success = data=>{
      if(data.status == 200){
        $scope.relatedProducts = data.data.data;
        $scope.loadingRelated = false;
        if(Array.isArray($scope.relatedProducts)){
          $scope.relatedProducts.forEach(p=>{
            p.imagen = productoImg(p.imagen);
          });
        }
      }};
    let error = error=>{
      console.log(error);
      $scope.loadingRelated = false;
    };
    apiInterface.get('related-products/'+$scope.producto.id, {}, success, error);
  }

  function productoImg(img){
    return apiInterface.getImgUrl(img, 'productos');
  }

  $scope.showProductList = function(){
    if($('#producto-detail').hasClass('show')){
      $timeout(() => {
        $('#producto-list').collapse('toggle');
      }, 500);
      $('#producto-detail').collapse('toggle');
    }
  }

  $scope.preAddItemPedido = function(){
    $scope.itemPedido = {
      cantidad: 1,
      observaciones: ''
    }
    $('#addItemModal').modal('toggle');
  }

  $scope.addItemPedido = function(){
    $scope.producto.cantidad = $scope.itemPedido.cantidad;
    $scope.producto.observaciones = $scope.itemPedido.observaciones;
    shoppingCart.addItem($scope.producto);
    snackbar.green('Se agregó el producto al carrito');
    $scope.itemPedido = {
      cantidad: 1,
      observaciones: ''
    }
    $('#addItemModal').modal('toggle');
  }

  $scope.addItemPedidoList = function(producto){
    $scope.addProductoList = true;
    $scope.producto = producto;
    $scope.producto.observaciones = '';
    shoppingCart.addItem($scope.producto);
    snackbar.green('Se agregó el producto al carrito');
    $scope.producto.cantidad = 1;
    $scope.addProductoList = false;
  }
  
  $scope.show = function(section){
    $('.collapse.main-content.show').collapse('toggle');
    $('.main-content.collapse#'+section).collapse('toggle');
  }

  $scope.setPaginationPage = function(page){
    $scope.pagination.current_page = page;
    loadProductos();
  }
  
  $scope.treeFilter = function(clase, grupo=0, empresa=0){
    $scope.pagination = {per_page: 12, search: $scope.pagination.search};
    $scope.pagination.clase = clase;
    if(grupo>0){
      $scope.pagination.grupo = grupo;
    }
    if(empresa>0){
      $scope.pagination.empresa = empresa;
    }
    loadProductos();
  }
  
  $scope.searchProducts = function(){
    loadProductos();
  }

  function loadEmpresaSelected(){
    let empresaSelected = sessionStorage.getItem('empresa');
    if(!empresaSelected || empresaSelected == '{}'){
      return {};
    }
    return JSON.parse(empresaSelected);
  }
});
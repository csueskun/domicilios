app.controller('empresaController', function($scope, apiInterface, snackbar, shoppingCart, $timeout) {
  $scope.empresaList = [];
  $scope.productTree = [];
  $scope.pagination = {per_page: 10};
  $scope.empresaTree = true;
  sessionStorage.setItem('empresa', '{}');

  loadEmpresas();
  loadEmpresaTree();

  function loadEmpresaTree(){
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

  function loadEmpresas(){
    $scope.loading = true;
    let success = data=>{
      if(data.status == 200){
        $scope.empresaList = data.data.data.data;
        $scope.pagination = data.data.data.pagination;
        $scope.pagination.search = '';
        delete $scope.pagination.search;
        $scope.loading = false;
        setExtraData();
      }};
    let error = error=>{
      console.error(error);
      $scope.loading = false;
    };
    apiInterface.get('paginated/empresa', {params: $scope.pagination}, success, error);
  }

  function setExtraData(){
    if(Array.isArray($scope.empresaList)){
      $scope.empresaList.forEach(p=>{
        p.imagen = apiInterface.getImgUrl(p.rutafoto, 'empresas');;
      });
    }
  }
  
  $scope.perPageOptions = [
    {des: '10', val: 10},
    {des: '20', val: 20},
    {des: '30', val: 30},
    {des: '40', val: 40},
    {des: '50', val: 50},
  ]
  $scope.setPaginationPage = function(page){
    $scope.pagination.current_page = page;
    loadEmpresas();
  }
  $scope.setPerPage = function(){
    $scope.pagination.current_page = 1;
    loadEmpresas();
  }

  $scope.treeFilter = function(clase, grupo=0){
    $scope.pagination = {per_page: 12, search: $scope.pagination.search};
    $scope.pagination.clase = clase;
    if(grupo>0){
      $scope.pagination.grupo = grupo;
    }
    loadEmpresas();
  }

  $scope.selectEmpresa = function(empresa){
    sessionStorage.setItem('empresa', JSON.stringify(empresa));
    window.location.href = '/';
    // $timeout(() => {
    // }, 1500);
  }
  $scope.searchProducts = function(){
    $scope.pagination.nombre = $scope.pagination.search;
    delete $scope.pagination.search;
    loadEmpresas();
  }
});
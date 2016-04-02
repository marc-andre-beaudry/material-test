var app = angular.module('condoManagerApp', ['ngMaterial', 'home', 'main', 'unit', 'request', 'user', 'ngRoute']);
  
app.config(function($mdThemingProvider, $mdIconProvider){

      $mdIconProvider
          .defaultIconSet("./app/assets/svg/avatars.svg", 128)
          .icon("menu"       , "./app/assets/svg/menu.svg"        , 24)
          .icon("share"      , "./app/assets/svg/share.svg"       , 24)
          .icon("google_plus", "./app/assets/svg/google_plus.svg" , 512)
          .icon("hangouts"   , "./app/assets/svg/hangouts.svg"    , 512)
          .icon("twitter"    , "./app/assets/svg/twitter.svg"     , 512)
          .icon("phone"      , "./app/assets/svg/phone.svg"       , 512);

          $mdThemingProvider.theme('default')
              .primaryPalette('blue')
              .accentPalette('red');

  });

app.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl : 'app/components/home/HomeView.html',
      controller : 'HomeController as HomeController'
    });
    $routeProvider.when('/units', {
      templateUrl : 'app/components/unit/UnitView.html',
      controller : 'UnitController as UnitController'
    });
    $routeProvider.when('/requests', {
      templateUrl : 'app/components/request/RequestView.html',
      controller : 'RequestController as RequestController'
    });
    $routeProvider.when('/users', {
      templateUrl : 'app/components/user/UserView.html',
      controller : 'UserController as UserController'
    });
    $routeProvider.otherwise({
      redirectTo : '/home'
    });
  } 
  ]);

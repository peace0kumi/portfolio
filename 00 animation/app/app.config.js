(function(){
  'use strict'

  angular.module('UILabani')

  .constant('ApiEndpoint', 'http://ui-lab.co.kr/api/v2')
  .config(function($stateProvider,$urlRouterProvider,$mdIconProvider) {

    $mdIconProvider
               .iconSet('social', 'assets/svg/social-icons.svg', 24)
               .iconSet('navigation', 'assets/svg/navigation-icons.svg', 24)
               .defaultIconSet('assets/svg/core-icons.svg', 24);

    $stateProvider
    .state('app', {
          url: '/app',
          // abstract: true,
          templateUrl: 'platform/platform.template.html',
          controller: 'ContentsCtrl'
      })

      // .state('app.index', {
      //     url: '/index',  
      //     views: {
      //         'contents': {
      //             templateUrl: 'contents/contents.template.html',
      //             controller: 'ContentsCtrl'
      //         }
      //     }
      // })
      
       // Default Routing
      $urlRouterProvider.otherwise('/app');
  });

})(); 
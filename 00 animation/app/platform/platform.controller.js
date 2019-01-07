(function(){
	'use strict'

	angular
	    .module('UILabani.platform')
	    .controller('ContentsCtrl', ContentsCtrl);

	ContentsCtrl.$inject = ['$scope','$window','$stateParams','$sce','$timeout','$mdSidenav','$mdDialog','AniService'];

	function ContentsCtrl($scope, $window, $stateParams, $sce, $timeout, $mdSidenav, $mdDialog, AniService, $location){
        //category click & laad more
        var mediaNum = 12;
        var addmediaNum = 12;
        var itemLen = 0;

        //sidenavi toggle
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            };
        }

        $scope.goDetail = function(ev,linkId) {
            $mdDialog.show({
              controller: function($scope, $mdDialog, $sce){

                $scope.hide = function() {
                  $mdDialog.hide();
                };

                $scope.cancel = function() {
                  $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                  $mdDialog.hide(answer);
                };

                $scope.url = $sce.trustAsResourceUrl(linkId);
              },
              templateUrl: 'dialog1.tmpl.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              // $scope.url = $sce.trustAsResourceUrl('https://docs.angularjs.org/tutorial');
            }, function() {
              // $scope.status = 'You cancelled the dialog.';
            });
          };

        $scope.status = '  ';
        $scope.customFullscreen = false;

        $scope.getList = function(categoryId){
            return getList(categoryId).then(function(response) {
                $scope.items = response.data;
                itemLen = $scope.items.length;
                /*$scope.toggleLeft();*/
            });
        }
        
        //video thumbnail 재생
        $scope.playVideo = function(idx){
            var video = $(".video__media").eq(idx);
            var videoCtrl = $(".video__controls");

            video.get(0).play();
            video.siblings(videoCtrl).addClass('video__controls--hidden');
            video.on('ended',function(){
                video.siblings(videoCtrl).removeClass('video__controls--hidden');
            });
        }

        $scope.clickCategories = function(e){
            //category 클릭시 active
            var thisObj = $(e.currentTarget);
            thisObj.addClass('active open').siblings().removeClass('active open');

            //카테고리 안에서 limit 개수 초기화
            $scope.limit = mediaNum;
        }

        $scope.clickAll = function(e){
            var thisObj = $(e.currentTarget);
            thisObj.addClass('active open').siblings().removeClass('active open');

            //카테고리 ALL 안에서 limit 개수 초기화
            $scope.limit = mediaNum;
        }

        //dropdown open
        $scope.clickDropdown = function(e){
            var activeObj = $(e.currentTarget).parents('.card');

            activeObj.addClass('support-active');
        }

        //dropdown close
        $scope.clickClose = function(e){
            var activeObj = $(e.currentTarget).parents('.card');

            activeObj.removeClass('support-active');
        }

        //loadmore action
        $scope.loadmore = function(){
            if(itemLen > 0){
                $scope.limit = $scope.limit + addmediaNum;
                itemLen = itemLen - addmediaNum;
            }
        }

        $scope.checkItemLen = function(){
            if(itemLen > addmediaNum){
                return true;
            }else{
                return false;
            }
        }

        $scope.limit = mediaNum;

        activate();

        function activate() {
            getCategories().then(function(response) {
                $scope.categories = response.data;
                $scope.countAll = response.countAll;
            });
            getList('ALL').then(function(response) {
                $scope.items = response.data;
                itemLen = $scope.items.length;
            });
        }

        function getCategories() {
            return AniService.getCategories()
            .then(function(response) {
                return response.data;
            });
        }

        function getList(categoryId) {
            return AniService.getList(categoryId)
            .then(function(response) {
                return response.data;
            });
        }

	}
})();




(function(){
	'use strict'

	angular
	    .module('UILabani.services',[]);

	angular
		.module('UILabani.services')
		.factory('AniService',AniService);
	
	AniService.$inject = ['$http', 'ApiEndpoint'];

	function AniService($http, ApiEndpoint){

		return {
			getCategories: getCategories,
			getList: getList
		}

		// 설문 리스트 불러오기
		function getCategories(){
				return $http({
					method:'GET',
					url: ApiEndpoint + '/categories',
					headerskey: {'Content-Type': 'application/json; charset=utf-8'}
				})
				.then(listComplate)
				.catch(listFailed);
		
				function listComplate(response){
					return response;
				}
				function listFailed(error){
					// console.log(error.data);
				}
		}

		function getList(cate){
				return $http({
					method:'GET',
					url: ApiEndpoint + '/list/'+cate,
					headerskey: {'Content-Type': 'application/json; charset=utf-8'}
				})
				.then(listComplate)
				.catch(listFailed);
		
				function listComplate(response){
					return response;
				}
				function listFailed(error){
					// console.log(error.data);
				}
		}
	}
})();
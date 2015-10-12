'use strict';

angular.module('creepScore.search',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/search', {
		templateUrl: 'search/search.html',
		controller: 'searchController'
	})
}])
.factory('Home',function($http,$log,$q){
	return{
		searchSummoner: function(data){
			var p = $q.defer();
			$http.post('engine.php?method=route',{class:'search',function:'getSummoner', data: data})
				.then(function(success){
					log(success, 'search.searchSummoner success-');
					p.resolve(success)
				}, function(){
					log(data,"search.searchSummoner failure -");

				})
			return p.promise
		}
	}
})
.controller('searchController', ['$scope','SummonerService', '$location', 'Home', function($scope, SummonerService, $location, Home){

	$scope.regionList = [
		{name: "North America", value: "na"},
		{name: "Europe North East", value: "eune"},
		{name: "Europe West", value: "euw"},
		{name: "Latin America North", value: "lan"},
		{name: "Latin America South", value: "las"},
		{name: "Oceanic", value: "oce"},
		{name: "Turkey", value: "tr"},
		{name: "Russia", value: "ru"},
		{name: "Brazil", value: "br"},
		{name: "PBE", value: "pbe"},
		{name: "Korea", value: "kr"}
	];
	$scope.selRegion = $scope.regionList[0];

	$scope.searchSummoners = function(key){
		key=key.keyCode || key.which;
		if(key===13){
			var data = {region: $scope.selRegion.value.toLowerCase(), name: $scope.summonerName.toLowerCase()}
			Home.searchSummoner(data).then(function(response){
				SummonerService.summoner=response.data;
				$location.path('/main/'+data.region+'/'+$scope.summonerName);
			})
			.catch(function(){
				$scope.errorMessage = 'failed to lookup summoner';
			})
		}
	}
}]);
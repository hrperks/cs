'use strict';

angular.module('creepScore.search',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/search', {
		templateUrl: 'search/search.html',
		controller: 'searchController'
	})
}])
.factory('Search',function($http, $q, $log, SummonerService,ChampionService){
	return {
		getProfile: function(data){
			var p = $q.defer();

			data.getChampions = (ChampionService.championList==0);

			$http.post('engine.php?method=route', {class:'search', function: 'getProfile', data: data})
				.then(function(success){
					if(data.getChampions){ChampionService.setChampionList(success.data.ChampionList.data);}
					SummonerService.summoner = success.data;
					log(success.data, 'search.getProfile success');
					p.resolve(success.data)
				}, function(){
					log(data,"search.getProfile failed");
					p.reject(null);
				})
		}
	}
})
.controller('searchController', ['$scope','$timeout','SummonerService','Search', function($scope,$timeout, SummonerService,Search){
	$scope.regionList= [
	{name:"North America", value:"NA"}
	];
	$scope.selRegion = $scope.regionList[0];

	$scope.findSummoner = function(key){
			key=key.keyCode || key.which;
		if(key===13){
			var data = {region: $scope.selRegion.value.toLowerCase(), name: $scope.summonerName.toLowerCase()}
			Home.getProfile(data).then(function(response){
				SummonerService.summoner=response.data;
				$location.path('/summoner/'+data.region+'/'+$scope.summonerName);
			})
			.catch(function(){
				$scope.errorMessage = 'failed to lookup summoner';
			})
		}
	}
}])
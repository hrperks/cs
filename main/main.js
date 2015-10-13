'use strict';

angular.module('creepScore.main',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/main/:region/:name', {
		templateUrl: 'main/main.html',
		controller: 'mainController'
	})
}])
.factory('Main',function($http,$log,$q,ChampionService){
	return{
		 setUpChampions: function(data){
		 	if(ChampionService.championList.length==0){data.getChampions=true;}
		 	$http.post('engine.php?method=route',{class:'main',function:'getChampion', data: data})
				.then(function(success){
					if(data.getChampions){ChampionService.setChampionList(success.data.championList.data);}
					
					log(success, 'main.getChampion success-');
					p.resolve(success)
				}, function(){
					log(data,"main.getChampion failure -");

				})
			return p.promise
		 }
	}
})
.controller('mainController', ['$scope','$routeParams', 'SummonerService', 'Main', function($scope,$routeParams,SummonerService){
		$scope.name = $routeParams.name;
		$scope.region = $routeParams.region;
		$scope.roleList=[
		{name:"middle lane", value:"mid"},
		{name:"attack Damage Carry", value:"adc"},
		{name:"Top Lane", value:"top"},
		];
		$scope.display='';
		$scope.testOne="MidLane";
		$scope.testTwo="ADC";
		$scope.testThree="TOP lane";
		$scope.roleSel = $scope.roleList[0];
		$scope.test = function(){
			switch($scope.roleSel.value){
				case "mid":
					$scope.display=$scope.testOne;
					break;
				case "adc":
					$scope.display=$scope.testTwo;
					break;
				case "top":
					$scope.display=$scope.testThree;
					break;
			}
		}
}])
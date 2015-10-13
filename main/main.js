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
		 	var p = $q.defer();
		 	var Roles={top:[],mid:[],adc:[]};

		 	if(ChampionService.championList.length==0){
		 	$http.get("http://ddragon.leagueoflegends.com/cdn/5.20.1/data/en_US/champion.json")
				.then(function(success){
					ChampionService.setChampionList(success.data.data);
					
					
				})
				//Experimental
				angular.forEach(ChampionService.championList,function(champion){
					if(champion.tags.length==1){
						switch(champion.tags){
							case "Marksman":
								Roles.adc.push(champion);
								break;
							case "Mage":
								Roles.mid.push(champion);
								break;
							case "Assassin":
								Roles.mid.push(champion);
								break;
							case "Fighter":
								Roles.top.push(champion);
								break;
							case "Tank":
								Roles.top.push(champion);
								break;
						}
					}
					else{
						if(champion.tags[0]!="Support" || champion.tags[1]!="Support"){
							if(champion.tags[0]=="Mage" || champion.tags[1]=="Mage"){
								Roles.mid.push(champion);
							}
							else if(champion.tags[0]=="Tank" || champion.tags[1]=="Tank"){
								Roles.top.push(champion);
							}
							else if(champion.tags[0]=="Fighter" || champion.tags[1]=="Fighter"){
								Roles.top.push(champion);
							}
						}
						else if(champion.tags[0]=="Marksman" || champion.tags[1]=="Marksman"){
							Roles.adc.push(champion);
							//ashe is a special cookie
						}
					}
				})
				log(Roles, 'main.getChampion success-');
					p.resolve(Roles)
			}

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
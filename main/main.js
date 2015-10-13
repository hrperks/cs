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
					
					angular.forEach(ChampionService.championList,function(champion){
					if(champion.tags.length==1){
						switch(champion.tags[0]){
							case "Marksman":
								Roles.adc.push({champion,level:0,recentScores:[]});
								break;
							case "Mage":
								Roles.mid.push({champion,level:0,recentScores:[]});
								break;
							case "Assassin":
								Roles.mid.push({champion,level:0,recentScores:[]});
								break;
							case "Fighter":
								Roles.top.push({champion,level:0,recentScores:[]});
								break;
							case "Tank":
								Roles.top.push({champion,level:0,recentScores:[]});
								break;
						}
					}
					else{
						if(champion.tags[0]!="Support" && champion.tags[1]!="Support"){
							if(champion.tags[0]=="Marksman"){
								Roles.adc.push({champion,level:0,recentScores:[]});
							}
							else if(champion.tags[0]=="Mage" || champion.tags[1]=="Mage"){
								Roles.mid.push({champion,level:0,recentScores:[]});
							}
							else if(champion.tags[0]=="Tank" || champion.tags[1]=="Tank"){
								Roles.top.push({champion,level:0,recentScores:[]});
							}
							else if(champion.tags[0]=="Fighter" || champion.tags[1]=="Fighter"){
								Roles.top.push({champion,level:0,recentScores:[]});
							}
						}
						else if(champion.tags[0]=="Marksman" || champion.tags[1]=="Marksman"){
							Roles.adc.push({champion,level:0,recentScores:[]});
							//ashe is a special cookie
						}
					}
				})
				log(Roles, 'main.getChampion success-');
					p.resolve(Roles)
				})
				}
				else{
				//Experimental
				angular.forEach(ChampionService.championList,function(champion){
					if(champion.tags.length==1){
						switch(champion.tags[0]){
							case "Marksman":
								Roles.adc.push({champion,level:0,recentScores:[]});
								break;
							case "Mage":
								Roles.mid.push({champion,level:0,recentScores:[]});
								break;
							case "Assassin":
								Roles.mid.push({champion,level:0,recentScores:[]});
								break;
							case "Fighter":
								Roles.top.push({champion,level:0,recentScores:[]});
								break;
							case "Tank":
								Roles.top.push({champion,level:0,recentScores:[]});
								break;
						}
					}
					else{
						if(champion.tags[0]!="Support" && champion.tags[1]!="Support"){
							if(champion.tags[0]=="Marksman"){
								Roles.adc.push({champion,level:0,recentScores:[]});
							}
							else if(champion.tags[0]=="Mage" || champion.tags[1]=="Mage"){
								Roles.mid.push({champion,level:0,recentScores:[]});
							}
							else if(champion.tags[0]=="Tank" || champion.tags[1]=="Tank"){
								Roles.top.push({champion,level:0,recentScores:[]});
							}
							else if(champion.tags[0]=="Fighter" || champion.tags[1]=="Fighter"){
								Roles.top.push({champion,level:0,recentScores:[]});
							}
						}
						else if(champion.tags[0]=="Marksman" || champion.tags[1]=="Marksman"){
							Roles.adc.push({champion,level:0,recentScores:[]});
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
.controller('mainController', ['$scope','$routeParams', 'SummonerService', 'Main', function($scope,$routeParams,SummonerService,Main){
		$scope.name = $routeParams.name;
		$scope.region = $routeParams.region;
		$scope.roleList=[
		{name:"nothing", value:""},
		{name:"middle lane", value:"mid"},
		{name:"attack Damage Carry", value:"adc"},
		{name:"Top Lane", value:"top"},
		];
		$scope.display={};
		$scope.roleSel = $scope.roleList[0];
		$scope.test = function(){
			switch($scope.roleSel.value){
				case "mid":
					$scope.display=$scope.mid;
					break;
				case "adc":
					$scope.display=$scope.adc;
					break;
				case "top":
					$scope.display=$scope.top;
					break;
				default:
					$scope.display={};
					break;
			}
		}
		Main.setUpChampions().then(function(success){
			$scope.adc={levelZero: {title:"Level One", desc:'',champs:success.adc},LevelOne: {title:"Level Two", desc:'', champs:[]},LevelTwo: {title:"Level Three", desc:'', champs:[]},LevelThree: {title:"Level Four", desc:'', champs:[]},LevelFour: {title:"Level Five", desc:'', champs:[]},LevelFive: {title:"Level Six", desc:'', champs:[]},LevelSix: {title:"Level Seven", desc:'', champs:[]},LevelSeven: {title:"Level Eight", desc:'', champs:[]},LevelEight: {title:"Level Nine", desc:'', champs:[]},LevelNine: {title:"Level Ten", desc:'', champs:[]},LevelTen: {title:"Level Eleven", desc:'', champs:[]},LevelEleven: {title:"Level Twelve", desc:'', champs:[]},LevelTwelve: {title:"Level Thirteen", desc:'', champs:[]},LevelThirteen: {title:"Level FourTeen", desc:'', champs:[]}};
			$scope.mid={levelZero: {title:"Level One", desc:'',champs:success.mid},LevelOne: {title:"Level Two", desc:'', champs:[]},LevelTwo: {title:"Level Three", desc:'', champs:[]},LevelThree: {title:"Level Four", desc:'', champs:[]},LevelFour: {title:"Level Five", desc:'', champs:[]},LevelFive: {title:"Level Six", desc:'', champs:[]},LevelSix: {title:"Level Seven", desc:'', champs:[]},LevelSeven: {title:"Level Eight", desc:'', champs:[]},LevelEight: {title:"Level Nine", desc:'', champs:[]},LevelNine: {title:"Level Ten", desc:'', champs:[]},LevelTen: {title:"Level Eleven", desc:'', champs:[]},LevelEleven: {title:"Level Twelve", desc:'', champs:[]},LevelTwelve: {title:"Level Thirteen", desc:'', champs:[]},LevelThirteen: {title:"Level FourTeen", desc:'', champs:[]}};
			$scope.top={levelZero: {title:"Level One", desc:'',champs:success.top},LevelOne: {title:"Level Two", desc:'', champs:[]},LevelTwo: {title:"Level Three", desc:'', champs:[]},LevelThree: {title:"Level Four", desc:'', champs:[]},LevelFour: {title:"Level Five", desc:'', champs:[]},LevelFive: {title:"Level Six", desc:'', champs:[]},LevelSix: {title:"Level Seven", desc:'', champs:[]},LevelSeven: {title:"Level Eight", desc:'', champs:[]},LevelEight: {title:"Level Nine", desc:'', champs:[]},LevelNine: {title:"Level Ten", desc:'', champs:[]},LevelTen: {title:"Level Eleven", desc:'', champs:[]},LevelEleven: {title:"Level Twelve", desc:'', champs:[]},LevelTwelve: {title:"Level Thirteen", desc:'', champs:[]},LevelThirteen: {title:"Level FourTeen", desc:'', champs:[]}};
		});
}])
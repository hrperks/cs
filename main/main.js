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
		$scope.desc["Achieve 95% of max CS with full runes and masteries, no lane opponents, and normal items. This will let you CS almost perfectly when no one is bothering you, and makes it a huge problem for the enemy team to leave you alone in lane for long periods of time, as you will get farmed very quickly relative to other players.",
					"Achieve 95% of max CS with full runes and masteries, no lane opponents, and normal items, but this time, keep moving between each auto attack. Stay out of auto attack range of the minions before you last hit, and go in for the CS only when you will one-hit the minion. This exercise will naturally increase your mechanical ability, and by enhancing your mobility, will allow you to remain safer in lane. (Note that you can cancel the second half of the auto attack animation by clicking immediately after the damage applies to the minion for melee champions, and after the projectile leaves your character for ranged champions. For ranged champions it can look like the ranged projectile has left the character, but when it arrives it does no damage to the minion. This is because you canceled the animation a hair too early)",
					]
		Main.setUpChampions().then(function(success){
			$scope.adc={levelZero: {title:"Level One", desc:$scope.desc[0],champs:success.adc},LevelOne: {title:"Level Two", desc:$scope.desc[1], champs:[]},LevelTwo: {title:"Level Three", desc:'', champs:[]},LevelThree: {title:"Level Four", desc:'', champs:[]},LevelFour: {title:"Level Five", desc:'', champs:[]},LevelFive: {title:"Level Six", desc:'', champs:[]},LevelSix: {title:"Level Seven", desc:'', champs:[]},LevelSeven: {title:"Level Eight", desc:'', champs:[]},LevelEight: {title:"Level Nine", desc:'', champs:[]},LevelNine: {title:"Level Ten", desc:'', champs:[]},LevelTen: {title:"Level Eleven", desc:'', champs:[]},LevelEleven: {title:"Level Twelve", desc:'', champs:[]},LevelTwelve: {title:"Level Thirteen", desc:'', champs:[]},LevelThirteen: {title:"Level FourTeen", desc:'', champs:[]}};
			$scope.mid={levelZero: {title:"Level One", desc:$scope.desc[0],champs:success.mid},LevelOne: {title:"Level Two", desc:$scope.desc[1], champs:[]},LevelTwo: {title:"Level Three", desc:'', champs:[]},LevelThree: {title:"Level Four", desc:'', champs:[]},LevelFour: {title:"Level Five", desc:'', champs:[]},LevelFive: {title:"Level Six", desc:'', champs:[]},LevelSix: {title:"Level Seven", desc:'', champs:[]},LevelSeven: {title:"Level Eight", desc:'', champs:[]},LevelEight: {title:"Level Nine", desc:'', champs:[]},LevelNine: {title:"Level Ten", desc:'', champs:[]},LevelTen: {title:"Level Eleven", desc:'', champs:[]},LevelEleven: {title:"Level Twelve", desc:'', champs:[]},LevelTwelve: {title:"Level Thirteen", desc:'', champs:[]},LevelThirteen: {title:"Level FourTeen", desc:'', champs:[]}};
			$scope.top={levelZero: {title:"Level One", desc:$scope.desc[0],champs:success.top},LevelOne: {title:"Level Two", desc:$scope.desc[1], champs:[]},LevelTwo: {title:"Level Three", desc:'', champs:[]},LevelThree: {title:"Level Four", desc:'', champs:[]},LevelFour: {title:"Level Five", desc:'', champs:[]},LevelFive: {title:"Level Six", desc:'', champs:[]},LevelSix: {title:"Level Seven", desc:'', champs:[]},LevelSeven: {title:"Level Eight", desc:'', champs:[]},LevelEight: {title:"Level Nine", desc:'', champs:[]},LevelNine: {title:"Level Ten", desc:'', champs:[]},LevelTen: {title:"Level Eleven", desc:'', champs:[]},LevelEleven: {title:"Level Twelve", desc:'', champs:[]},LevelTwelve: {title:"Level Thirteen", desc:'', champs:[]},LevelThirteen: {title:"Level FourTeen", desc:'', champs:[]}};
		});
}])
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
		{name:"frequently asked Questions", value:"faq"},
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
		$scope.levelup = function(List, Champ){
			var index = findWithAttr(List.champs,"champion",Champ.champion);
			switch($scope.roleSel.value){
				case "mid":
					List.champs.splice(index,1);
					Champ.level++;
					$scope.mid[List.title].champs.push(Champ);
					break;
				case "adc":
					$scope.adc[List.title-1].champs.splice(index,1);
					Champ.level++;
					$scope.adc[List.title].champs.push(Champ);
					break;
				case "top":
					$scope.top[List.title-1].champs.splice(index,1);
					Champ.level++;
					$scope.top[List.title].champs.push(Champ);
					break;
			}
		}
		
		$scope.descTwo=[{obj:"get 34-38 CS in 5 minutes", cond: "full runes/masteries, and Full Items", why:"This will let you CS almost perfectly when no one is bothering you, and makes it a huge problem for the enemy team to leave you alone in lane for long periods of time, as you will get farmed very quickly relative to other players."},
						{obj:"get 34-38 CS in 5 minutes", cond: "full runes/masteries, and Full Items, Move between each auto Attack", why:"this time keep moving between each auto attack. Stay out of auto attack range of the minions before you last hit, and go in for the CS only when you will one-hit the minion. This exercise will naturally increase your mechanical ability, and by enhancing your mobility, will allow you to remain safer in lane. (Note that you can cancel the second half of the auto attack animation by clicking immediately after the damage applies to the minion for melee champions, and after the projectile leaves your character for ranged champions. For ranged champions it can look like the ranged projectile has left the character, but when it arrives it does no damage to the minion. This is because you canceled the animation a hair too early)"},
						{obj:"get 34-38 CS in 5 minutes", cond: "full runes/masteries, and Full Items, Move between each auto Attack, Alternate attacking at every chance, and attacking only to last hit", why:"This teaches you how to both push and freeze a lane when alone, thus giving you the option do either, depending on the in game situation."},
						{obj:"get 34-38 CS in 5 minutes", cond: "full runes/masteries, and Full Items, move Between each auto Attack, Alternate attacking at every chance, and attacking only to last hit, 1 bots (add 3 for top/mid)", why:"Remember your goal is not to kill the bot, but to perfectly CS. You will have to weave in harass while you are last hitting to keep the bot from killing you. This will help you not only focus on the minion wave, but also on your laner as well."},
						{obj:"get 34-38 CS in 5 minutes", cond: "full runes/masteries, and Full Items, move Between each auto Attack, Alternate attacking at every chance, and attacking only to last hit, 2 bots (add 5 for top/mid)", why:"Remember your goal is not to kill the bots, but to perfectly CS. You will have to weave in harass while you are last hitting to keep the bot from killing you. This will help you not only focus on the minion wave, but also on your laner as well."},
						{obj:"get 34-38 CS in 5 minutes", cond: "NO runes/masteries, NO Items move Between each auto Attack, Alternate attacking at every chance, and attacking only to last hit, 2 bots", why:"This makes harder on you, and simulates the higher pressure of a PvP game, because the bots will pack a larger punch if you're not running runes and masteries. It also teaches you to last hit by a smaller margin. You will better walk the razor's edge of a minion having 10 hp when your auto hits and a minion having 0 hp when your auto hits."},
						{obj:"get 34-38 CS in 5 minutes", cond: "NO runes/masteries, NO Items move Between each auto Attack, Alternate attacking at every chance, and attacking only to last hit, 2 bots And practice Awareness", why:"There are many things you can do to practice awareness. Press tab and examine the Scoreboard; check for items, KDAs, and CS scores. Remind yourself of the team compositions and summoner spells, and what cooldowns others might have. Also examine at the minimap to account for the other champions and see how lanes are pushed. Check other lanes for HP values and such. Which of these to do depends on how much time you have between minion deaths. This reduces your tunnel vision and promotes a wholistic understanding of the game"},
						{obj:"get 34-38 CS in 5 minutes", cond: "NO runes/masteries, NO Items move Between each auto Attack, Alternate attacking at every chance, and attacking only to last hit, 2 bots, practice Awareness, And predict order of minion deaths", why:"Later on this will help you to plan harass better on the enemy, so it's best to get in the habit now."},
						{obj:"get 34-38 CS in 5 minutes", cond: "NO runes/masteries, NO Items move Between each auto Attack, Alternate attacking at every chance, and attacking only to last hit, 2 bots, practice Awareness, And predict order of minion deaths, use Auto attacks to make it so a minion from one side will not die at the same time as one from the other", why:"This will give you the opportunity to both open up more chances for harassing the enemy and protecting yourself from harass at a later point. The second part may not be always practical in game, because the more auto attacks you make the more windows for harass you will create for yourself, but some players will not take advantage of this so its good to know how to do, and it is still good practice."}
						]
		Main.setUpChampions().then(function(success){
			$scope.adc=[{title: 1, desc: [],champs:success.adc},{title:2, desc:[], champs:[]}, {title:3, desc:'', champs:[]}, {title:4, desc:'', champs:[]}, {title:5, desc:'', champs:[]}, {title:6, desc:'', champs:[]}, {title:7, desc:'', champs:[]}, {title:8, desc:'', champs:[]}, {title:9, desc:'', champs:[]}, {title:10, desc:'', champs:[]}, {title:11, desc:'', champs:[]}, {title:12, desc:'', champs:[]}, {title:13, desc:'', champs:[]}, {title:14, desc:'', champs:[]}];
			$scope.mid=[{title: 1, desc:[],champs:success.mid},{title:2, desc: [], champs:[]},{title:3, desc:'', champs:[]}, {title:4, desc:'', champs:[]}, {title:5, desc:'', champs:[]}, {title:6, desc:'', champs:[]}, {title:7, desc:'', champs:[]}, {title:8, desc:'', champs:[]}, {title:9, desc:'', champs:[]}, {title:10, desc:'', champs:[]}, {title:11, desc:'', champs:[]}, {title:12, desc:'', champs:[]}, {title:13, desc:'', champs:[]}, {title:14, desc:'', champs:[]}];
			$scope.top=[{title: 1, desc: [],champs:success.top},{title:2, desc: [], champs:[]}, {title:3, desc:'', champs:[]}, {title:4, desc:'', champs:[]}, {title:5, desc:'', champs:[]}, {title:6, desc:'', champs:[]}, {title:7, desc:'', champs:[]}, {title:8, desc:'', champs:[]}, {title:9, desc:'', champs:[]}, {title:10, desc:'', champs:[]}, {title:11, desc:'', champs:[]}, {title:12, desc:'', champs:[]}, {title:13, desc:'', champs:[]}, {title:14, desc:'', champs:[]}];
			for(var i =0;i<9;i++){
				$scope.adc[i].desc=$scope.descTwo[i];
				$scope.mid[i].desc=$scope.descTwo[i];
				$scope.top[i].desc=$scope.descTwo[i];
			}
		});
}])
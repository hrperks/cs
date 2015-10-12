'use strict';

var findWithAttr = null;
var makeGameModeLabel = null;
var log = null;

angular.module('creepScore', [
	'ngRoute',
	'creepScore.search',
	'creepScore.main',
	'creepScore.version'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/search'});
}])

.run(['$rootScope', '$log', function($rootScope, $log){
	findWithAttr = function(arr, attr, value){
		for(var i = 0; i < arr.length; i++){
			if(arr[i][attr] == value) return i;
		}
		return -1; //added this if problems occur remove this
	}

	makeGameModeLabel = function(mode, queue){
		mode = mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase();
		switch (queue) {
			case "RANKED_SOLO_5x5":
			queue = "Solo Queue";
			break;

			case "NORMAL_5x5_BLIND":
			queue = "Normal Blind 5s ";
			break;

			case "NORMAL":
			queue = "Normal 5s";
			break;

			default: 
				queue;
		};

		return mode + " - " + queue;
	}

	log = function(content, info, type){
		if(info) $log.info(info);
		if(!type) $log.debug(content);
		//cases for type
		else if (type){
			switch (type) {
				case "l":
				$log.log(content);
				break;

				case "i":
				$log.info(content);
				break;

				case "w":
				$log.warn(content);
				break;

				case "e":
				$log.error(content);
				break;

				case "d":
				$log.debug(content);
				break;

				default:
					$log.debug(content);
			}
		}
	}
}])

//Services

.service("SummonerService", function(){
	this.summoner={};
})
.service("ChampionService", function(){
	//reference for inner scopes...
	var thisService = this;
	
	this.setChampionList = function(championObject){
		var array = [];

		angular.forEach(Object.keys(championObject), function(champName){
			array.push(championObject[champName]);
		})

		thisService.championList = array;
	};

	this.championList = [];
})
'use strict';

angular.module('creepScore.main',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/main/:region/:name', {
		templateUrl: 'main/main.html',
		controller: 'mainController'
	})
}])
.controller('mainController', ['$scope','$routeParams', 'SummonerService', function($scope,$routeParams,SummonerService){

}])
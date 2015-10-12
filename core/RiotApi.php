<?php

class RiotApi {

	private $data =null;

	public function load($data){
		$this->data = $data;
	}

	// insert API calls here.
	public function getPlayerInfo($region, $name){
		$url = "https://{$region}.api.pvp.net/api/lol/{$region}/v1.4/summoner/" . rawurlencode($name) . "?api_key=" . ApiKey;
		$data = @file_get_contents($url);

		Engine::$response= parseHeaders($http_response_header);

		if(Engine::$response['response_code'] == 200){
			$data = json_decode($data);
			$index = preg_replace('/\s+/', '', $name);

			return $data->$index;
		} else {
			//failed return error code instead of $data
			Engine::$errorFlag = true;
			

			return null;
		}
	}

	public function findTeam($region, $id){
		$url = "https://{$region}.api.pvp.net/api/lol/{$region}/v2.4/team/by-summoner/{$id}?api_key=" . ApiKey;
		$data = @file_get_contents($url);
		$data = json_decode($data);
		//THIS NEEDS TO BE FIXED SOMEHOW BEFORE GOING LIVE
		$filter = $data->$id;
		return $filter[0];
	}
	public function getMatchInfo($region,$id){
		$url = "https://{$region}.api.pvp.net/api/lol/{$region}/v2.2/match/{$id}?api_key=" . ApiKey;
		$match = @file_get_contents($url);
		$match = json_decode($match);
		return $match;
	}
	public function getChampions(){
		$champions = @file_get_contents("http://ddragon.leagueoflegends.com/cdn/5.19.1/data/en_US/champion.json");
		$champions = json_decode($champions);
		return $champions;
	}
}
?>
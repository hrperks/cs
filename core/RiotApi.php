<?php 

class RiotApi{

	private $data = null;

	//loads the above private variable
	public function load($data){
		$this->data = $data;
	}

	public function searchSummoner($region, $name){
		
		//$apiKey
		$url = "https://{$region}.api.pvp.net/api/lol/{$region}/v1.4/summoner/by-name/" . rawurlencode($name) . "?api_key=" . ApiKey;
		$data = @file_get_contents($url);

		//set response code
		Engine::$response = parseHeaders($http_response_header);

		// //if the API call was successfull (summoner found)
		if(Engine::$response['response_code'] == 200){
			$data = json_decode($data);
			//Riot returns an object with Keys labeled by the name of who we are search. The name is made lowercase, and all spaces in the name get removed.
			$index = preg_replace('/\s+/', '', $name);

			return $data->$index;
		} else {
			//failed return error code instead of $data
			Engine::$errorFlag = true;
			

			return null;
		}
	}

	public function getLeague($region, $id){
		$url = "https://{$region}.api.pvp.net/api/lol/{$region}/v2.5/league/by-summoner/{$id}?api_key=" . ApiKey;
		$league = @file_get_contents($url);
		$league = json_decode($league);
		return $league;
	}

	public function getMatches($region, $id){
		
		$url =   "https://{$region}.api.pvp.net/api/lol/{$region}/v1.3/game/by-summoner/{$id}/recent?api_key=" . ApiKey;
		$matches = @file_get_contents($url);
		$matches = json_decode($matches);
		return $matches;
	}

	public function getChampions(){
		$url = "http://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json";
		$champs = @file_get_contents($url);
		$champs = @json_decode($champs);
		return $champs; 
	}
}
?>
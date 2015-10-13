<?php 

class search extends RiotApi{

	private $data = null;

	//loads the above private variable
	public function load($data){
		$this->data = $data;
	}

	public function getSummoner(){
		$summoner = $this->searchSummoner($this->data->region, $this->data->name);
		
		if($this->data->getChampions) $summoner->championList = self::getChampions();
		return $summoner;
	}
}
?>
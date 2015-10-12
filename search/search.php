<?php 

class search extends RiotApi{

	private $data = null;

	//loads the above private variable
	public function load($data){
		$this->data = $data;
	}

	public function getSummoner(){
		return $summoner = $this->searchSummoner($this->data->region, $this->data->name);
	}
}
?>
<?php
class search extends RiotApi {

		private $data = null;

		public function load($data){
		$this->data = $data;
		}

		public function getProfile(){
			return $this->getPlayerInfo($this->data->region, $this->data->name);
		}

}
?>
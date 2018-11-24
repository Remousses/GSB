<?php
	session_start();
	
 	if(isset($_SESSION['visiteur'])){
		require_once '../data/pdogsbrapports.php';
		$nom = $_REQUEST['nom'];
		$pdo = PdoGsbRapports::getPdo();
		$reponse = $pdo->getLesMedecins($nom);
		echo json_encode($reponse);
	}else{
		echo 0;
	}
?>
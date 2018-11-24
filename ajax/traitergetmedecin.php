<?php
	session_start();
	
 	if(isset($_SESSION['visiteur'])){
		require_once '../data/pdogsbrapports.php';
		$idMedecin = $_REQUEST['idMedecin'];
		$pdo = PdoGsbRapports::getPdo();
		$data = $pdo->getMedecin($idMedecin);
		echo json_encode($data);
	}else{
		echo 0;
	}
?>
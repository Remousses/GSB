<?php
	session_start();
	
 	if(isset($_SESSION['visiteur'])){
		require_once '../data/pdogsbrapports.php';
		$idMedecin = $_REQUEST['idMedecin'];
		$adresse = $_REQUEST['adresse'];
		$telephone = $_REQUEST['telephone'];
		$spe_comp = $_REQUEST['spe_comp'];
		$pdo = PdoGsbRapports::getPdo();
		$MSJmedecin = $pdo->getMajMedecin($idMedecin, $adresse, $telephone, $spe_comp);
		echo json_encode($MSJmedecin);
	}else{
		echo 0;
	}
?>
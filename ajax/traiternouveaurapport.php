<?php
	session_start();
	
 	if(isset($_SESSION['visiteur'])){
		require_once '../data/pdogsbrapports.php';
		$idMedecin = $_REQUEST['idMed'];
		$idVisiteur = $_SESSION['visiteur']['id'];
		$motif = $_REQUEST['motif'];
		$bilan = $_REQUEST['bilan'];
		$date = $_REQUEST['date'];
		$lesMedicaments = $_REQUEST['lesMedicaments'];
		$pdo = PdoGsbRapports::getPdo();
		$MSJrapport = $pdo->getNouveauRapport($date, $motif, $bilan, $idVisiteur, $idMedecin, $lesMedicaments);
		echo json_encode($MSJrapport);
	}else{
		echo 0;
	}
?>
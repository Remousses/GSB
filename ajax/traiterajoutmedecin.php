<?php
	session_start();
 	if(isset($_SESSION['visiteur'])){
		require_once '../data/pdogsbrapports.php';
		$nom = $_REQUEST['nom'];
		$prenom = $_REQUEST['prenom'];
		$adr = $_REQUEST['adr'];
		$tel = $_REQUEST['tel'];
		$spe = $_REQUEST['spe'];
		$dep = $_REQUEST['dep'];
		$pdo = PdoGsbRapports::getPdo();
		$med = $pdo->getAjouterMedecin($nom, $prenom, $adr, $tel, $spe, $dep);
		echo json_encode($med);
	}else{
		echo 0;
	}
?>
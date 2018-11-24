<?php
	session_start();
	if(isset($_SESSION['visiteur'])){
		require_once '../data/pdogsbrapports.php';
		$nommedicament = $_REQUEST['nommedicament'];
		$pdo = PdoGsbRapports::getPdo();
		$reponse = $pdo->getLesMedicaments($nommedicament);
		echo json_encode($reponse);
	}else{
		echo 0;
	}
?>
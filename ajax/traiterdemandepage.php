<?php
	session_start();
	$demande = 0;
	if(isset($_SESSION['visiteur'])){
		$demande = 1;
	}
	echo json_encode($demande); // Retourne la représentation JSON de cette valeur
?>
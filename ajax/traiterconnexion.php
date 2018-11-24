<?php
	session_start();
	require_once '../data/pdogsbrapports.php';
	$mdp = $_REQUEST['mdp'];
	$login = $_REQUEST['login'];
	$pdo = PdoGsbRapports::getPdo();
	$visiteur = $pdo->getLeVisiteur($login, $mdp);
	if ($visiteur != NULL){
		$_SESSION['visiteur'] = $visiteur;
		$_SESSION['visiteur']['mdp'] = $mdp;
		$_SESSION['visiteur']['login'] = $login;
	}
	echo json_encode($visiteur);
?>
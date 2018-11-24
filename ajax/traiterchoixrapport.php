<?php
 	session_start(); // Reprend la session existante
 	
 	if(isset($_SESSION['visiteur'])){
		require_once '../data/pdogsbrapports.php'; // Vérifie si le fichier a déjà été inclus
		$idRapport = $_REQUEST['idRapport']; // Récupère l'id du rapport
		$pdo = PdoGsbRapports::getPdo(); // Créer un nouvel objet PDO
		$rapport = $pdo->getLeRapport($idRapport); // Appelle cette fonction
		echo json_encode($rapport); // Retourne la représentation JSON de cette valeur

 	}else{
 		echo 0;
 	}
?>
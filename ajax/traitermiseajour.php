 <?php
 	session_start();
 	
 	if(isset($_SESSION['visiteur'])){
		require_once '../data/pdogsbrapports.php';
		$id = $_REQUEST['id'];
		$bilan = $_REQUEST['bilan'];
		$motif = $_REQUEST['motif'];
		$pdo = PdoGsbRapports::getPdo();
		$MSJ = $pdo->getMajRapport($id, $bilan, $motif);
		echo json_encode($MSJ);
	}else{
		echo 0;
	}
?>
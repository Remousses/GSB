 <?php
 	session_start();
 	if(isset($_SESSION['visiteur'])){
		require_once '../data/pdogsbrapports.php';
		$date = $_REQUEST['date'];
		$id = $_SESSION['visiteur']['id'];
		$pdo = PdoGsbRapports::getPdo();
		$lesVisites = $pdo->getLesVisitesUneDate($id, $date);
		echo json_encode($lesVisites);
	}else{
		echo 0;
	}
?>
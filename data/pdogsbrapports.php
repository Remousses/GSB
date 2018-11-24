<?php

/*
   Classe d'accès aux données. 

   Utilise les services de la classe PDO
   pour l'application Gsb Rapport Mobile
   Les attributs sont tous statiques,
   les 4 premiers pour la connexion
   $monPdo de type PDO 
   $monPdoGsbRapports qui contiendra l'unique instance de la classe
 */

class PdoGsbRapports{   		
      	 /*--------------------Version locale---------------------------------------- */

      private static $serveur = 'mysql:host=localhost';
      private static $bdd = 'dbname=gsbrapports';
      private static $user = 'root' ;
      private static $mdp = '' ;
      private static $monPdo;
      private static $monPdoGsbRapports = null;

/* Constructeur privé, crée l'instance de PDO qui sera sollicitée
   pour toutes les méthodes de la classe */				

	private function __construct(){
        self::$monPdo = new PDO(self::$serveur.';'.self::$bdd, self::$user, self::$mdp); 
        self::$monPdo->query("SET CHARACTER SET utf8");
	}
        
	public function _destruct(){
    	self::$monPdo = null;
	}

/* Fonction statique qui crée l'unique instance de la classe
   Appel : $instancePdoGsbRapports = PdoGsbRapports::getPdo();
   return l'unique objet de la classe PdoGsbRapports */

	public  static function getPdo(){
		if(self::$monPdoGsbRapports == null){
			self::$monPdoGsbRapports = new PdoGsbRapports();
		}
		return self::$monPdoGsbRapports;  
	}	
	
	// Connexion
	public static function getLeVisiteur($login, $mdp){
		$query = self::$monPdo->prepare('SELECT id, nom, prenom FROM visiteur WHERE login = :login AND mdp = :mdp'); // Fair cette requête
		$query->bindParam(':login', $login); // où le login égale le login en paremètre
		$query->bindParam(':mdp', $mdp); // où le mdp égale le mdp en paremètre
		$query->execute(); // On éxécute la requête
		
		$laLigne = $query->fetch(); // Récupère la ligne
		if (count($laLigne) > 1) { // Si le nombre de ligne est supérieur faire ceci
			return $laLigne; // Retourner la ligne
		}else{ // Sinon
			return null; // Retourner null
		}
		$query->closeCursor();
	}
	
	public static function getLesVisitesUneDate($id, $date){
		$query = self::$monPdo->prepare('SELECT rapport.id, medecin.nom, medecin.prenom FROM rapport,medecin WHERE rapport.date = :date and rapport.idMedecin = medecin.id AND rapport.idVisiteur = :id');
		$query->bindParam(':date', $date);
		$query->bindParam(':id', $id);
		$query->execute();
		
		$laLigne = $query->fetchAll();
		if (count($laLigne) >= 1) {
			return $laLigne;
		}else{
			return null;
		}
		$query->closeCursor();
	}
	
	public static function getLeRapport($idRapport){
		$query = self::$monPdo->prepare('SELECT id, motif, bilan, idMedecin FROM rapport WHERE id = :idRapport');
		$query->bindParam(':idRapport', $idRapport);
		$query->execute();
		
		$laLigne = $query->fetch();
		if (count($laLigne) >= 1) {
			return $laLigne;
		}else{
			return null;
		}
		$query->closeCursor();
	}
	
	public static function getMajRapport($id, $bilan, $motif){
		$MSJ = false;
		$query = self::$monPdo->prepare('UPDATE rapport SET motif = :motif, bilan = :bilan WHERE id = :id');
		$query->bindParam(':id', $id);
		$query->bindParam(':motif', $motif);
		$query->bindParam(':bilan', $bilan);
		
		if ($query->execute()){
			$MSJ = true;
		}
		return $MSJ;
		$query->closeCursor();
	}
	
	public static function getLesMedecins($nom){
		$query = self::$monPdo->prepare('SELECT id, nom, tel, prenom, adresse FROM medecin WHERE nom LIKE "' . $nom . '%" ORDER BY nom');
		$query->execute();
		
		$laLigne = $query->fetchAll();
		if (count($laLigne) >= 1) {
			return $laLigne;
		}else{
			return null;
		}
		$query->closeCursor();
	}
	
	public static function getMedecin($idMedecin){
		$query = self::$monPdo->prepare('SELECT id, nom, adresse, tel, specialitecomplementaire FROM medecin WHERE id=:idMedecin');
		$query->bindParam(':idMedecin', $idMedecin);
		$query->execute();
		
		$laLigne = $query->fetch();
		if (count($laLigne) >= 1) {
			return $laLigne;
		}else{
			return null;
		}
		$query->closeCursor();
	}
	
	public static function getMajMedecin($idMedecin, $adresse, $telephone, $spe_comp){
		$MSJ = false;
		$query = self::$monPdo->prepare('UPDATE medecin SET adresse = :adresse, tel = :telephone, specialitecomplementaire = :spe_comp WHERE id = :idMedecin');
		$query->bindParam(':idMedecin', $idMedecin);
		$query->bindParam(':adresse', $adresse);
		$query->bindParam(':telephone', $telephone);
		$query->bindParam(':spe_comp', $spe_comp);
	
		if ($query->execute()){
			$MSJ = true;
		}
		return $MSJ;
		$query->closeCursor();
	}
	
	public static function getLesRapports($idMedecin){
		$query = self::$monPdo->prepare('SELECT rapport.date, rapport.motif, rapport.bilan, visiteur.nom, visiteur.prenom FROM rapport, visiteur, medecin WHERE medecin.id = :idMedecin AND rapport.idMedecin = :idMedecin AND visiteur.id = rapport.idVisiteur');
		$query->bindParam(':idMedecin', $idMedecin);
		$query->execute();
	
		$laLigne = $query->fetchAll();
		if (count($laLigne) >= 1) {
			return $laLigne;
		}else{
			return null;
		}
		$query->closeCursor();
	}
	
	public static function getLesMedicaments($nomMedicament){
		$query = self::$monPdo->prepare('SELECT id, nomCommercial FROM medicament WHERE nomCommercial LIKE "' . $nomMedicament . '%" ORDER BY nomCommercial');
		$query->execute();
		$laLigne = $query->fetchAll();
		if (count($laLigne) >= 1) {
			return $laLigne;
		}else{
			return null;
		}
		$query->closeCursor();
	}
	
	public static function getNouveauRapport($date, $motif, $bilan, $idVisiteur, $idMedecin, $lesMedicaments){
		$MSJ = false;
		$queryMax = self::$monPdo->query('SELECT MAX(id) AS id_Max FROM rapport');
		$queryMax->execute();
		while ($donnees = $queryMax->fetch()) {
			$rep = $donnees['id_Max'] + 1;
	
			$query = self::$monPdo->prepare('INSERT INTO rapport (id, date, motif, bilan , idVisiteur, idMedecin) VALUES(' . $rep . ', "' . $date . '", "' . $motif . '", "' . $bilan . '", "' . $idVisiteur . '", "' . $idMedecin . '")');
		
			if ($query->execute()){
				$MSJ = true;
			}
			$query->closeCursor();
			
			if ($lesMedicaments != ''){
				for ($i = 0; $i < count($lesMedicaments); $i++){
					$queryMed = self::$monPdo->prepare('INSERT INTO offrir (idRapport, idMedicament, quantite) VALUES(' . $rep . ', "' . $lesMedicaments[$i]['id'] . '", ' . $lesMedicaments[$i]['qte'] . ')');
					$queryMed->execute();
					$queryMed->closeCursor();
				}
			}
		}	
		return $MSJ;
	}
	
	public static function getAjouterMedecin($nom, $prenom, $adr, $tel, $spe, $dep){
		$med = false;
		$queryMax = self::$monPdo->query('SELECT MAX(id) AS id_Max FROM medecin');
		$queryMax->execute();
		
		// erreur je ne sais où lors de l'enregistrement

		while ($donnees = $queryMax->fetch()) {
			$rep = $donnees['id_Max'] + 1;
			$queryMax->closeCursor();
			
			//$query = self::$monPdo->prepare('INSERT INTO medecin (id, nom, prenom, adresse, tel, specialitecomplementaire, departement) VALUES(' . $rep . ', "' . $nom .'", "' . $prenom .'", "' . $adr .'", "' . $tel .'", "' . $spe .'", ' . $dep .')');
			if ($nom == '' && $prenom == ''){
				$query = self::$monPdo->prepare('INSERT INTO medecin (id, nom, prenom, adresse, tel, specialitecomplementaire, departement) VALUES(' . $rep . ', "", "", :adr, :tel, :spe, :dep)');
			}elseif ($nom == ''){
				$query = self::$monPdo->prepare('INSERT INTO medecin (id, nom, prenom, adresse, tel, specialitecomplementaire, departement) VALUES(' . $rep . ', "", :prenom, :adr, :tel, :spe, :dep)');
				$query->bindParam(':prenom', $prenom);
			}elseif ($prenom ==''){
				$query = self::$monPdo->prepare('INSERT INTO medecin (id, nom, prenom, adresse, tel, specialitecomplementaire, departement) VALUES(' . $rep . ', :nom, "", :adr, :tel, :spe, :dep)');
				$query->bindParam(':nom', $nom);
			}else{
				$query = self::$monPdo->prepare('INSERT INTO medecin (id, nom, prenom, adresse, tel, specialitecomplementaire, departement) VALUES(' . $rep . ', :nom, :prenom, :adr, :tel, :spe, :dep)');
				$query->bindParam(':nom', $nom);
				$query->bindParam(':prenom', $prenom);
			}

			$query->bindParam(':adr', $adr);
			$query->bindParam(':tel', $tel);
			$query->bindParam(':spe', $spe);
			$query->bindParam(':dep', $dep);
			if ($query->execute()){
				$med = true;
			}
			$query->closeCursor();
		}
		return $med;
	}
}
?>
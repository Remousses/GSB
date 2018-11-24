<div data-role="page" id="ajouterMedecin">
	<?php 
		include 'enteteavecboutons.html';
	?>
	
	<div data-role="content">
		<div class="ui-field-contain">
			<h3>Ajouter un Medecin</h3>
			
			<label for="nomMedecin">Nom <span style="color: red;">*</span></label>
			<input type="text" name="nom" id="nom">
			<span id="nomManquant" style="font-size: 13px;"></span>
			<br />
			
			<label for="nomMedecin">Prénom <span style="color: red;">*</span></label>
			<input type="text" name="prenom" id="prenom">
			<span id="prenomManquant" style="font-size: 13px;"></span>
			<br />
			
			<label for="adr">Adresse</label>
			<input type="text" name="adr" id="adr">
			<span id="adrManquant" style="font-size: 13px;"></span>
			<br />
			
			<label for="tel">Téléphone</label>
			<input type="number" name="tel" id="tel">
			<span id="telManquant" style="font-size: 13px;"></span>
			<br />
			
			<label for="spe">Spécialité complémentaire</label>
			<input type="text" name="spe" id="spe">
			<span id="speManquant" style="font-size: 13px;"></span>
			<br />
			
			<label for="dep">Département</label>
			<span id="depManquant" style="font-size: 13px;"></span>
			<input type="number" name="dep" id="dep">
			<br />
			
			<span style="color: red;">*</span><span style="font-size: 13px;"> champs obligatoires</span>
			<br /><br />
			
			<input type="submit" id="btnEnregistrerMedecin" value="Enregistrer">
			
			<br />
			
			<div id="msg"></div>
		</div>
	</div>
	<?php
		include 'vues/piedpage.html';
	?>
</div>
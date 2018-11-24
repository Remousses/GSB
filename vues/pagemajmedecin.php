<div data-role="page" id="pagemajmedecin">
	<?php 
		include 'entetepagemajmedecin.html';
	?>
	<div data-role="content">
		<span id="med"></span>
		<br />
		<br />
		
		<label for="adr">Adresse</label>
		<input type="text" name="adresse" id="adresse" value="">
		<br />
		
		<label for="tel">Téléphone</label>
		<input type="text" name="telephone" id="telephone" value="">
		<br />
		
		<label for="nomMedecin">Spécialité complémentaire</label>
		<input type="text" name="spe_comp" id="spe_comp" value="">
		
		<br />
		<input type="submit" id="btnEnregistrerMajMedecin" value="Valider">
		
		<div id="msg"></div>
	</div>
	<?php 
		include 'piedpage.html';
	?>
</div>
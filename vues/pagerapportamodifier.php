<div data-role="page" id="rapportAModifier">
	<?php
		include 'enteteavecboutons.html';
	?>
	<div data-role="content">
		<input type="hidden" name="id" id="id" value="">
		<input type="hidden" name="idMedecin" id="idMedecin" value="" > 
		Médecin : <span id="medecin"></span>
		<br />
		<br />
		
		<label for="motif">Motif</label>
		<input type="text" name="motif" id="motif" value="" >
		<label for="bilan">Bilan</label>
		<input type="text" name="bilan" id="bilan" value="" >
		
		<br />
		<input type="submit" id="valider" value="Valider">
		
		<div id="msg"></div>
	</div>
	<?php
		include 'piedpage.html';
	?>
</div>
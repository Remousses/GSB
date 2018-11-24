<div data-role="page" id="pagemedecins">
	<?php 
		include 'entetepagemedecin.html';
	?>
	<div data-role="content">
		<div class="ui-field-contain">
			<label for="recherche">Rechercher un médecin</label>
			<ul id="listemedecins" class="ui-listview ui-listview-inset ui-corner-all ui-shadow" data-role="listview" data-filter-placeholder='Nom médecin ...' data-filter="true"></ul>
			<br />
			
			<label for="nomMedecin">Nom médecin</label>
			<input type="text" id="nom_medecin">
		</div>
	</div>
	<?php 
		include 'piedpage.html';
	?>
</div>
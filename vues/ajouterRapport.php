<div data-role="page" id="ajouterRapport">
	<div data-role="header" class="ui-bar ui-bar-a" style="text-align: center;">
		<a href="javascript:history.go(-1)" class="ui-btn ui-icon-back ui-btn-icon-notext ui-corner-all"></a><h1>Gestion des visites et des médecins</h1>
		<a href="#pageaccueil" class="ui-btn ui-icon-home ui-btn-icon-notext ui-corner-all"></a>
	</div>
	
	<div data-role="content">
		<div class="ui-field-contain">
			<h3>Ajouter un rapport</h3>
			
			<label for="recherche">Rechercher un médecin</label>
			<ul id="listemedecins" class="ui-listview ui-listview-inset ui-corner-all ui-shadow" data-role="listview" data-filter-placeholder='Nom médecin ...' data-filter="true"></ul>
			<br />
			
			<label for="nomMedecin">Nom médecin <span style="color: red;">*</span></label>
			<input type="text" id="nom_medecin">
			<span id="nom_med"></span>
			<br />
			
			<label for="motif">Motif</label>
			<textarea rows="4" cols="50" id="motif"></textarea>
			
			<label for="bilan">Bilan</label>
			<textarea rows="4" cols="50" id="bilan"></textarea>	
			
			<label for="date">Date <span style=" color: red;">*</span></label>
			<input type="date" name="date" id="date" value="">
			<span id="span_date"></span>
			
			<span style="color: red;">*</span><span style="font-size: 13px;"> champs obligatoires</span>
			<br /><br />
			
			<label for="lblmedicament">Médicaments offerts</label>
			<a href="#" data-role="button" id="btnajoutmedicament" data-inline="true">Nouveau médicament</a>
			<div id="lesListesMedicaments" class="ui-field-contain"></div>
			
			<input type="submit" id="btnEnregistrerRapport" value="Enregistrer">
			
			<br />
			
			<div id="msg"></div>
		</div>
	</div>
	<?php
		include 'vues/piedpage.html';
	?>
</div>
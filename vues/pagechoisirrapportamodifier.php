<div data-role="page" id="choisirRapportAModifier">
	<?php
		include 'enteteavecboutons.html';
	?>
	<div data-role="content">
		<h3>Choisir un rapport</h3>
		
		<label for="date">Date de la visite :</label>
		<input type="date" name="date" id="date" value="">
		<label for="champ" id="champ"></label>
		<br />
		<ul data-role="listview" id="listerapports"></ul>
	</div>
	<?php
		include 'piedpage.html';
	?>
</div>
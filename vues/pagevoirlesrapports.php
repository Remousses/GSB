<div data-role="page" id="voirlesrapports">
	<?php 
		include 'entetepagevoirrapports.html';
	?>
	<div id="u" data-role="content">
		<table data-role="table" id="table" data-mode="columntoggle" class="ui-responsive table-stroke table-stripe" data-column-btn-text="Colonne à afficher ...">
			<thead>
				<tr class="ui-bar-d">
					<th>Date</th>
					<th data-priority="2">Motif</th>
					<th data-priority="1">Bilan</th>
					<th data-priority="3">Visiteur</th>
				</tr>
			</thead>

			
			<tbody id="tbody"></tbody>
		</table>
		
		<span id="rien"></span>
	</div>
	<?php 
		include 'piedpage.html';
	?>
</div>
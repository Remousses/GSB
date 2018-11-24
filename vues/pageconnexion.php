<div data-role="page" id="pageconnexion">
	<?php 
		include_once 'entetepage.html';
	?>
	<div data-role="content" id="divconnexion" style="text-align: center;">
		<?php 
			include_once 'logo.html';
		?>
		
		<div class="ui-fiel-contain">
			<label for="login"> Login </label>
			<input type="text" name="login" id="login" value="" size="15px"/>
			<label for="mdp"> Mot de passe </label>
			<input type="password" name="mdp" id="mdp" value="" size="15px"/>
		</div>
		
		<div id="message"></div>
		
		<p>
			<a href="#" data-role="button" id="btnconnexion" data-inline="true"> Connexion </a>
		</p>
	</div>
</div>
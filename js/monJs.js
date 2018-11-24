$(function(){
	// Page de connexion 
	$('#pageconnexion #btnconnexion').bind("click", function(e){ // Lors du clic sur le bouton de connexion 
		e.preventDefault(); // Annule l'évènement s'il est annulable, sans stopper sa propagation 
		var mdp = $("#pageconnexion #mdp").val(); // Récupère la valeur du mot de passe 
		var login = $("#pageconnexion #login").val(); // Récupère la valeur du login 
		$.post("ajax/traiterconnexion.php", { // Lance cette fonction ajax 
			"mdp" : mdp,
			"login" : login },
			foncRetourConnexion, "json");
	});
	
	function foncRetourConnexion(data){
		if(data != null){ // Si bon mot de passe et login faire ceci 
			$.mobile.changePage("#pageaccueil"); // Renvoie sur cette page 
		}else{ // Sinon 
			$("#pageconnexion #message").css({color: 'red'}); // En rouge 
			$("#pageconnexion #message").html("Erreur de logion et/ou mot de passe"); // Ecrire ça 
		}
	}
	
	$('#choisirRapportAModifier #date').bind("change", function(e){ // Lors de l'insertion d'une date 
		var date = $("#choisirRapportAModifier #date").val(); // Récupère la valeur de la date 
		$("#choisirRapportAModifier #champ").html("Visites effectuéees le : " + date + " chez les médecins :"); // Ecrit la date dans le champ correspondant 
		$.post("ajax/traiterlesvisitesunedate.php", { // Lance cete fonction ajax 
			"date" : date},
			foncRetourListeRapports, "json");
	});
	
	function foncRetourListeRapports(lesVisites){
		$("#choisirRapportAModifier #listerapports").empty(); // Vider la liste
		if(lesVisites != null){
			for (var i = 0; i < lesVisites.length; i++){
				var unRapport = lesVisites[i];
				var id = unRapport['id']; // Récupère l'id du médecin 
				var nom = unRapport['nom']; // Récupère le nom du médecin 
				var prenom = unRapport['prenom']; // Récupère le prénom du médecin 
				var html = "<li id=" + id + "><a href=''>" + nom + " " + prenom + "</a></li>";
	
				$("#choisirRapportAModifier #listerapports").append(html); // Permet d'écrire le code html de la variable html dans le champ indiqué 
				$("#choisirRapportAModifier #listerapports").listview('refresh'); // Rafraichi la liste 
			}
		}
	}
	
	$("#choisirRapportAModifier #listerapports").on("click", "li", function(e){ // Lors du clic sur un nom de médecin 
		var idRapport = $(this).attr("id"); // Récupère l'id de la liste 
		window.idRapport = idRapport;
		var medecin = $(this).text(); // Récupère le nom du médecin 
		window.medecin = medecin;
		$.post("ajax/traiterchoixrapport.php", { // Lance cette fonction ajax 
			"idRapport" : idRapport},
			foncRetourChoixRapport, "json");
	});
	
	function foncRetourChoixRapport(rapport){
		if(rapport != null){
			$.mobile.changePage("#rapportAModifier"); // Renvoie sur cette page 
			var bilan = rapport['bilan']; // Récupère le bilan correspondant 
			var motif = rapport['motif'];  // Récupère le motif correspondant 
			var idMedecin = rapport['idMedecin']; // Récupère l'id du médecin correspondant 
			var id = rapport['id']; // Récupère l'id correspondant 
			$("#rapportAModifier #medecin").text(medecin); // Ecrit le nom du médecin 
			$('#rapportAModifier #bilan').val(bilan); // Ecrit la valeur du bilan 
			$('#rapportAModifier #motif').val(motif); // Ecrit la valeur du motif 
			$('#rapportAModifier #idMedecin').val(idMedecin); // Ecrit la valeur de l'id du médecin 
			$('#rapportAModifier #id').val(id); // Ecrit la valeur de l'id
		}
	}

    $("#rapportAModifier #valider").click(function(e){ // Lors du clic sur valider 
    	var id = $("#rapportAModifier #id").val(); // Récupère la valeur de ce champ 
    	var bilan = $("#rapportAModifier #bilan").val(); // Récupère la valeur de ce champ 
    	var motif = $("#rapportAModifier #motif").val(); // Récupère la valeur de ce champ 
        e.preventDefault(); // Annule l'évènement s'il est annulable, sans stopper sa propagation 
		$.post("ajax/traitermiseajour.php", { // Lance cette fonction ajax 
			"id" : id,
			"bilan" : bilan,
			"motif" : motif },
			foncRetourMajRapport, "json");
    });
    
    function foncRetourMajRapport(MSJ){ 
    	if(MSJ != null){ // Si la mise à jour à été effectuée faire ceci 
    		alert("La mise à jour à bien été effectuée"); // Afficher une boite de dialogue qui confirme la mise à jour 
			$.mobile.changePage("#choisirRapportAModifier"); // Renvoie sur cette page 
		}else{ // Sinon 
			$("#rapportAModifier #msg").css({color: 'red'}); // En rouge 
			$("#rapportAModifier #msg").html("Erreur lors de la modification \nVeuillez réessayer"); // Ecrire ça 
		}
    }
    
    $("#pagemedecins #listemedecins").on("filterablebeforefilter", function (e, data){
    	$("#pagemedecins #listemedecins").empty(); // Vide la liste 
    	var nom = $(data.input).val(); // Récupère le champ
    	if(nom.length >= 1){ // Si la longueur du nom est supérieur ou égale à 1 faire ceci
		$.post("ajax/traiterrecherchemedecins.php", { // Lancement de cette fonction ajax 
			"nom" : nom },
			foncRetourRecherchePageMedecins, "json");
    	}
    });
    
    function foncRetourRecherchePageMedecins(reponse){
    	if(reponse != null){
		    for(var i = 0; i < reponse.length; i++){
		    	var rep = reponse[i];
		    	var id = rep['id']; // Récupère l'id du médecin 
				var nom = rep['nom']; // Récupère le nom du médecin 
				var prenom = rep['prenom']; // Récupère le prénom du médecin 
				var adresse = rep['adresse']; // Récupère l'adresse du médecin 
				var tel = rep['tel']; // Récupère le téléphone du médecin 
		        var html = "<li id=" + id + "><input type='hidden' value='" + tel + "'/><a href=''>" + nom + " " + prenom + " " + adresse + "</a></li>";
		        $("#pagemedecins #listemedecins").append(html); // Permet d'écrire le code html de la variable html dans le champ indiqué 
			    $("#pagemedecins #listemedecins").listview('refresh'); // Rafraichi la liste 
			    $("#pagemedecins #listemedecins").trigger('updatelayout'); //  
		    }
    	}
    }
    
    $("#pagemedecins #listemedecins").on("click", "li", function(e){ // Lors du clic sur le médecin 
    	var idMedecin = $(this).attr("id"); // Récupère son id 
    	window.idMedecin = idMedecin;
    	var medecin = $(this).text(); // Récupère la valeur 
    	window.medecin = medecin;
    	$("#pagemedecins #nom_medecin").val(medecin); // Ecrit cette valeur 
    	$("#pagemedecins #listemedecins").listview('refresh'); // Rafraichi la liste
    	$("#pagemedecins #listemedecins").empty(); // Vide la liste 
    });
    
    $("#pagemedecins #btnMajMedecin").on("click", function(e){ // Lors du clic sur ce bouton
    	btnMajMedecin(e);
    });

    $("#voirlesrapports #btnMajMedecin").on("click", function(e){ // Lors du clic sur ce bouton
    	btnMajMedecin(e);
	});
	
	function btnMajMedecin(e){
		if($("#pagemedecins #nom_medecin").val() == ""){ // Si le champ du nom de médecin est vide faire ceci 
    		alert("Le champ du médecin est vide"); // Affiche une boite de dialogue qui indique que c'est vide 
    		e.preventDefault(); // Annule l'évènement s'il est annulable, sans stopper sa propagation 
    	}else{ // Sinon 
    		$.post("ajax/traitergetmedecin.php", { // Lance cette fonction ajax 
    			"idMedecin" : idMedecin },
    			foncRetourGetMedecin, "json");
    	}
	}
    
    function foncRetourGetMedecin(data){
    	$.mobile.changePage("#pagemajmedecin"); // Renvoie sur cette page 
    	if(data != null){
	    	var med = data['nom']; // Récupère le nom du médecin sélectionné 
	    	var adresse = data["adresse"]; // Récupère l'adresse du médecin sélectionné 
	    	var telephone = data["tel"]; // Récupère le numéro de téléphone du médecin sélectionné 
	    	var spe_comp = data["specialitecomplementaire"]; // Récupère la spécialité complémentaire du médecin sélectionné 
	    	$("#pagemajmedecin #med").text(med); // Ecrit son nom dans ce champ 
	    	$("#pagemajmedecin #adresse").val(adresse); // Ecrit son adresse dans ce champ 
	    	$("#pagemajmedecin #telephone").val(telephone); // Ecrit son numéro de téléphone dans ce champ 
	    	$("#pagemajmedecin #spe_comp").val(spe_comp); // Ecrit sa spécilaité complémentaire dans ce champ
    	}
    }
    
    $("#pagemajmedecin #btnEnregistrerMajMedecin").bind("click", function(e){
    	var adresse = $("#pagemajmedecin #adresse").val();
    	var telephone = $("#pagemajmedecin #telephone").val();
    	var spe_comp = $("#pagemajmedecin #spe_comp").val();
    	e.preventDefault();
    	$.post("ajax/traitermajmedecin.php", {
    		"idMedecin" : window.idMedecin,
    		"adresse" : adresse,
			"telephone" : telephone,
			"spe_comp" : spe_comp },
			foncRetourMajMedecin, "json");
    });
    
    function foncRetourMajMedecin(MSJ){
    	if(MSJ != false){ // Si la mise à jour à été effectuée faire ceci 
    		alert("Le médecin à bien été modifié"); // Afficher une boite de dialogue qui confirme la mose à jour 
			$.mobile.changePage("#pagemedecins"); // Renvoie sur cette page 
		}else{ // Sinon 
			$("#pagemajmedecin #msg").css({color: 'red'}); // En rouge 
			$("#pagemajmedecin #msg").html("Erreur lors de la modification \nVeuillez réessayer"); // Ecrire ça 
		}
    }   
    
    $("#pagemedecins #btnVoirRapports").on("click", function(e){ // Lors du clic sur ce bouton 
    	btnVoirRapports(e);
    });

    $("#pagemajmedecin #btnVoirRapports").bind("click", function(e){ // Lors du clic sur ce bouton 
    	btnVoirRapports(e);
	});
	
	function btnVoirRapports(e){
		if($("#pagemedecins #nom_medecin").val() == ""){ // Si le champ du nom de médecin est vide faire ceci 
    		alert("Le champ du médecin est vide"); // Affiche une boite de dialogue qui indique que c'est vide 
    		e.preventDefault(); // Annule l'évènement s'il est annulable, sans stopper sa propagation 
    	}else{ // Sinon 
    		$.post("ajax/traitergetlesrapports.php", { // Lance cette fonction ajax 
    			"idMedecin" : window.idMedecin },
    			foncRetourGetLesRapports, "json");
    	}
	}
    
    function foncRetourGetLesRapports(data){
    	$("#voirlesrapports #tbody").empty(); // Vide la liste 
		var html = "";
    	if(data != null){
	    	$.mobile.changePage("#voirlesrapports"); // Renvoie sur cette page
	    	for(var i = 0; i < data.length; i++){
		    	var rep = data[i];
		    	var date = rep['date']; // Récupère la date
				var motif = rep['motif']; // Récupère le motif 
				var bilan = rep['bilan']; // Récupère le bilan 
				var nom = rep['nom']; // Récupère le nom
				var prenom = rep['prenom']; // Récupère le prénom 
		        html = "<tr class='ui-bar-d'><td>" + date + "</td><td>" + motif + "</td><td>" + bilan + "</td><td>" + nom + " " + prenom + "</td></tr>";
		    }
		}else{
			html = "<tr class='ui-bar-d'><td>Aucune données</td><td>Aucune données</td><td>Aucune données</td><td>Aucune données</td></tr>";
		}
		
		$("#voirlesrapports #tbody").append(html); // Permet d'écrire le code html de la variable html dans le champ indiqué 
		$("#voirlesrapports #table").table('refresh'); // Rafraichi la table
    }

    $("#pagemedecins #listemedecins").on("click", "li", function(e){
    	var numeroTel = $(this).find("input:hidden").val();
    	var html = "<a href='" + numeroTel + "' id='btnAppeler' class='ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-grid'>Appeler</a>";
    	$("#voirlesrapports #btnAppeler").append(html);
    	$("#pagemajmedecin #btnAppeler").append(html);
    });
    
    $("#ajouterRapport #listemedecins").on("filterablebeforefilter", function (e, data){
    	$("#ajouterRapport #listemedecins").empty(); // Vide la liste 
    	var nom = $(data.input).val(); // Récupère le champ
    	if(nom.length >= 1){ // Si la longueur du nom est supérieur ou égale à 1 faire ceci
			$.post("ajax/traiterrecherchemedecins.php", { // Lancement de cette fonction ajax 
				"nom" : nom },
				foncRetourRechercheAjouterRapport, "json");
    	}
    });
    
    function foncRetourRechercheAjouterRapport(reponse){
    	if(reponse != null){
		    for(var i = 0; i < reponse.length; i++){
		    	var rep = reponse[i];
		    	var id = rep['id']; // Récupère l'id du médecin 
				var nom = rep['nom']; // Récupère le nom du médecin 
				var prenom = rep['prenom']; // Récupère le prénom du médecin 
				var adresse = rep['adresse']; // Récupère l'adresse du médecin 
				var tel = rep['tel']; // Récupère le téléphone du médecin 
		        var html = "<li id=" + id + "><input type='hidden' value='" + tel + "'/><a href=''>" + nom + " " + prenom + " " + adresse + "</a></li>";
		        $("#ajouterRapport #listemedecins").append(html); // Permet d'écrire le code html de la variable html dans le champ indiqué 
			    $("#ajouterRapport #listemedecins").listview('refresh'); // Rafraichi la liste 
			    $("#ajouterRapport #listemedecins").trigger('updatelayout'); //  
		    }
    	}
    }
    
    $("#ajouterRapport #listemedecins").on("click", "li", function(e){ // Lors du clic sur le médecin
    	var idMede = $(this).attr("id"); // Récupère son id 
    	window.idMede = idMede;
    	var medecin = $(this).text(); // Récupère la valeur 
    	window.medecin = medecin;
    	$("#ajouterRapport #nom_medecin").val(medecin); // Ecrit cette valeur
    	$("#ajouterRapport #listemedecins").empty(); // Vide la liste 
    });

    $("#ajouterRapport #btnajoutmedicament").bind("click", function(){
    	if (window.nbMedicaments == null){
    		window.nbMedicaments = 1;
    	}else{
    		window.nbMedicaments ++;
    	}
    	var i = window.nbMedicaments;
    	var html = "<div class=ui-field-contain>";
    	html += "<ul id='listeMedicaments" + i + "' data-role='listview' ";
    	html += "data-filter-theme='a' data-filter-placeholder='Nom médicament ...' data-filter='true' data-inset='true'></ul>";
    	html += "<input name='nom_medicament' id='nom_medicament" + i + "' type='text' value=''/>";
    	html += "<input name='id_Medoc' id='id_Medoc" + i + "' type='hidden' value=''/>";
    	html += "<label for='nb'>Indiquer le nombre d\'exemple offerts :</label>";
    	html += "<div class='ui-slider'>";
    	html += "<input id='quantite" + i + "' type='range' id='slider-fill' value='1' min='0' max='10' data-highlight='true'/></div><br /></div>";
    	$("#ajouterRapport #lesListesMedicaments").append(html);
    	$("#ajouterRapport #lesListesMedicaments").trigger("create");
    	
    });

    $("#ajouterRapport #lesListesMedicaments").on("filterablebeforefilter", "ul", function (e, data){
    	var idul = e.currentTarget.id;
    	window.ul = idul;
    	$("#ajouterRapport #" + idul).empty(); // Vide la liste
    	var nommedicament = $(data.input).val(); // Récupère le champ
    	if(nommedicament && nommedicament.length >= 1){ //  la longueur du nom est supérieur ou égale à 1 faire ceci
		$.post("ajax/traiterrecherchemedicaments.php", { // Lancement de cette fonction ajax 
			"nommedicament" : nommedicament },
			foncRetourRechercheMedicaments, "json");
    	}
    });
    
    function foncRetourRechercheMedicaments(reponse){
    	if(reponse != null){
		    for(var i = 0; i < reponse.length; i++){
		    	var rep = reponse[i];
		    	var id = rep['id']; // Récupère l'id du médecin
				var nomCommercial = rep['nomCommercial']; // Récupère le nom du médecin
		        var html = "<li id=" + id + "><a href=''>" + nomCommercial + "</a></li>";
		        $("#ajouterRapport #" + window.ul).append(html); // Permet d'écrire le code html de la variable html dans le champ indiqué 
			    $("#ajouterRapport #" + window.ul).listview('refresh'); // Rafraichi la liste
			    $("#ajouterRapport #" + window.ul).trigger('updatelayout'); // 
		    }
    	}
    }
    
    $("#ajouterRapport #lesListesMedicaments").on("click", "li", function(e){ // Lors du clic sur le médecin
    	var lesMedicaments = [];
    	for(var i = 0; i < window.nbMedicaments; i++){
			var idMedi = $(this).attr("id"); // Récupère son id
			window.idMedi = idMedi;
			var unMedicament = {id : idMedi};
			lesMedicaments.push(unMedicament);
		}
    	var idli = $("#ajouterRapport #" + window.ul).attr("id");
    	var sub = idli.substring(idli.length - 1, idli.length + 1);
    	$("#ajouterRapport #" +  window.ul).empty(); // Vide la liste 
    	var medicament = $(this).text(); // Récupère la valeur 
    	window.medicament = medicament;
    	$("#ajouterRapport #nom_medicament" + sub).val(medicament); // Ecrit cette valeur
    	var id_Medoc = $(this).attr("id"); // Récupère la valeur
    	window.id_Medoc = id_Medoc;
    	$("#ajouterRapport #id_Medoc" + sub).val(id_Medoc); // Ecrit cette valeur
    });
    
     $("#ajouterRapport #btnEnregistrerRapport").bind("click", function(){
    	 var nom = $("#ajouterRapport #nom_medecin").val(); // Récupère la valeur de ce champ 
		 var bilan = $("#ajouterRapport #bilan").val(); // Récupère la valeur de ce champ 
		 var motif = $("#ajouterRapport #motif").val(); // Récupère la valeur de ce champ 
		 var date = $("#ajouterRapport #date").val(); // Récupère la valeur de ce champ 
		 var lesMedi = [];
    	 if (window.idMede != null && window.idMede != undefined && date != ""){
			 if(window.nbMedicaments != null){
				 for(var i = 0; i < window.nbMedicaments; i++){fCONSO
					 var x = i + 1;
					 var idMedicament = $("#ajouterRapport #id_Medoc" + x).val();
					 var laQte = $("#ajouterRapport #quantite" + x).val(); // Récupère la valeur de ce champ 
		             // Ne prend que le dernier ... (il faudrais cumuler unMedicament avec une variable)
					 var unMedicament = {id : idMedicament, qte : laQte};
					 if(idMedicament != ""){
						 lesMedi.push(unMedicament);
					 }
				 }
			 }else{
				 lesMedi = null;
			 }
			 
			$.post("ajax/traiternouveaurapport.php", { // Lance cette fonction ajax 
				"idMed" : window.idMede,
				"nom" : nom,
				"bilan" : bilan,
				"motif" : motif,
				"date" : date,
				"lesMedicaments" : lesMedi },
				foncRetourNouveauRapport, "json");
			$("#ajouterRapport #nom_med").css({display: 'none'}); // En rouge
			$("#ajouterRapport #span_date").css({display: 'none'}); // En rouge
    	 }else if(window.idMede == null || window.idMede != undefined || date == ""){
			if(window.idMede == null || window.idMede != undefined){
				$("#ajouterRapport #nom_med").css({color: 'red'}); // En rouge
				$("#ajouterRapport #nom_med").html("Le nom du médecin est obligatoire"); // Ecrire ça
			}
			
			if(date == ""){
				$("#ajouterRapport #span_date").css({color: 'red'}); // En rouge
				$("#ajouterRapport #span_date").html("Le date est obligatoire<br>"); // Ecrire ça
			}
		 }		 
     });
     
     function foncRetourNouveauRapport(MSJ){		 
     	if(MSJ != false){ // Si l'enregistrement à été effectuée faire ceci 
     		alert("L'enregistrement à bien été effectuée"); // Afficher une boite de dialogue qui confirme l'enregistrement 			
			$.mobile.changePage("#pagevisites"); // Renvoie sur cette page 
			// Vide le texte
			$("#ajouterRapport #listemedecins").empty(); 
			$("#ajouterRapport #nom_medecin").val("");
			$("#ajouterRapport #bilan").val("");
			$("#ajouterRapport #motif").val("");
			$("#ajouterRapport #date").val("");
 		}else{ // Sinon 
 			$("#ajouterRapport #msg").css({color: 'red'}); // En rouge 
 			$("#ajouterRapport #msg").html("Erreur lors de la modification. Veuillez réessayer"); // Ecrire ça 
 		}
     }
     
     $(document).on("pageinit", function(e){
    	 var page = window.location.hash.substr(1);
    	 if(page != ""){
    		 $.get("ajax/traiterdemandepage.php", foncRetourConnecte);
    	 }
     });
     
     function foncRetourConnecte(demande){
    	 if(demande != 1){
    		 $.mobile.changePage("#"); // Renvoie sur  cette page
    	 }
     }
     
     $("#ajouterMedecin #btnEnregistrerMedecin").bind("click", function(e){
    	 var nom = $("#ajouterMedecin #nom").val(); // Récupère la valeur de ce champ 
		 var prenom = $("#ajouterMedecin #prenom").val(); // Récupère la valeur de ce champ 
		 var adr = $("#ajouterMedecin #adr").val(); // Récupère la valeur de ce champ 
		 var tel = $("#ajouterMedecin #tel").val(); // Récupère la valeur de ce champ 
		 var spe = $("#ajouterMedecin #spe").val(); // Récupère la valeur de ce champ 
		 var dep = $("#ajouterMedecin #dep").val(); // Récupère la valeur de ce champ 

		 if(nom == '' || prenom == ''){
			if(prenom == ''){
				$("#ajouterMedecin #prenomManquant").css({color: 'red'}); // En rouge 
				$("#ajouterMedecin #prenomManquant").html("Le prenom est obligatoire"); // Ecrire ça
			}
			
			if(nom == ''){
				$("#ajouterMedecin #nomManquant").css({color: 'red'}); // En rouge 
				$("#ajouterMedecin #nomManquant").html("Le nom est obligatoire"); // Ecrire ças
			}
		 }else{
			$.post("ajax/traiterajoutmedecin.php", { // Lancement de cette fonction ajax 
				"nom" : nom,
				"prenom" : prenom,
				"adr" : adr,
				"tel" : tel,
				"spe" : spe,
				"dep" : dep },
				foncRetourAjouterMedecin, "json");
		 }
     });
     
     function foncRetourAjouterMedecin(med){
		 if(med == true){ // Si l'enregistrement à été effectuée faire ceci 
			alert("L'enregistrement à bien été effectuée");
			$.mobile.changePage("#pagevisites"); // Renvoie sur cette page 
			// Vide le texte
			$("#ajouterMedecin #nom").val("");
			$("#ajouterMedecin #prenom").val("");
			$("#ajouterMedecin #adr").val("");
			$("#ajouterMedecin #tel").val("");
			$("#ajouterMedecin #spe").val("");
			$("#ajouterMedecin #dep").val("");
		}else{ // Sinon 
			$("#ajouterMedecin #msg").css({color: 'red'}); // En rouge 
			$("#ajouterMedecin #msg").html("Erreur lors de l'enregistrement"); // Ecrire ça 
		}
	  }
});
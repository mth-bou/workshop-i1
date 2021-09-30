;
/*  Version Test  */
/*  /fr/banques/particuliers/credits/CIC-auto/json.html              */
/*   est une page avec l'appli CB02_ACFSIMULWEB           */
/*  avec param  ?cb02module=tuiacc qui retourne un json      */
/*    */
/*  /fr/banques/particuliers/credits/CIC-auto/visuel.html              */
/*   est une page avec l'appli CB02_ACFSIMULWEB           */
/*  avec param  ?cb02module=imgveh qui retourne l'image      */
/*    */
/*  /fr/banques/particuliers/credits/CIC-auto/appli-cb02.cgi              */
/*   est une page avec l'appli CB02_ACFSIMULWEB           */
/*  sans param        */
/*  	
variables typées number
	prix_remise
	remise
	loyer
	kilometrage
	nb_loyer
	duree
	apport
	   */
/*    */
/*    */
/*    */

/* =================== Tuile CIC Auto ============================ */
(function() {
    function initTileAuto(e) {
    	var urlAppli="/fr/webservices/CB02/ws.cgi";
		$.ajax({
			type: 'GET',
			url: urlAppli+'?cb02module=tuiacc',
			dataType: 'json',
			success: function(data) {
//console.log(data.offresMois.length);
				if(data) {
					var v, conditions, loyer, mention, bouton, flexdiv;
					var v = data.offresMois[0];
					
					$("#offreAutoDuMoisModele").html( 'Par exemple&nbsp;: '+v.marque+' '+v.modele+'</strong> '+v.finition );
					
					conditions = $('#offreAutoDuMoisConditions');

					loyer = document.createElement("p");
					loyer.className = 'price';
					var aff_prix_remise=v.prix_remise.toLocaleString().replace(" ", "&nbsp;");
					var aff_remise=v.remise.toLocaleString().replace(" ", "&nbsp;");
					if (Number(aff_remise) == 0) {
						loyer.innerHTML = 'En location &agrave; partir de <strong>'+v.financement.loyer.toLocaleString()+'&nbsp;&euro; <span><abbr>TTC</abbr>/mois</span></strong>'+'<span class="soft">Prix&nbsp;: '+aff_prix_remise+'&nbsp;&euro;';
					} else {
						loyer.innerHTML = 'En location &agrave; partir de <strong>'+v.financement.loyer.toLocaleString()+'&nbsp;&euro; <span><abbr>TTC</abbr>/mois</span></strong>'+'<span class="soft">Prix remis&eacute;&nbsp;: '+aff_prix_remise+'&nbsp;&euro; (remise de '+aff_remise+'&nbsp;&euro;)';
					}
					conditions.append(loyer);
					mention = document.createElement("p");
					mention.className = "legal";
					mention.innerHTML = 'Visuel non contractuel';
					conditions.append(mention);

					var figureContainer = $("#offreAutoDuMoisFigure");
					var image;
					image = document.createElement("img");
					image.src = urlAppli+'?cb02module=imgveh&cb02imgguid='+v.photo_internet;
					image.alt = '';
					figureContainer.append(image);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log('error: ' + textStatus + ': ' + errorThrown);
			}
		});

    }
    $(document).ready(initTileAuto);
})();

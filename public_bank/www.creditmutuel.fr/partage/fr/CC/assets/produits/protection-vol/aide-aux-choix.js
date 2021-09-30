;

/* =================== Aide au choix Protection Vol ============================ */
(function() {

	var slidesHeight = 0;
	var UserStatus;
	var simulationExiste = false;
	var sliderContainer = $("section#quiz");
	var slider = sliderContainer.find('.slider');
	var sliderInner = slider.find('.slider-inner');
	var nbSlides = sliderInner.children().length;
	var nSlide = 1;
    var sliderHeight = slider.outerHeight(false);
    var sliderInnerHeight = sliderInner.outerHeight(true);
	var slidesHeight = 0;

	$.ajaxSetup({ cache: false });

	// Fonction permettant d'appeler le webservice EPS pour enregistrer une simulation
    function SaveSimul(typeHabitation,natureOccupant,intervention,protectionAgression,protectionIncendie,protectionMonoxydeCarbone) {
		var url = "/fr/webservices/EPS/Enregistrer.cgi";
		//console.log("SaveSimul url: " + url);
    	var data = JSON.stringify({"typeHabitation": typeHabitation, "natureOccupant": natureOccupant, "intervention": intervention, "protectionAgression": protectionAgression, "protectionIncendie": protectionIncendie, "protectionMonoxydeCarbone": protectionMonoxydeCarbone});
		//console.log("SaveSimul data: " + data);
		$.ajax({
			type: "POST",
			async: false,
			url: url,
			data: data,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(retour) {
			},
			error: function(xhr, status, errorThrown){
			},
			complete: function(data,res){
				var coderetour = data.codeRetour;
				if (coderetour == -1) {
					var messageErreur = data.messageErreur;
					//console.log("Erreur:" + messageErreur);
				}
				$('#btnSaveSimul').hide();
				$('#result .actions').prepend('<p class="msg info" a>Votre simulation a bien &eacute;t&eacute; sauvegard&eacute;e</p>');

				// Analytics
				//console.log("SaveSimul Analytics: " + 'sauvegarder');
				dataLayer.push({'customCategory':'Technique', 'customAction':'PageVirtuelle', 'customLabel':'sauvegarder','event':'customEvent'});

			}
		});
    }

    // Fonction permettant d'appeler le webservice EPS pour rÃ©cuperer une simulation
    function GetSimul() {

		// Webservice UserStatus
		var url = "/fr/webservices/UserStatus.cgi"
		jQuery.get( url )
		.done(function( datajsonUS ) {
			UserStatus = datajsonUS.status;

			if (UserStatus == "authentifie") {

				url = "/fr/webservices/EPS/Afficher.cgi";
				//console.log("GetSimul url: " + url);
				$.ajax({
					type: "GET",
					async: false,
					url: url,
					success: function(retour) {
					//console.log("Donnees renvoyees par le Webservice :" + retour);
					},
					error: function(xhr, status, errorThrown){
					},
					complete: function(data,res){
						rep = jQuery.parseJSON(data.responseText);
						//console.log("Simulation?");
						//console.log(rep.reponse.simulationExiste);
						if (rep.reponse.simulationExiste) {

							// Il existe bien une simulation

							simulationExiste = true;
							simul = rep.reponse.simulation.questionnaire;

							if ( simul.typeHabitation == "APPARTEMENT" ) {
								$("input[name=amcRdStep1][value=1]").prop('checked', true);
							} else {
								$("input[name=amcRdStep1][value=2]").prop('checked', true);
							}
							$("button#INPNext1").attr('disabled', false);
							if ( simul.natureOccupant == "LOCATAIRE" ) {
								$("input[name=amcRdStep2][value=1]").prop('checked', true);
							} else {
								$("input[name=amcRdStep2][value=2]").prop('checked', true);
							}
							$("button#INPNext2").attr('disabled', false);
							if ( simul.intervention == "INTERVENTION" ) {
								$("input[name=amcRdStep3][value=1]").prop('checked', true);
							} else {
								$("input[name=amcRdStep3][value=2]").prop('checked', true);
							}
							$("button#INPNext3").attr('disabled', false);
							if ( simul.protectionAgression ) {
								$("input[name=amcRdStep4][value=1]").prop('checked', true);
							} else {
								$("input[name=amcRdStep4][value=2]").prop('checked', true);
							}
							$("button#INPNext4").attr('disabled', false);
							if ( simul.protectionIncendie ) {
								$("input[name=amcRdStep5][value=1]").prop('checked', true);
							} else {
								$("input[name=amcRdStep5][value=2]").prop('checked', true);
							}
							$("button#INPNext5").attr('disabled', false);
							if ( simul.protectionMonoxydeCarbone ) {
								$("input[name=amcRdStep6][value=1]").prop('checked', true);
							} else {
								$("input[name=amcRdStep6][value=2]").prop('checked', true);
							}

							sliderInner.children('#slide1').attr("aria-hidden","true").attr("tabindex","-1").find("input").attr("tabindex","-1");
							sliderInner.animate({
								marginTop: "-="+(slidesHeight*5)+"px"
							}, "slow", function() {
								nSlide=6;
								sliderContainer.data("nSlide",nSlide);
								sliderContainer.find('progress').attr('value', (nSlide) );
								sliderContainer.find('progress div').width(((nSlide)*(100/6))+'%');

							});

							$("button#INPSubmit6").attr('disabled', false).click();

							// Analytics
							//console.log("GetSimul Analytics: " + 'recuperer-sauvegarde');
							dataLayer.push({'customCategory':'Technique', 'customAction':'PageVirtuelle', 'customLabel':'recuperer-sauvegarde','event':'customEvent'});

						}
					}
				});
			}
		});
    }


    // Initialisation du slider de l'aide au choix
    function initSlider(e) {
    	
    	$.ajaxSetup({ cache: false });

		sliderContainer.data("nSlide",1);

		sliderInner.children().each(function(i){
			if ($(this).height() > slidesHeight) slidesHeight = $(this).height();
			if (i==0) {
				$(this).attr("tabindex","0");
				$(this).find('input[type=radio]').attr("tabindex","0");
			} else {
				$(this).attr("tabindex","-1").find("a").attr("tabindex","-1");
				$(this).find('input[type=radio]').attr("tabindex","-1");
				$(this).find('[name=INPPrev]').attr("tabindex","-1");
				$(this).attr("aria-hidden","true");
			}

			// Gestion des boutons
			if ( (i+1) == (nbSlides-1) ) {
				$(this).find('button#INPSubmit'+(i+1)).attr('disabled', true);
				$(this).find('input[type=radio]').change(function() {
					sliderInner.find('button#INPSubmit'+(i+1)).attr('disabled', false).focus();
				});
			} else {
				$(this).find('button#INPNext'+(i+1)).attr('disabled', true);
				$(this).find('input[type=radio]').change(function() {
					sliderInner.find('button#INPNext'+(i+1)).attr('disabled', false).focus();
				});
			}
		});

		sliderInner.children().height(slidesHeight);
		$('#result').height("auto");
		slidesHeight+=2; // Les bordures !!

		slider.height(slidesHeight);
		sliderInnerHeight = nbSlides*slidesHeight;
		sliderInner.height(sliderInnerHeight);

		var steps = '<div class="slider-steps"><progress max="'+nbSlides+'" value="1"><div class="progress"><div>&nbsp;</div></div></progress></div>';
		sliderContainer.append(steps);

		sliderContainer.find('input[type=submit]').addClass("invisible"),

		// Question suivante
		sliderContainer.find('[name=INPNext]').click(function() {
			sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("input").attr("tabindex","-1");
			sliderInner.children(':eq('+(nSlide-1)+')').find('[name=INPPrev]').attr("tabindex","-1");
			sliderInner.children(':eq('+(nSlide-1)+')').find('[name=INPNext]').attr('disabled', true).attr("tabindex","-1");
			sliderInner.animate({
				marginTop: "-="+slidesHeight+"px"
			}, "slow", function() {
				nSlide++;
				sliderContainer.data("nSlide",nSlide);
				sliderContainer.find('progress').attr('value', (nSlide) );
				sliderContainer.find('progress div').width(((nSlide)*(100/nbSlides))+'%');

				sliderInner.children(':eq('+(nSlide-1)+')').find("input[type=radio]").attr("tabindex","0").first().focus();
				sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0");
			});

			// Analytics
			if (typeof dataLayer !== 'undefined') {
				//console.log("initSlider clic suivant Analytics: " + 'question-'+nSlide);
                dataLayer.push({'customCategory':'Technique', 'customAction':'PageVirtuelle', 'customLabel':'question-'+nSlide,'event':'customEvent'});
			}

			return false;
		});
		
		// Question prÃ©cÃ©dente
		sliderContainer.find('[name=INPPrev]').click(function() {
			sliderInner.children(':eq('+(nSlide)+')').attr("aria-hidden","true").attr("tabindex","-1").find("input").attr("tabindex","-1");
			sliderInner.children(':eq('+(nSlide-2)+')').find('[name=INPNext]').attr('disabled', false).attr("tabindex","0");
			sliderInner.animate({
				marginTop: "+="+slidesHeight+"px"
			}, "slow", function() {
				nSlide--;
				sliderContainer.data("nSlide",nSlide);
				sliderContainer.find('progress').attr('value', (nSlide) );
				sliderContainer.find('progress div').width(((nSlide)*(100/nbSlides))+'%');
			});

			// Analytics
			//console.log("initSlider clic precedent Analytics: " + 'question-'+nSlide);
			dataLayer.push({'customCategory':'Technique', 'customAction':'PageVirtuelle', 'customLabel':'question-'+nSlide,'event':'customEvent'});

			return false;
		});
		
		// Reponse de l'aide au choix
		sliderContainer.find('[name=INPSubmit]').click(function() {
			url = "protection-vol.cgi?";
			rdStep1 = $("input[name=amcRdStep1]:checked").attr('value');
			rdStep2 = $("input[name=amcRdStep2]:checked").attr('value');
			rdStep3 = $("input[name=amcRdStep3]:checked").attr('value');
			rdStep4 = $("input[name=amcRdStep4]:checked").attr('value');
			rdStep5 = $("input[name=amcRdStep5]:checked").attr('value');
			rdStep6 = $("input[name=amcRdStep6]:checked").attr('value');
        	url = url + 'amcJson=1&amcQ=6&amcRdStep1=' + rdStep1 + '&amcRdStep2=' + rdStep2 + '&amcRdStep3=' + rdStep3 + '&amcRdStep4=' + rdStep4 + '&amcRdStep5=' + rdStep5 + '&amcRdStep6=' + rdStep6;
			//console.log("initSlider clic submit URL: " + url);
			jQuery.getJSON(url, function(datajson) {

				//console.log("Reponse submit Resultat: ");
				//console.log(datajson);
					
				// Webservice UserStatus
				url = "/fr/webservices/UserStatus.cgi"
				jQuery.get( url )
				.done(function( datajsonUS ) {
					UserStatus = datajsonUS.status;

					if (UserStatus == "authentifie") {
						if (simulationExiste) {
							// L'utilisateur est authentifiÃ© et vient de reprendre une simulation
							sliderInner.find("#result").html('<div aria-live="assertive">'+datajson.result[0]+'</div><div class="actions noimpr" aria-live="assertive"><button class="button impr" id="btnPrintPVaide">Imprimer</button><a href="?" class="reload" id="reloadBtn">Modifier votre simulation</a></div>');
							sliderInner.find("#result h2").html('Votre simulation sauvegard&eacute;e');
							simulationExiste = false;
						} else {
							// L'utilisateur est authentifiÃ© et vient de finir une simulation
							sliderInner.find("#result").html('<div aria-live="assertive">'+datajson.result[0]+'</div><div class="actions noimpr" aria-live="assertive"><button class="button impr" id="btnPrintPVaide">Imprimer</button><button id="btnSaveSimul" class="button save">Sauvegarder</button><a href="?" class="reload" id="reloadBtn">Recommencer le formulaire</a></div>');
						}					
					} else {
						// L'utilisateur n'est pas authentifiÃ©
						sliderInner.find("#result").html('<div aria-live="assertive">'+datajson.result[0]+'</div><div class="actions noimpr" aria-live="assertive"><button class="button impr" id="btnPrintPVaide">Imprimer</button><a href="?" class="reload" id="reloadBtn">Recommencer le formulaire</a></div>').height("auto");
					}

					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("input").attr("tabindex","-1");
					sliderInner.animate({
						marginTop: "-="+slidesHeight+"px"
					}, "slow", function() {
						nSlide++;
						sliderContainer.data("nSlide",nSlide);
						sliderContainer.find('progress').attr('value', (nSlide) );
						sliderContainer.find('progress div').width(((nSlide)*(100/nbSlides))+'%');
						// Si c'Ã©tait la derniÃ¨re Ã©tape, on retire le bouton suivant
						slider.height("auto");
						sliderInner.height("auto");

						sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0");
					});

					// La formulaire preconisee --------------------------------
					//console.log("Webservice UserStatus Formule preconisee: " + datajson.result[2] );
					if (datajson.result[2] == "Formule1") {
						$('#cardFormule1').addClass("sel");
						$('#cardFormule1').parent().addClass("sel");
						//$('#labelFormule1').html( datajson.result[3] );
						$('#cardFormule1 ul').append(datajson.result[7]);
					} else {
						$('#cardFormule1').removeClass("sel");
						$('#cardFormule1').parent().removeClass("sel");
					}
					if (datajson.result[2] == "Formule2") {
						$('#cardFormule2').addClass("sel");
						$('#cardFormule2').parent().addClass("sel");
						//$('#labelFormule2').html( datajson.result[3] );
						$('#cardFormule2 ul ').append(datajson.result[7]);
					} else {
						$('#cardFormule2').removeClass("sel");
						$('#cardFormule2').parent().removeClass("sel");
					}

					$('#prixFormule1').html( datajson.result[4] );
					$('#prixFormule2').html( datajson.result[5] );

					$('#cardFormule1 h3').append('<span class="pourvotre"> pour&nbsp;votre&nbsp;' + datajson.result[6] + '</span>');
					$('#cardFormule2 h3').append('<span class="pourvotre"> pour&nbsp;votre&nbsp;' + datajson.result[6] + '</span>');

					// Imprimer
					$('#btnPrintPVaide').click(function() {
						//document.print();
						var resultHtml = $("#result > div") ;
						var resultPrint = window.open('', 'Protection Vol', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
						resultPrint.document.write(resultHtml.html());
						resultPrint.document.close();
						resultPrint.focus();
						resultPrint.print();
						resultPrint.close();

						// Analytics
						//console.log("Analytics: " + 'imprimer');
						dataLayer.push({'customCategory':'Technique', 'customAction':'PageVirtuelle', 'customLabel':'imprimer','event':'customEvent'});

						return false;
					});

					// Sauvegarder la simulation
					$('#btnSaveSimul').click(function() {
						typeHabitation = ($("input[name=amcRdStep1]:checked").attr('value')==1?"APPARTEMENT":"MAISON");
						natureOccupant = ($("input[name=amcRdStep2]:checked").attr('value')==1?"LOCATAIRE":"PROPRIETAIRE");
						intervention = ($("input[name=amcRdStep3]:checked").attr('value')==1?"INTERVENTION":"INFORMATION");
						protectionAgression = ($("input[name=amcRdStep4]:checked").attr('value')==1?true:false);
						protectionIncendie = ($("input[name=amcRdStep5]:checked").attr('value')==1?true:false);
						protectionMonoxydeCarbone = ($("input[name=amcRdStep6]:checked").attr('value')==1?true:false);
						SaveSimul(typeHabitation,natureOccupant,intervention,protectionAgression,protectionIncendie,protectionMonoxydeCarbone);

						return false;
					});

					//Recommencer le formulaire
					$('#reloadBtn').click(function() {
						$('#btnSaveSimul').show();
						$('#cardFormule1').removeClass("sel");
						$('#cardFormule1').parent().removeClass("sel");
						$('#cardFormule2').removeClass("sel");
						$('#cardFormule2').parent().removeClass("sel");
						$('#cardFormule1 ul li.plus').remove();
						$('#cardFormule2 ul li.plus').remove();
						$('#cardFormule1 h3 span.pourvotre').remove();
						$('#cardFormule2 h3 span.pourvotre').remove();
						//	sliderInner.children(':eq('+(nSlide+1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("input").attr("tabindex","-1");
						slider.height(slidesHeight);
						sliderInner.height(sliderInnerHeight);
						sliderInner.animate({
							marginTop: "+="+(slidesHeight*6)+"px"
						}, "slow", function() {
							nSlide=11;
							sliderContainer.data("nSlide",nSlide);
							sliderContainer.find('progress').attr('value', (nSlide) );
							sliderContainer.find('progress div').width(((nSlide)*(100/nbSlides))+'%');
						});

						// Analytics
						//console.log("Analytics: " + 'recommencer');
						//dataLayer.push({'customCategory':'Technique', 'customAction':'PageVirtuelle', 'customLabel':'recommencer','event':'customEvent'});

						return false;
					});

					// Analytics
					//console.log("Webservice UserStatus result1 Analytics: " + datajson.result[1]);
					dataLayer.push({'customCategory':'Technique', 'customAction':'PageVirtuelle', 'customLabel':''+datajson.result[1],'event':'customEvent'});
				});

			});
			return false;
		});

		// RÃ©cupÃ©ration de variables dans la QS
/*		if ( getVar("amcRdStep1")!=0 ) {
console.log("Variable 1: " + getVar("amcRdStep1") );
			if ( getVar("amcRdStep1")=="1" ) {
				$("input[name=amcRdStep1][value=1]").prop('checked', true);
			} else {
				$("input[name=amcRdStep1][value=2]").prop('checked', true);
			}
			if ( getVar("amcRdStep2")=="1" ) {
				$("input[name=amcRdStep2][value=1]").prop('checked', true);
			} else {
				$("input[name=amcRdStep2][value=2]").prop('checked', true);
			}
			if ( getVar("amcRdStep3")=="1" ) {
				$("input[name=amcRdStep3][value=1]").prop('checked', true);
			} else {
				$("input[name=amcRdStep3][value=2]").prop('checked', true);
			}
			if ( getVar("amcRdStep4")=="1" ) {
				$("input[name=amcRdStep4][value=1]").prop('checked', true);
			} else {
				$("input[name=amcRdStep4][value=2]").prop('checked', true);
			}
			if ( getVar("amcRdStep5")=="1" ) {
				$("input[name=amcRdStep5][value=1]").prop('checked', true);
			} else {
				$("input[name=amcRdStep5][value=2]").prop('checked', true);
			}
			if ( getVar("amcRdStep6")=="1" ) {
				$("input[name=amcRdStep6][value=1]").prop('checked', true);
			} else {
				$("input[name=amcRdStep6][value=2]").prop('checked', true);
			}
			sliderInner.css("marginTop","-"+(slidesHeight*5)+"px");
			$(this).find('[name=INPSubmit]').click();
		} else {
			// RÃ©cupÃ©ration d'une sauvegarde prÃ©cÃ©dente
			GetSimul();
		} */

		GetSimul();
    }
    $(document).ready(initSlider);

    function resizeSlider(e) {
        $("[data-slider=yes]").each(function(s){
			var sliderContainer = $(this);
			var slider = $(this).find('.slider');
			var sliderInner = slider.find('.slider-inner');

			var nbSlides = sliderInner.children().length;
			var nSlide = sliderContainer.data("nSlide");

			// Slider par Ã©tapes
			slider.height("auto");
			sliderInner.height("auto");
			sliderInner.children().height("auto");

        	var sliderHeight = slider.outerHeight(false);
        	var sliderInnerHeight = sliderInner.outerHeight(true);

			slidesHeight = 0;
			sliderInner.children().each(function(i){
				if ($(this).height() > slidesHeight) slidesHeight = $(this).height();
			});
			sliderInner.children().height(slidesHeight);
			sliderInner.css("marginTop",-(slidesHeight*(nSlide-1)));
			slidesHeight+=2; // Les bordures !!

			slider.height(slidesHeight);
			sliderInnerHeight = nbSlides*slidesHeight;
			sliderInner.height(sliderInnerHeight);

        });
    }
    $(window).resize(resizeSlider);

})();

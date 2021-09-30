;

/* =================== Aide au choix Crédits renouvelables ============================ */
(function() {
	var step;
	var sliderInner;
	var slidesHeight;
	var montant;
	var question2;
	var besoin;
	var resultat;
	var prdURL;
	var prdBtn;
	var site;
	var tuileId;
	var analyticsLabel;
	var AnalyticsTag;
	var t;
	var url_page = [, "/fr/credits-renouvelables/montant-financer/", "/fr/credits-renouvelables/financement-depense/", "/fr/credits-renouvelables/solutions-proposees/"];

	/* ------ Au clic sur une des solutions proposées... ---- */
	var alreadyClick = false;

	function clickOnSolution(href, besoin, productCode, montant, internalReference, action) {
		if (!alreadyClick) {
			alreadyClick = true;
			url = "/fr/webservices/IPR1/ipr1_directconso_ws_simulation_save.aspx";
			//console.log("Webservice URL: " + url);

			//console.log("productCode: " + productCode);
			var data = JSON.stringify({
				Requirement: besoin,
				ProductCode: productCode,
				Currency: "EUR",
				Amount: String(montant),
				InternalReference: internalReference,
				Action: action
			});
			//console.log("---data---");
			//console.log(data);

			$.ajax({
				type: "POST",
				async: false,
				url: url,
				data: data,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(retour) {
					//console.log("Donnees renvoyees par le Webservice :" + retour);
				},
				error: function(xhr, status, errorThrown) {
					//console.log('@Error : '+errorThrown);
					//console.log('@Status: '+status);
					//console.log('@Status Text: '+xhr.statusText);
				},
				complete: function(data) {
					//console.log("---data---");
					//console.log(data.responseJSON);
					datajson = data.responseJSON;
					if (datajson.Error === null) {
						//console.log("référence: " + datajson.DemandId);
						//window.location.href = href;
						window.location.href = href + "?id=" + datajson.DemandId + "&amcsimulid=1#simulation";
					} else {
						//console.log("erreur");
						document.cookie = 'SimulCC=0; path=/';
						window.location.href = href;
					}
				}
			});

		}
		return false;
	}

	/* ------ Lorsqu'on valide un montant (1ere étape)  ---- */

	function submitFormCC(n) {

		//console.log("Montant: " + $("#inpMontant").attr('value') );
		montant = parseFloat($("#inpMontant").attr('value'));
		document.cookie = 'ACCR-Montant=' + montant + '; path=/';

		t = new Date().getTime();

		// Webservice IPR1 Eligibilite
		if (n == 2) {
			//console.log("Besoin: " + $("input[id^='RdBesoin']:checked").val());
			besoin = $("input[id^='RdBesoin']:checked").val();
			url = "/fr/webservices/IPR1/ipr1_directconso_ws_revolving_eligible_list.aspx?currency=EUR&amount=" + montant + "&answer=" + besoin;
		} else {
			url = "/fr/webservices/IPR1/ipr1_directconso_ws_revolving_eligible_list.aspx?currency=EUR&amount=" + montant;
		}
		url = url + "&t=" + t;
		//console.log("URL: " + url);

		jQuery.getJSON(url, function(datajson) {
			//console.log("Réponse: ");
			//console.log(datajson);

			if (datajson.Error === null) {
				if (datajson.HasQuestion) {
					// On doit afficher la question 2
					// Analytics
					analyticsLabel = url_page[2] ;

					question2 = '<fieldset><div><legend>Comment souhaitez-vous financer cette dépense&nbsp;?</legend><div class="ctxt-form"><div class="form-group"><div class="form-control">';
					datajson.AnswerList.forEach(function(rep) {
						question2 = question2 + '<input type="radio" name="RdBesoin" id="RdBesoin.' + rep.Id + '" value="' + rep.Id + '" required="" aria-required="true"><label for="RdBesoin.' + rep.Id + '">' + rep.Label + '</label><br />';
					});
					question2 = question2 + '</div><div class="form-button"><input type="submit" id="INPSubmit2" name="INPSubmit" value="Valider" class="button" disabled="true"></div></div></div></div></fieldset>';

					sliderInner.append('<div id="item2" role="form">' + question2 + '</div>');
					$('#item2').height(slidesHeight);

					$('#item2').find('input[type=radio]').first().focus();
					$('#item2').find('input[type=radio]').change(function() {
						sliderInner.find('#INPSubmit2').attr('disabled', false).focus();
					});

					$('#INPSubmit2').click(function() {

						submitFormCC(2);
						return false;
					});

				} else {
					//recuperation AnalyticsTag (produit recommandé)
					AnalyticsTag=datajson.AnalyticsTag
					document.cookie = 'SimulCC=1; path=/';
					sliderInner.find('#INPSubmit2').attr('disabled', true);

					// On affiche le résultat

					if (datajson.HasButtonContactConseiller) {

						resultat = "Nous vous conseillons de <a href=\"/fr/particuliers/nous-contacter/contacter-un-conseiller.html\" class=\"contact-msg\" data-ga-category=\"CallToAction\" data-ga-action=\"Contact\" id=\"solution\">contacter votre conseiller</a> pour trouver avec lui une solution adaptée à votre situation";
						switch (site) {
							case "CM":
								sliderInner.append('<div id="result"><div class="sol">' + resultat + '</div></div>');
								$('.ctxt-QCC h1').html("Recommencer le questionnaire");
								$('.ctxt-QCC h1').click(function() {
									window.location.reload();
								});
								break;
							case "CIC":
								sliderInner.append('<div id="result"><div class="sol">' + resultat + '<div class="actions"></div></div></div>');
								//$('#result .actions').prepend("<button id='BTNprevsol' class='button prev'>&lt;<span class='invisible'>Précédent</span></button>");
								$('#BTNprevsol').click(function() {
									window.location.reload();
								});
								$("#result .actions").append('<a href="/fr/banques/particuliers/nous-contacter/contacter-un-conseiller.html" class="button contact" data-ga-category="CallToAction" data-ga-action="Contact">Contacter votre conseiller</a>');
								$("#result .actions").append('<a href="?" class="reload" id="reloadBtn">Recommencer le formulaire</a>');

								$('#myboard').masonry();
								break;
						}

						// Gestion des produits
						if (site == "CM") {
							datajson.RevolvingEligibleList.forEach(function(prd) {

								// Retrouver l'ID de la tuile Produit
								//console.log("Label: " + prd.Label);
								//console.log("ID: " + $("input[value='" + prd.ProductCode + "']").data("id"))
								//console.log("Affichage: " + prd.DisplayLevel)

								tuileId = $("input[value='" + prd.ProductCode + "']").data("id");

								$('section[aria-labelledby=h2Solutions] #' + tuileId + ' a.button').each(function() {
									$(this).click(function(event) {
										event.preventDefault();
										clickOnSolution($(this).attr("href"), besoin, prd.ProductCode, montant, prd.InternalReference, prd.Action);
									});
								});

								// Produits à griser
								//console.log("DisplayLevel: " + prd.DisplayLevel);
								switch (prd.DisplayLevel) {
									case "Disable":
										// Produit à griser
										$('#' + tuileId + '').addClass("disabled");
								}

								// Libellés des boutons
								$('#' + tuileId + ' a.button').html(prd.ActionLabel);

							});
						}
						// Analytics
						analyticsLabel = url_page[3] + "conseiller";

						$('.ctxt-QCC').find('.slider').height("auto");
						$('.ctxt-QCC').addClass('result');

					} else {
						// Analytics
						analyticsLabel = url_page[3] + AnalyticsTag;
						resultat = "D'après votre besoin, nous vous proposons ces solutions&nbsp;: ";
						switch (site) {
							case "CM":
								sliderInner.append('<div id="result"><div class="sol">' + resultat + '</div></div>');
								$('.ctxt-QCC h1').html("Recommencer le questionnaire");
								$('.ctxt-QCC h1').click(function() {
									window.location.reload();
								});
								break;
							case "CIC":
								sliderInner.append('<div id="result"><div class="sol">' + resultat + '<div class="recommanded"></div><div class="actions"><div class="soft">Vous pouvez également&nbsp;:</div></div></div></div>');
								break;
						}
						if (site == "CM") {
							$('.ctxt-QCC').find('.slider').height("auto");
						}
						$('.ctxt-QCC').addClass('result');

						// Gestion des produits
						datajson.RevolvingEligibleList.forEach(function(prd) {

							switch (site) {
								case "CM":
									$('section[aria-labelledby=h2Solutions]').addClass("sel");

									// Retrouver l'ID de la tuile Produit
									//console.log("Label: " + prd.Label);
									//console.log("ID: " + $("input[value='" + prd.ProductCode + "']").data("id"))
									//console.log("Affichage: " + prd.DisplayLevel)

									tuileId = $("input[value='" + prd.ProductCode + "']").data("id");

									$('section[aria-labelledby=h2Solutions] #' + tuileId + ' a.button').each(function() {
										$(this).click(function(event) {
											event.preventDefault();
											clickOnSolution($(this).attr("href"), besoin, prd.ProductCode, montant, prd.InternalReference, prd.Action);
										});
									});

									// Produits recommandés ou à griser
									switch (prd.DisplayLevel) {
										case "Recommended":
											// Produit à mettre en avant
											$('#' + tuileId + '').addClass("sel");
											document.cookie = 'Simul' + prd.ProductCode.replace("_", "") + '=1; path=/';
											break;
										case "Disable":
											// Produit à griser
											$('#' + tuileId + '').addClass("disabled");
									}

									// Libellés des boutons
									$('#' + tuileId + ' a.button').html(prd.ActionLabel);

									break;

								case "CIC":

									// Produits recommandés ou à découvrir
									//console.log("Label: " + prd.Label);
									//console.log("ID: " + $("input[value='" + prd.ProductCode + "']").data("id"))
									//console.log("Affichage: " + prd.DisplayLevel)

									tuileId = $("input[value='" + prd.ProductCode + "']").data("id");
									prdURL = $("input[value='" + prd.ProductCode + "']").data("url");

									switch (prd.DisplayLevel) {
										case "Recommended":
											// Produit à mettre en avant
											prdBtn = '<h2>' + $("input[value='" + prd.ProductCode + "']").data("titre") + '</h2>';
											prdBtn = prdBtn + '<p class="intro">' + $("input[value='" + prd.ProductCode + "']").data("accroche") + '</p>';
											prdBtn = prdBtn + '<a href="' + prdURL + '" id="' + tuileId + '" class="button featured">' + prd.ActionLabel + '</a>';
											//console.log(prdBtn);
											$("#result .recommanded").append(prdBtn);
											document.cookie = 'Simul' + prd.ProductCode.replace("_", "") + '=1; path=/';
											break;
										case "Normal":
											// Produit à découvrir
											prdBtn = '<a href="' + prdURL + '" id="' + tuileId + '" class="button">' + prd.ActionLabel + '</a>';
											//console.log(prdBtn);
											$("#result .actions").append(prdBtn);
									}


									$('#result a#' + tuileId).each(function() {
										$(this).click(function(event) {
											event.preventDefault();
											clickOnSolution($(this).attr("href"), besoin, prd.ProductCode, montant, prd.InternalReference, prd.Action);

										});
									});

									break;
							}

						});

						if (site == "CIC") {
							//$('#result .actions').prepend("<button id='BTNprevsol' class='button prev'>&lt;<span class='invisible'>Précédent</span></button>");
							$('#BTNprevsol').click(function() {
								window.location.reload();
							});
							$("#result .actions").append('<a href="/fr/banques/particuliers/nous-contacter/contacter-un-conseiller.html" class="button contact" data-ga-category="CallToAction" data-ga-action="Contact">Contacter votre conseiller</a>');
							$("#result .actions").append('<a href="?" class="reload" id="reloadBtn">Recommencer le formulaire</a>');
						}
					}
				}

				// Analytics
				//console.log("Analytics :" + analyticsLabel);
				if (typeof(dataLayer) != "undefined")
					dataLayer.push({
						'customCategory': 'Technique',
						'customAction': 'PageVirtuelle',
						'customLabel': analyticsLabel,
						'event': 'customEvent'
					});

			} else {
				//console.log("Erreur : " + datajson.Error.Message);
			}

			// Animer le slider
			sliderInner.animate({
				marginTop: "-=" + slidesHeight + "px"
			}, "slow", function() {
				sliderInner.find('#item' + step).find("input").first().focus();
			});

		});
	}

	/* ------ Init : au chargement de la page ---- */

	function initFormCC(e) {

		//console.log("location: " + location.href);
		if (location.href.indexOf("cic.fr") != -1) {
			site = "CIC";
		} else {
			site = "CM";
		}

		$.ajaxSetup({
			cache: false
		});

		// Quizz
		slidesHeight = 220;
		$('.ctxt-QCC').find('.slider').height(slidesHeight);

		sliderInner = $('.ctxt-QCC').find('.slider-inner');

		$('.ctxt-QCC div[role=form]').attr('id', 'item1').height(slidesHeight);

		if (sliderInner.find('#item2').length == 0) {
			sliderInner.find('#item2').remove;
		}
		if (sliderInner.find('#result').length == 0) {
			sliderInner.find('#result').remove;
		}
		step = 1;

		// Analytics page init
		analyticsLabel = url_page[1];
		//console.log("Init Analytics :" + analyticsLabel);
		if (typeof(dataLayer) != "undefined")
			dataLayer.push({
				'customCategory': 'Technique',
				'customAction': 'PageVirtuelle',
				'customLabel': analyticsLabel,
				'event': 'customEvent'
			});

		$('#INPSubmit').click(function() {
			// Analytics
			if ($("#inpMontant").filter(':invalid').length > 0) {
				alert("Ce montant n'est pas valide.");
			} else {
				submitFormCC(1);
			}
			return false;
		});

		$("#inpMontant").on('keypress', function(e) {
			var regex = /^[0-9]+$/;
			if (!regex.test(e.key)) {
				e.preventDefault();
			}
		});

		$("#inpMontant").on('focusout', function(e) {
			var inputVal = this.value;
			var regex = /^[0-9]+$/;
			if (inputVal === '') {
				return;
			}
			if (!regex.test(inputVal)) {
				alert("Ce montant n'est pas valide.");
			}
		});
	}
	$(document).ready(initFormCC);
})();

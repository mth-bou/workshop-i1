/*********************************************************************************************
Version: 2.0

**********************************************************************************************

//dans le cas ou les balises d�clenchant le pli�/d�pli� et des balises � plier / d�plier sont d�finies dans des data-*
//2 possibilit� :
// -Les data "officiels" � utiliser sont : data-tab-element et data-tabpanel-element
// - mais pour r�tro-compatibilit� avec la FAQ, on supporte �galement : data-trigger et data-target
// sinon par d�faut fonctionnement en dl / dt / dd

Lasts Modifs :
- 20/12/2017 FXL: D�bug en cas d'appels multiples + harmonisation des scripts existants pour n'utiliser plus que celui ci (et non collapsed-dl.js, moins g�n�ral)
- 24/01/2018 FXL : Bug WTF ! avec IE : si un commentaire se termine par un accent, il n'interpr�te pas la ligne qui suit :-|
- 01/03/2019 FXL : Ajout d'un data collapse-init (="true") pour �viter de relancer 2 fois l'initialisation sur un item en cas d'appels multiple
**********************************************************************************************


/* =================== G�rer des FAQ en pli�/d�pli� ============================ */
function FaqScroll2Hash(card_type) {

	var urlHash = window.location.href.split("#")[1];
	if ((urlHash == undefined || urlHash == "") && getVar("hash") != 0)
		urlHash = getVar("hash");

	var OffsetTop;

	//Calcul du d�calage li�s aux �l�ments sticky
	var stickyHeight = 0;
	if (typeof $("#ei_tpl_head").attr('data-sticky') == 'undefined')
		stickyHeight = $('#ei_tpl_head').outerHeight(); //hauteur du header
	$("*[data-sticky]").each(function () {
		stickyHeight += $(this).outerHeight();
	});
	//-------------------------------




	//ancres classiques
	if ($("#" + urlHash).length) {
		//cas des ancres de la FAQ ex: https://www.creditmutuel.fr/fr/particuliers/emprunter/questions-reponses.html#faq_2
		if (urlHash.slice(0, 4) == "faq_") {
			$("#" + urlHash + " > h3").attr("data-collapsed", "no").attr("aria-expanded", "false");
			$("#" + urlHash + " > h3").next().attr("aria-hidden", "false");
			$("#" + urlHash + " > h3").parent().attr("data-openedtab", $("#" + urlHash + " > h3").attr("id"));
			var target = $("#" + urlHash);
			target.focus();
			$('html,body').scrollTop(target.offset().top - stickyHeight);
			//IE et chrome retournent quand m�me � l'ancre... du coup astuce avec l'historique
			if (history.pushState) {
				var sId = decodeURIComponent(window.location.hash);
				history.pushState(null, null, sId);
				history.back();
			}
		} else {
			//ouverture automatique si l'ancre est une commande de pli� / d�pli�
			if ($("#" + urlHash).data("collapsed") == "yes") {
				console.log("collapsed " + $("#" + urlHash).data("collapsed"));
				//on ferme tous les �l�ments
				$("#" + urlHash).parent().find("[data-collapsed='no']").click();
				//on ouvre l'�l�ment cibl� par l'ancre
				$("#" + urlHash).click();
				OffsetTop = Math.floor($("#" + urlHash).offset().top - stickyHeight);
				$('html, body').animate({
					scrollTop: OffsetTop
				}, 900);
			} else {
				//ancre classique
				OffsetTop = Math.floor($("#" + urlHash).offset().top - stickyHeight);
				$('html, body').animate({
					scrollTop: OffsetTop
				}, 900);
			}
		}
	}

	//utilisation d'un data-id comme ancre ex: https://www.creditmutuel.fr/fr/particuliers/gerer-au-quotidien/choisir-votre-carte/assistances-assurances.html#30
	//console.log("data-id ? " + $( "[data-id*='"+urlHash+"']" ).length );
	if ($("[data-id*='" + urlHash + "']").length) {
		OffsetTop = Math.floor($("[data-id*='" + urlHash + "']").offset().top - stickyHeight);
		$('html, body').animate({
			scrollTop: OffsetTop
		}, 900);
		console.log('coucou');
		$("[data-id*='" + urlHash + "']").click();
	}

	//cas o� num�ro de carte retourn� dans l'url
	if (card_type !== undefined && card_type !== '') {
		console.log(card_type);
		if ($("[data-name='" + card_type + "']").length) {
			OffsetTop = Math.floor($("[data-name='" + card_type + "']").offset().top - stickyHeight);
			$('html, body').animate({
				scrollTop: OffsetTop
			}, 900);
			$("[data-name='" + card_type + "']").click();
		}
	}
}

function RebuildTheWall() {
	$('div.ei_cardboard').each(function () {
		var myboard = $(this);
		//console.log(typeof $(this).masonry);
		myboard.Rebuild = function () {
			this.masonry({
				columnWidth: '.ei_gridsizer',
				gutter: '.ei_guttersizer',
				itemSelector: '.ei_cardboarditem',
				percentPosition: true
			});
		};
		myboard.find('img').load(function () {
			myboard.Rebuild(); //r�sout le probl�me safari : les images se chargent � post�riori, il faut red�clencher le "layout"
		});
		myboard.Rebuild();
	});
}

/*flagInitCollapse=false;*/
function initCollapse(e) {

	if ($("[data-collapse=yes]").attr("role") != "tablist") {
		$("[data-collapse=yes]").attr("role", "tablist").attr("aria-multiselectable", "true");
		$("[data-collapse=yes]").each(function (i) {
			//on utilise le data collapse-init pour �viter de relancer 2 fois l'initialisation sur un item en cas d'appels multiple
			if ($(this).data("collapse-init") != "true") {
				//on retire le data-collapse=yes en cas d'appel multiple pour que cela ne soit pas re-trait�
				$(this).attr("data-collapse-init", "true");

				//d�finition de l'�l�ment porteur
				var fatherElt = "dl";
				if ($(this).attr("name") && $(this).attr("name") !== "") {
					fatherElt = $(this).attr('name');
				}

				//d�finition des �l�ments d�clenchant le plie/deplie
				var triggerElt = "dt";
				//console.log("triggerElt:"+triggerElt+" targetElt:"+targetElt);
				if ($(this).attr("data-tab-element") && $(this).attr("data-tab-element") !== "") {

					//console.log("$(this).attr(data-tab-element)"+$(this).attr("data-tab-element"));
					triggerElt = $(this).attr("data-tab-element");

				} else if ($(this).attr("data-trigger") && $(this).attr("data-trigger") !== "") {

					triggerElt = $(this).attr("data-trigger");
					//console.log("$(this).attr(data-trigger)"+$(this).attr("data-trigger"));
				}

				// Pli�/d�pli� sur un tableau en utilisant les ruptures
				var tdGroupCollapse = false;
				if (triggerElt.indexOf(".group") != -1) {
					fatherElt = "tdgroup";
					tdGroupCollapse = true;
				}

				//d�finition des �l�ments � cacher
				var targetElt = "dd";
				if ($(this).attr("data-tabpanel-element") && $(this).attr("data-tabpanel-element") !== "") {
					targetElt = $(this).attr("data-tabpanel-element");
				} else if ($(this).attr("data-target") && $(this).attr("data-target") !== "") {
					targetElt = $(this).attr("data-target");
				}

				//Cr�ation des targetEltName, triggerEltName qui servent � cr�er les identifiants et aria-labelledby � partir des  triggerElt et targetElt
				targetEltName = targetElt;
				triggerEltName = triggerElt;
				if (targetElt.indexOf(" ") >= 0) {
					targetEltName = targetElt.replace(" ", "-");
				}
				if (triggerElt.indexOf(" ") >= 0) {
					triggerEltName = triggerElt.replace(" ", "-");
				}

				if (triggerElt.indexOf(".group") != -1) {
					triggerEltName = "tdgroup";
				}

				var multiCollapse = false;
				var multiTrigger = false;

				//console.log("targetElt: " +targetElt);
				if ((targetElt.indexOf(".") == 0) || tdGroupCollapse) {
					//si la cible est une class, on masque plusieurs elts et pas simplement le suivant
					multiCollapse = true;
				}
				//console.log("multiCollapse: " +multiCollapse);
				if (triggerElt.indexOf(".") == 0) {
					//si le declencheur est multiple, on les modifie tous
					multiTrigger = true;
				}
				//dans le cas des FAQ, on doit g�rer un clone dt pour le CIC mais on ne peux pas ajouter le data-clonedt car le html est g�n�r� par le script d'EI. Du coup on regarde si le parent est FAQ-QUESTIONS
				//
				if ($(this).attr("data-clonedt") == "yes" || $(this).closest("article").hasClass("ei_cardboarditem")) {
					//console.log($(this).parent()[0].tagName);
					$(this).find(triggerElt).each(function (j) {
						title = $(this).html();
						//console.log("title: " +title);
						$(this).next().prepend('<p class="' + triggerElt + '" aria-hidden="true">' + title + '</p>');
					});
				}

				var $this = $(this);

				//console.log( $(this) );
				//console.log("triggerElt:"+triggerElt+" targetElt:"+targetElt);
				$(this).find(triggerElt).each(function (j) {
					//Si l'�l�ment d�clencheur n'a pas un attribut data-trigger-disabled="yes"
					if ($(this).attr("data-trigger-disable") != "yes") {

						//data-libelle est le libelle de remplacement du trigger
						if ($(this).attr("data-libelle-opened") == "" || !$(this).attr("data-libelle-opened")) {
							$(this).attr("data-libelle-opened", $(this).text());
						}
						$(this).attr("data-libelle-closed", $(this).text());
						//$(this).attr("id", triggerEltName + i + "-" + j).attr("tabindex", (j === 0 ? "0" : "-1")).attr("aria-selected", (j === 0 ? "true" : "false")).attr("role", "tab").attr("aria-controls", fatherElt + i + "-" + j);
						$(this).attr("id", triggerEltName + i + "-" + j).attr("tabindex",0).attr("aria-selected", (j === 0 ? "true" : "false")).attr("role", "tab").attr("aria-controls", fatherElt + i + "-" + j);
						if (!multiCollapse) {
							$(this).next().attr("id", fatherElt + i + "-" + j).attr("role", "tabpanel").attr("aria-labelledby", triggerEltName + i + "-" + j).attr("tabindex", "-1");
						} else {
							if (tdGroupCollapse) {
								$(this).attr("data-collapsed", "yes").attr("aria-expanded", "false");
								//console.log( $(this).parent().nextAll() );
								$(this).parent().nextAll().each(function (index, tr) {
									// console.log("index " + index);
									// console.log($(tr));
									// console.log(".group?" + $(tr).find(triggerElt).length );
									if ($(tr).find(triggerElt).length != 0) return false;
									$(tr).attr("data-targetId", fatherElt + i + "-" + j).attr("role", "tabpanel").attr("aria-labelledby", triggerEltName + i + "-" + j).attr("tabindex", "-1");
									if ($(tr).attr("data-collapsed") == "no") {
										$(tr).attr("aria-expanded", "true").attr("aria-hidden", "false");
									} else {
										$(tr).attr("aria-expanded", "false").attr("aria-hidden", "true");
									}
								});
							} else {
								$this.find(targetElt).attr("data-targetId", fatherElt + i + "-" + j).attr("role", "tabpanel").attr("aria-labelledby", triggerEltName + i + "-" + j).attr("tabindex", "-1");
							}
						}


						//Si l'�l�ment d�clencheur a un attribut data-collapsed="no" ou on recoit la querystring clpsd="no" on ne cache pas l'item, sinon il est cach� par d�faut
						var collapsed = getVar('clpsd');
						if (!tdGroupCollapse) {
							if ($(this).attr("data-collapsed") == "no" || collapsed == "no") {
								if (!multiTrigger) {
									$(this).attr("aria-expanded", "true");
								} else {
									$this.find(triggerElt).attr("aria-expanded", "true");
								}
								if (!multiCollapse) {
									$(this).next().attr("aria-hidden", "false");
								} else {
									$this.find(targetElt).attr("aria-hidden", "false");
								}
							} else {
								if (!multiTrigger) {
									$(this).attr("data-collapsed", "yes").attr("aria-expanded", "false");
								} else {
									$this.find(triggerElt).attr("data-collapsed", "yes").attr("aria-expanded", "false");
								}

								if (!multiCollapse) {
									$(this).next().attr("aria-hidden", "true");
								} else {
									$this.find(targetElt).attr("aria-hidden", "true");
								}
							}
						}

						$(this).click(function () {
							if (tdGroupCollapse) {
								targetElt = "tr[data-targetid='" + $(this).attr("id") + "']";
              }

							if ($(this).attr("data-collapsed") == "yes") {
								if (!multiTrigger) {
									$(this).find(triggerElt).text($(this).attr("data-libelle-opened"));
									$(this).attr("data-collapsed", "no").attr("aria-expanded", "true");
								} else {
									$this.find(triggerElt).html($(this).attr("data-libelle-opened"));
									$this.find(triggerElt).attr("data-collapsed", "no").attr("aria-expanded", "true");
								}
								if (!multiCollapse) {
									$(this).next().attr("aria-hidden", "false");
								} else {
									$this.find(targetElt).attr("aria-hidden", "false");
								}
								$(this).parent().attr("data-openedtab", $(this).attr("id"));
							} else {
								if (!multiTrigger) {
									$(this).find(triggerElt).text($(this).attr("data-libelle-closed"));
									$(this).attr("data-collapsed", "yes").attr("aria-expanded", "false");
								} else {
									$this.find(triggerElt).html($(this).attr("data-libelle-closed"));
									$this.find(triggerElt).attr("data-collapsed", "yes").attr("aria-expanded", "false");
								}
								if (!multiCollapse) {
									$(this).next().attr("aria-hidden", "true");
								} else {
									$this.find(targetElt).attr("aria-hidden", "true");
								}
								$(this).parent().attr("data-openedtab", "");
							}
							// Dans le cas ou l'on est dans un contexte de massonry
							if ($('div.ei_cardboard').length && typeof $('div.ei_cardboard').masonry === "function")
								RebuildTheWall();
						});

						$(this).focus(function () {
							$(this).attr("aria-selected", "true");
						});
						$(this).blur(function () {
							$(this).attr("aria-selected", "false");
						});
					}
				});

				$(this).find(targetElt).each(function () {
					$(this).blur(function () {
						$(this).prev().attr("aria-selected", "false");
					});
					//2�me niveau (cas des data-clonedt)
					var triggerElt2 = "";
					if ($(this).find(triggerElt).length) {
						triggerElt2 = triggerElt;
					} else if ($(this).find("." + triggerElt).length) {
						triggerElt2 = "." + triggerElt;
					}

					$(this).find(triggerElt2).each(function () {
						$(this).click(function () {
							var dtid = $(this).parent().attr("aria-labelledby");
							if ($('#' + dtid).attr("data-collapsed") == "yes") {
								$('#' + dtid).attr("data-collapsed", "no").attr("aria-expanded", "false");
								$('#' + dtid).next().attr("aria-hidden", "false");
								$('#' + dtid).parent().attr("data-openedtab", dtid);
							} else {
								$('#' + dtid).attr("data-collapsed", "yes").attr("aria-expanded", "true");
								$('#' + dtid).next().attr("aria-hidden", "true");
								$('#' + dtid).parent().attr("data-openedtab", "");
							}
							// Dans le cas ou l'on est dans un contexte de massonry
							if ($('div.ei_cardboard').length && typeof $('div.ei_cardboard').masonry === "function")
								RebuildTheWall();
						});
					});
				});


				$(this).keypress(function (e) {
					//console.log("DL: "+e.keyCode);
					if (e.keyCode == 9) { // Tab
						//console.log($(this).find("[aria-hidden=false]"));
						if (($(this).find("[aria-hidden=false]").length !== 0) && ($(this).find("[aria-hidden=false]").prop("id") != $(this).find(":focus").prop("id"))) {
							e.preventDefault();
						}
						$(this).find("[aria-hidden=false]").focus();
					}
					if ((e.keyCode == 39) || (e.keyCode == 40)) { // Droite ou bas
						e.preventDefault();
						$(this).find("[aria-selected=true]").nextAll(triggerElt).first().focus();
					}
					if ((e.keyCode == 37) || (e.keyCode == 38)) { // Gauche ou haut
						e.preventDefault();
						$(this).find("[aria-selected=true]").prevAll(triggerElt).first().focus();
					}
					if ((e.keyCode == 13) || (e.keyCode == 32)) { // Entr�e ou Espace
						e.preventDefault();
						$(this).find("[aria-selected=true]").click();
					}
					if (e.keyCode == 35) { // Fin
						e.preventDefault();
						$(this).find("[data-collapsed]").last().focus();
					}
					if (e.keyCode == 36) { // D�but
						e.preventDefault();
						$(this).find("[data-collapsed]").first().focus();
					}
				});
			} /* 		Fin du if($(this).data("collapse-init") != "true")		*/
		});
		FaqScroll2Hash();

		// Dans le cas ou l'on est dans un contexte de massonry
		if ($('div.ei_cardboard').length && typeof $('div.ei_cardboard').masonry === "function") {
			RebuildTheWall();
			// on relance la massonry apr�s timeout pour laisser le temps aux CSS de s'appliquer
			timeoutID = window.setTimeout(RebuildTheWall, 1000);
		}
	}
}
$(document).ready(initCollapse);
//})();


/* =================== Demande sp� pr la page Bonne ex�cution des contrats - R�clamations - M�diation ============================ */
// https://www.creditmutuel.fr/fr/particuliers/nous-contacter/bonne-execution-des-contrats_reclamations_mediation.html
// on g�n�re un appel jsquery au click sur l'ancre "ci-apr�s"
$("#linkQA").click(function (e) {
	//alert('gna');
	$('#dt0-0, #dt0-4, #dt0-5').attr('data-collapsed', 'no');
	$('html, body').animate({
		scrollTop: $("#dt0-4").offset().top
	}, 1000);
});


// /* =================== Demande sp� pr la page LyfPay ============================ */
// //https://www.creditmutuel.fr/fr/particuliers/gerer-au-quotidien/application-lyfpay.html?lyfpay=...

// function extractUrlParams(){
//     var t = location.search.substring(1).split('?');
//     var f = [];
//     for (var i=0; i<t.length; i++){
//         var x = t[i].split('=');
//         f[x[0]]=x[1];
//     }
//     var lequel = f[x[0]]=x[1];
//     var desiredHeight = 65;
//     //alert(lequel);
// 	switch (lequel) {
// 		case '0':
// 			$('#h30-0').attr('data-collapsed','no');
// 			$('#h30-1, #h30-2, #h30-3, #h30-4, #h30-5').attr('data-collapsed','yes');
// 			$('html, body').animate({
// 		    	scrollTop: $("#h30-0").offset().top - desiredHeight
// 		    }, 1000);
// 		break;
// 		case '1':
// 			$('#h30-1').attr('data-collapsed','no');
// 			$('#h30-0, #h30-2, #h30-3, #h30-4, #h30-5').attr('data-collapsed','yes');
// 			$('html, body').animate({
// 		    	scrollTop: $("#h30-1").offset().top - desiredHeight
// 		    }, 1000);
// 		break;
// 		case '2':
// 			$('#h30-2').attr('data-collapsed','no');
// 			$('#h30-0, #h30-1, #h30-3, #h30-4, #h30-5').attr('data-collapsed','yes');
// 			$('html, body').animate({
// 		    	scrollTop: $("#h30-2").offset().top - desiredHeight
// 		    }, 1000);
// 		break;
// 		case '3':
// 			$('#h30-3').attr('data-collapsed','no');
// 			$('#h30-0, #h30-1, #h30-2, #h30-4, #h30-5').attr('data-collapsed','yes');
// 			$('html, body').animate({
// 		    	scrollTop: $("#h30-3").offset().top - desiredHeight
// 		    }, 1000);
// 		break;
// 		case '4':
// 			$('#h30-4').attr('data-collapsed','no');
// 			$('#h30-0, #h30-1, #h30-2, #h30-5').attr('data-collapsed','yes');
// 			$('html, body').animate({
// 		    	scrollTop: $("#h30-4").offset().top - desiredHeight
// 		    }, 1000);
// 		break;
// 		case '5':
// 			$('#h30-5').attr('data-collapsed','no');
// 			$('#h30-0, #h30-1, #h30-2, #h30-3, #h30-4').attr('data-collapsed','yes');
// 			$('html, body').animate({
// 		    	scrollTop: $("#h30-5").offset().top - desiredHeight
// 		    }, 1000);
// 		break;
// 		case '6':
// 			$('#h30-6').attr('data-collapsed','no');
// 			$('#h30-0, #h30-1, #h30-2, #h30-3, #h30-4, #h30-5').attr('data-collapsed','yes');
// 			$('html, body').animate({
// 		    	scrollTop: $("#h30-6").offset().top - desiredHeight
// 		    }, 1000);
// 		break;
// 	  default:
// 	}
// }
// $(document).ready(extractUrlParams);

function GAtrackEvent(categoryStrg, actionStrg, labelStrg) {

  if( typeof(trackEvent) != 'undefined' ) {
    //consoleInfo("trackEvent({category:"+categoryStrg+", action:"+actionStrg+", label:"+labelStrg+"})");
    trackEvent({category:categoryStrg, action:actionStrg, label:labelStrg});
  }
}

(function($) {

	/*function UpdateSliderRange(who, CapitalEmprunte, TauxFixeEmprunt) {

		var MensualiteMin = chartFormat.to(CalculMensualite(CapitalEmprunte,params_user.DureeMax,TauxFixeEmprunt).SommePreleveeMensuel);
		var MensualiteMax = chartFormat.to(CalculMensualite(CapitalEmprunte,params_user.DureeMin,TauxFixeEmprunt).SommePreleveeMensuel);
		//consoleLog("Range Mensualités => "+MensualiteMin+" => "+MensualiteMax);


	}*/


	$.fn.cmCalcMin = function(options) {

		var defaults = {
			epargne:false,
			assurance:false,
			currentType:"Energie"
		}
		var options_init = $.extend({}, defaults, options );

		var currentType, params;
		var d = new Date();
		pret = {};
		moneyFormat = wNumb({decimals: 2,thousand: ' ',mark:','});
		moneySimpFormat = wNumb({decimals: 0,thousand: ' ',});
		chartFormat = wNumb({decimals: 2});
		monthFormat = wNumb({decimals: 0,thousand: ' '});
		tauxFormat = wNumb({decimals: 2,thousand: ' ',mark:','});
		tauxSimpFormat = wNumb({decimals: 2,thousand: ' ',mark:','});

		var option = {
			epargne:options_init.epargne,
      assurance:options_init.assurance,
      update:options_init.update
		};

			 //Recupération des prêts
			 params = params_prets.Simul.Type;

			 //Initialisation DATA
			 currentType = options_init.currentType;
			 FraisDossier = params[currentType]['Frais'];
			 Conditions = params[currentType]['_condition'];

			 params_user = {
				currentType : currentType,
				Duree : params[currentType].Duree._def*1,
				DureeMin : params[currentType].Duree._min*1,
				DureeMax : params[currentType].Duree._max*1,
				Mensualite : params[currentType].Mensualite._def*1,
				Montant : params[currentType].Montant._def*1,
				Taux : params[currentType].Taux._def*1,
				assurance : typeof params[currentType]._assurance !== 'undefined' ? params[currentType]._assurance : false,
				epargne : typeof params[currentType]._epargne !== 'undefined' ? params[currentType]._epargne : false,
			 };

			 // Mise en place des éléments HTML
			 $('.block_calc-min .result_text').html(Conditions);

			if(option.epargne)
					$('section.block_calc-min .result_bref').addClass('plus');
				else
					$('section.block_calc-min .result_bref').removeClass('plus');

				//Implémentation select prêts
				$.each(params, function( index, value ) {
				 $('.block_calc-min #Type .select_pret select').append('<option value="'+index+'">'+value._titre+'</option>');
				 $('.block_calc-min #Type .select_pret .items').append('<li data-value="'+index+'">'+value._titre+'</li>');
				});


				$('section.block_calc-min #Type .options_pret input').change(function(){
				name = $(this).attr('name');
				option[name] = !option[name];

				updateAssuranceEpargne(option);

				updateSlider(true);
				updateSliders();
				 })

				 //Gestion des selects
				 $('section.block_calc-min .select select').change(function(){
					 val_option = $(this).parent('.select').attr('id');
					 option[val_option] = $(this).val();
				 }).parent('.select').find('.selected_item').bind("click",function(){
					$('section.block_calc-min .select').not($(this).parent()).removeClass('open');
					$(this).parent('.select').toggleClass('open');
				 }).parent('.select').find('.items li').bind("click",function(){
					val = $(this).attr('data-value');
					val_option = $(this).parent('.items').parent('.select').attr('id');
					option[val_option] = val;
					title = $(this).html();
					select = $(this).parent('.items').parent('.select');

					select.removeClass('open').find('.selected_item').html(title);
					$('section.block_calc-min .select select').val(val).change();

				 });

				 //Gestion "accordéons"
				 $('section.block_calc-min .result_detail .detail .tableau_ammortissement .open_table').bind("click",function(){
					$('.tableau').toggleClass('open');
					$(this).toggleClass('open');
				 });

				 $('section.block_calc-min .result_detail h4').bind("click",function(){
					$(this).parent().toggleClass('open').find('.detail').slideToggle();
				 });


    //FINALISATION INIT
    if(option.update) {
      // $('.block_calc-min .result_bref .button.btn-top').off('click');
      // $('.block_calc-min .input .btDown').off('click');
      // $('.block_calc-min .input .btUp').off('click');
      /* last Change #### 05/10/2020 bug responsive */
      // $('.block_calc-min input[type=text]').off('submit');
      // $('.block_calc-min input[type=text]').off('change');
      // $('.block_calc-min input[type=text]').off('focus');
      /* last Change #### 05/10/2020 bug responsive */
      updateSlider(option.update);
    } else {
      updateSlider();
    }
    init();


		$('section.block_calc-min .loader').fadeOut();


		function updateAssuranceEpargne(option){
			$('.MensualiteTotal_icon').hide();
			if(option.epargne){

				$('section.block_calc-min .result_bref').addClass('plus').find('ul li.large,ul li.mensualite_credit_icon,ul li.mensualite_epargne_icon').show();
				$('section.block_calc-min .result_bref ul li.epargnetotal_icon').show();
				$('.MensualiteTotal_icon.epargne').show();
			}
			else{
				$('section.block_calc-min .result_bref').removeClass('plus').find('ul li.large,ul li.mensualite_credit_icon,ul li.mensualite_epargne_icon').hide();
				$('section.block_calc-min .result_bref ul li.epargnetotal_icon').hide();
				$('.MensualiteTotal_icon.noepargne').show();
			}
		}

		function updateSliders(){
      //console.log('Test Variation ==========');
			var variations = {
				"Montant":params_user.Montant,
				"Duree":params_user.Duree,
			};
      nouveau_taux = params[params_user.currentType].Taux._def;
      //console.log(nouveau_taux);
			if(!$.isEmptyObject(params[params_user.currentType].Taux._variation)){
				variation_value = variations[params[params_user.currentType].Taux._variation.type];
				variation_selected = params[params_user.currentType].Taux._variation.taux;

				$.each(variation_selected,function(index,value){
					if(variation_value>=value.min && variation_value<=value.max)
						nouveau_taux = value.taux;
				});

				if(option.epargne)
					nouveau_taux = parseFloat(nouveau_taux)+parseFloat(params[params_user.currentType].Taux._epargne);
				if(option.assurance)
					nouveau_taux = parseFloat(nouveau_taux)+parseFloat(params[params_user.currentType].Taux._assurance);

				if(nouveau_taux<=params[params_user.currentType].Taux._min)
					nouveau_taux = params[params_user.currentType].Taux._min;
			}
			$('.block_calc-min #Taux .slide').val(nouveau_taux);
			params_user.Taux = nouveau_taux*1;
      //console.log(nouveau_taux);

		}

		function init(){
			var maxMontant = params[params_user.currentType]['Montant']._max*1;
			var CapitalEmprunte = ((params_user.Montant>maxMontant) ? maxMontant : params_user.Montant);
			var MensualiteTotal = params_user.Mensualite;
			var NombreDePeriodes = params_user.Duree;

			if($(this).parents('.customizable').attr('id')!='Taux')
				updateSliders();

			var TauxFixeEmprunt = params_user.Taux;

			if($(this).parents('.customizable').attr('id')=='Mensualite')
			{
				//CE = CalculCapital(MensualiteTotal,NombreDePeriodes,TauxFixeEmprunt);
				CE = CalculDuree(CapitalEmprunte, MensualiteTotal, TauxFixeEmprunt)
								//CapitalEmprunte = ((CE.ca>parseFloat(params[params_user.currentType]['Montant']._max)) ? parseFloat(params[params_user.currentType]['Montant']._max) : CE.ca);
								NombreDePeriodes = ((CE.n>parseFloat(params[params_user.currentType]['Duree']._max)) ? parseFloat(params[params_user.currentType]['Duree']._max) : CE.n);
			}

			pret = CalculMensualite(CapitalEmprunte,NombreDePeriodes,TauxFixeEmprunt);

			//UpdateSliderRange($('.block_calc-min #Mensualite .slide'),CapitalEmprunte, TauxFixeEmprunt);

			$('.block_calc-min #Montant .slide').val(pret.CapitalEmprunte);

			$('.block_calc-min #Mensualite .slide').val(pret.SommePreleveeMensuel);
			if(option.epargne)
				$('.block_calc-min #Mensualite .slide').val(pret.MensualiteTotal);

			$('.block_calc-min #Duree .slide').val(pret.NombreDePeriodes);
      $('.block_calc-min #Taux .slide').val(pret.TauxFixeEmprunt);


			params_user.Montant = moneyFormat.from($('.block_calc-min #Montant .slide').val());
			params_user.Mensualite = moneyFormat.from($('.block_calc-min #Mensualite .slide').val());
			params_user.Duree = moneyFormat.from($('.block_calc-min #Duree .slide').val());
      params_user.Taux = tauxFormat.from($('.block_calc-min #Taux .slide').val());

			MensualiteTotal_apayer = pret.SommePreleveeMensuel;
			if(option.epargne)
				MensualiteTotal_apayer = pret.MensualiteTotal;

			$('.block_calc-min .result_bref .Montant').html($('.block_calc-min #Montant .slide').val());
			$('.block_calc-min .result_bref .Mensualites').html(moneyFormat.to(MensualiteTotal_apayer)+'&nbsp;&euro;');
			$('.block_calc-min .result_bref .Duree').html(monthFormat.to(pret.NombreDePeriodes));
			//$('#Duree .label .convertion .annee').html((parseFloat(pret.NombreDePeriodes)/12)+" années");
			$('.block_calc-min .result_bref .TAEG').html(tauxFormat.to(pret.TEG)+'&nbsp;%');
			$('.block_calc-min .result_bref .Epargne').html(moneyFormat.to(pret.Epargne)+'&nbsp;&euro;');
			$('.block_calc-min .result_bref .pourcentage_Epargne').html(tauxSimpFormat.to(pret.AffPourcentage)+'&nbsp;%');

			// Coût total du crédit
			$('section.block_calc-min .result_bref .cout_total .ctc').html(moneyFormat.to(pret.ttint)+'&nbsp;&euro;')
			var fdd_txt = pret.FraisDossier==0 ? ' frais de dossiers offerts' : ' + '+moneyFormat.to(pret.FraisDossier*1)+'&nbsp;&euro; de frais de dossiers';
			$('section.block_calc-min .result_bref .cout_total .fdd').html(fdd_txt);
			$('section.block_calc-min .result_bref .cout_total .mtc').html(moneyFormat.to(pret.MontantTotalDu)+'&nbsp;&euro;');

			// Montant total dû
      $('section.block_calc-min .result_bref .montant_total_du .mtd').html(moneyFormat.to(pret.MontantTotalDu)+'&nbsp;&euro;')

      ChangeType(params_user.currentType);

      // Spécial Accéssibilité
      $('.block_calc-min #Montant input').attr('aria-valuenow',pret.CapitalEmprunte);
      $('.block_calc-min #Montant input').attr('aria-valuetext',pret.CapitalEmprunte+' €');
      $('.block_calc-min #Mensualite input').attr('aria-valuenow',moneyFormat.to(pret.SommePreleveeMensuel));
      $('.block_calc-min #Mensualite input').attr('aria-valuetext',moneyFormat.to(pret.SommePreleveeMensuel)+' €/mois');
      $('.block_calc-min #Duree input').attr('aria-valuenow',pret.NombreDePeriodes);
      $('.block_calc-min #Duree input').attr('aria-valuetext',pret.NombreDePeriodes+' mois soit '+parseFloat(pret.NombreDePeriodes)/12+' années');
      $('.block_calc-min #Taux input').attr('aria-valuenow',pret.TauxFixeEmprunt);
      $('.block_calc-min #Taux input').attr('aria-valuetext',pret.TauxFixeEmprunt+' %');
      // Spécial Accéssibilité
		}

		function updateSlider(update){
			update = typeof update !== 'undefined' ? update : false;
			$('.block_calc-min .customizable').each(function(){
				var id = $(this).attr('id');                                        // ID du slider
				var param_current = params[params_user.currentType][id];            // Param du slider
        var elem = $(this);

      // Spécial Accéssibilité
        // consoleLog("id= "+id);
        // consoleLog("param_current._pas= "+param_current._pas);
        // consoleLog("param_current._min= "+param_current._min);
        // consoleLog("param_current._max= "+param_current._max);
        // consoleLog(elem);
        elem.find('input').attr('aria-valuestep',param_current._pas);
        elem.find('input').attr('aria-valuemin',param_current._min);
        elem.find('input').attr('aria-valuemax',param_current._max);
        elem.find('input').attr('aria-valuenow',param_current._def);
        elem.find('input').attr('aria-valuetext',param_current._def+' '+param_current._ext);
        elem.find('input').attr('aria-errormessage','la valeur doit etre comprise entre '+ param_current._min +' et '+param_current._max+'. Elle sera corrigé automatiquement aux valeurs buttées.');
        // Spécial Accéssibilité

				var disabled = params[params_user.currentType][id]._disabled;
				disabled = typeof disabled !== 'undefined' ? disabled : false;

        eval('var opt_format='+elem.attr('data-nFormat'));
        //consoleLog(opt_format);

					pips_values = 3;
					pips_mode = 'count';

					if((parseFloat(param_current._max)-parseFloat(param_current._min))<10){
						pips_values = [0,50,100];
						pips_mode = 'range';

					}

					slider = elem.find('.slide').noUiSlider({
						start: [parseFloat(param_current._def)],
						step: parseFloat(param_current._pas),
						connect: "lower",
						tooltips: wNumb(opt_format),
						range: {
							'min': parseFloat(param_current._min),
							'max': parseFloat(param_current._max)
						},
						format: wNumb(opt_format)
					},update)/*.noUiSlider_pips({
						mode: pips_mode,
						values: pips_values,
						density: 5,
						stepped: true,
						format: wNumb(opt_format)
					})*/;

					if(!update){
						slider.bind({
							slide: function(){
								$(this).parents('.slide_area').find('.noUi-handle').attr('data-value',$(this).val()+' '+$(this).parents('.slide_area').find('.ext').attr('data-simpExt'));
							},
							change: function(){

                var ID = $(this).parents('.customizable').attr('id');
                //alert(ID);
                GAtrackEvent('Simulation',params_user.currentType+'_Utilisation'+ID,'Confirmation');


								var nFormat = wNumb(opt_format);

								var val =nFormat.from($(this).val()) ;

								params_user[ID] = val;

								var maxMontant = params[params_user.currentType]['Montant']._max*1;
								var CapitalEmprunte = ((params_user.Montant>maxMontant) ? maxMontant : params_user.Montant);
								var MensualiteTotal = params_user.Mensualite;
								var NombreDePeriodes = params_user.Duree;

								if(ID!='Taux')
									updateSliders();

								var TauxFixeEmprunt = params_user.Taux;

								if(ID=='Mensualite')
								{
									CE = CalculCapital(MensualiteTotal,NombreDePeriodes,TauxFixeEmprunt);
									//CE = CalculDuree(CapitalEmprunte, MensualiteTotal, TauxFixeEmprunt)
									CapitalEmprunte = ((CE.ca>parseFloat(params[params_user.currentType]['Montant']._max)) ? parseFloat(params[params_user.currentType]['Montant']._max) : CE.ca);
									//NombreDePeriodes = ((CE.n>parseFloat(params[params_user.currentType]['Duree']._max)) ? parseFloat(params[params_user.currentType]['Duree']._max) : CE.n);
								}

								pret = CalculMensualite(CapitalEmprunte,NombreDePeriodes,TauxFixeEmprunt);

								//UpdateSliderRange($('.block_calc-min #Mensualite .slide'),CapitalEmprunte, TauxFixeEmprunt);

								$('.block_calc-min #Montant .slide').val(pret.CapitalEmprunte);

								$('.block_calc-min #Mensualite .slide').val(pret.SommePreleveeMensuel);
								if(option.epargne)
									$('.block_calc-min #Mensualite .slide').val(pret.MensualiteTotal);


								$('.block_calc-min #Duree .slide').val(pret.NombreDePeriodes);
                $('.block_calc-min #Taux .slide').val(pret.TauxFixeEmprunt);

								params_user.Montant = moneyFormat.from($('.block_calc-min #Montant .slide').val());
								params_user.Mensualite = moneyFormat.from($('.block_calc-min #Mensualite .slide').val());
								params_user.Duree = moneyFormat.from($('.block_calc-min #Duree .slide').val());
								params_user.Taux = tauxFormat.from($('.block_calc-min #Taux .slide').val());

								MensualiteTotal_apayer = pret.SommePreleveeMensuel;
								if(option.epargne)
									MensualiteTotal_apayer = pret.MensualiteTotal;

								$('.block_calc-min .result_bref .Montant').html($('.block_calc-min #Montant .slide').val());
								$('.block_calc-min .result_bref .Mensualites').html(moneyFormat.to(MensualiteTotal_apayer)+'&nbsp;&euro;');
								$('.block_calc-min .result_bref .Duree').html(monthFormat.to(pret.NombreDePeriodes));
                //$('#Duree .label .convertion .annee').html((parseFloat(pret.NombreDePeriodes)/12)+" années");
								$('.block_calc-min .result_bref .TAEG').html(tauxFormat.to(pret.TEG)+'&nbsp;%');
								$('.block_calc-min .result_bref .Epargne').html(moneyFormat.to(pret.Epargne)+'&nbsp;&euro;');
								$('.block_calc-min .result_bref .pourcentage_Epargne').html(tauxSimpFormat.to(pret.AffPourcentage)+'&nbsp;%');

								$('section.block_calc-min .result_bref .cout_total .ctc').html(moneyFormat.to(pret.ttint)+'&nbsp;&euro;')
								var fdd_txt = pret.FraisDossier==0 ? ' frais de dossiers offerts' : ' + '+moneyFormat.to(pret.FraisDossier*1)+'&nbsp;&euro; de frais de dossiers';
								$('section.block_calc-min .result_bref .cout_total .fdd').html(fdd_txt);
                $('section.block_calc-min .result_bref .cout_total .mtc').html(moneyFormat.to(pret.MontantTotalDu)+'&nbsp;&euro;');

                ChangeType(params_user.currentType);
                // Remplissage FGEN
                $('#hidMontantSI').val(params_user.Montant+" €");
                $('#hidTauxSI').val(pret.TauxFixeEmprunt+" %");
                $('#hidMensualiteSI').val(params_user.Mensualite+" €/mois");
                $('#hidDureeSI').val(params_user.Duree+" mois");
                // $('#shMontantRE').val($('.block_calc-min .result_bref .cout_total .mtc').html()+" €");
                // $('#shTauxRE').val($('.block_calc-min .result_bref .TAEG').html());
                // $('#shMensualiteRE').val($('.block_calc-min .result_bref .Mensualites').html());
                // $('#shDureeRE').val($('.block_calc-min .result_bref .Duree').html()+" mois");
                // $('#shCoutRE').val($('.block_calc-min .result_bref .cout_total .ctc').html());
								// $('#shFraisRE').val($('.block_calc-min .result_bref .cout_total .fdd').html());

                $('#shMontantRE').val(moneyFormat.to(pret.MontantTotalDu)+' €');
                $('#shTauxRE').val(tauxFormat.to(pret.TEG)+' %');
                $('#shMensualiteRE').val(moneyFormat.to(MensualiteTotal_apayer)+' €');
                $('#shDureeRE').val(monthFormat.to(pret.NombreDePeriodes)+' mois');
                $('#shCoutRE').val(moneyFormat.to(pret.ttint)+' €');
                $('#shFraisRE').val(' + '+moneyFormat.to(pret.FraisDossier*1)+' € de frais de dossiers');

                tauxUsure(pret);

                // Spécial Accéssibilité
                $('.block_calc-min #Montant input').attr('aria-valuenow',pret.CapitalEmprunte);
                $('.block_calc-min #Montant input').attr('aria-valuetext',pret.CapitalEmprunte+' €');
                $('.block_calc-min #Mensualite input').attr('aria-valuenow',monthFormat.to(pret.SommePreleveeMensuel));
                $('.block_calc-min #Mensualite input').attr('aria-valuetext',monthFormat.to(pret.SommePreleveeMensuel)+' €/mois');
                $('.block_calc-min #Duree input').attr('aria-valuenow',pret.NombreDePeriodes);
                $('.block_calc-min #Duree input').attr('aria-valuetext',pret.NombreDePeriodes+' mois soit '+parseFloat(pret.NombreDePeriodes)/12+' années');
                $('.block_calc-min #Taux input').attr('aria-valuenow',pret.TauxFixeEmprunt);
                $('.block_calc-min #Taux input').attr('aria-valuetext',pret.TauxFixeEmprunt+' %');
                // Spécial Accéssibilité

							}
						}).Link('lower').to(elem.find('.input input'));
					}

				if(disabled){
					elem.find('.slide').attr('disabled', 'disabled');
					elem.find('input').attr('disabled', 'disabled');
				}else{
					elem.find('.slide').removeAttr('disabled');
					elem.find('input').removeAttr('disabled');
				}

				var default_val = $(this).find('.slide').val();
				$(this).find('.input input').val(default_val);
				$(this).find('.input span.ext').html(param_current._ext);

			});

			updateSliders();

			var montant = moneyFormat.from($('.block_calc-min #Montant input').val());
			var duree = monthFormat.from($('.block_calc-min #Duree input').val());
			var taux = tauxFormat.from($('.block_calc-min #Taux input').val());

			pret = CalculMensualite(montant,duree,taux);
			updateSliders();
			$('.block_calc-min #Mensualite .slide').val(pret.MensualiteTotal);

			tauxUsure(pret);
		}

		function tauxUsure(pret){

			if(!$.isEmptyObject(params[params_user.currentType].Taux._usure)){

				montant = pret.CapitalEmprunte;
				$('section.block_calc-min .result_bref').removeClass('error').find('.error_msg').html('');
				$.each(params[params_user.currentType].Taux._usure.taux,function(index,value){
					if(montant>(value.min*1))
					{
						if(pret.TEG>value.taux)
							$('section.block_calc-min .result_bref').addClass('error').find(' .error_msg').html('Attention, taux d\'usure acturiel dépassé !');
						else
							$('section.block_calc-min .result_bref').removeClass('error').find('.error_msg').html('');
					}
				});
			}
		}

    $('.block_calc-min input[type=text]').submit(function(){
      $(this).parent().parent().find('.slide').change();
    })

    $('.block_calc-min input[type=text]').change(function(){
      $(this).parent().parent().find('.slide').change();
    })

    $('.block_calc-min input[type=text]').focus(function(){
      $(this).select();
    })

	}

  $('.block_calc-min .input .btUp').click(function(){
    var ID = $(this).parent().parent().attr('id');
    //params_user[ID] = params_user[ID] + parseFloat(params[params_user.currentType][ID]._pas);
    if ($('.block_calc-min #'+ID+' #input-'+ID).attr('disabled') != "disabled"){
      params_user[ID] = params_user[ID] + parseFloat(params_prets.Simul.Type[params_user.currentType][ID]._pas);
      $('.block_calc-min #'+ID+' .slide').val(params_user[ID]);
      $(this).parent().parent().find('.slide').change();
    }
  })
  $('.block_calc-min .input .btDown').click(function(){
    var ID = $(this).parent().parent().attr('id');
    //params_user[ID] = params_user[ID] - parseFloat(params[params_user.currentType][ID]._pas);
    if ($('.block_calc-min #'+ID+' #input-'+ID).attr('disabled') != "disabled"){
      params_user[ID] = params_user[ID] - parseFloat(params_prets.Simul.Type[params_user.currentType][ID]._pas);
      $('.block_calc-min #'+ID+' .slide').val(params_user[ID]);
      $(this).parent().parent().find('.slide').change();
    }
  })



  // $('.block_calc-min .result_bref .button.btn-top').click(function(){
  //   // Remplissage FGEN
  //   $('#hidMontantSI').val(params_user.Montant+" €");
  //   $('#hidTauxSI').val(pret.TauxFixeEmprunt+"%");
  //   $('#hidMensualiteSI').val(params_user.Mensualite+" €/mois");
  //   $('#hidDureeSI').val(params_user.Duree+" mois");
  //   $('#shMontantRE').val($('.block_calc-min .result_bref .cout_total .mtc').html()+" €");
  //   $('#shTauxRE').val($('.block_calc-min .result_bref .TAEG').html());
  //   $('#shMensualiteRE').val($('.block_calc-min .result_bref .Mensualites').html());
  //   $('#shDureeRE').val($('.block_calc-min .result_bref .Duree').html()+" mois");
  //   $('#shCoutRE').val($('.block_calc-min .result_bref .cout_total .ctc').html());
  //   $('#shFraisRE').val($('.block_calc-min .result_bref .cout_total .fdd').html());
  // })


})(jQuery);

$('.block_calc-min .container_simulateur [data-tabs] div.tab li a').click(function () {
  var $type = $(this).data("cal");
  SelectTabCal($type);

  GAtrackEvent('Simulation',params_user.currentType+'_Selection','Confirmation');
})

function SelectTabCal(type) {
  $('.block_calc-min').cmCalcMin({ currentType:type ,epargne:false, assurance:false, update:true });
  $('.block_calc-min .container_simulateur [role=tabpanel] li').removeClass('sel');
  $('.block_calc-min .container_simulateur [role=tabpanel] li').find('a[data-cal='+type+']').parent().addClass('sel');
  //$('.block_calc-min').cmCalcMin({ currentType:type ,epargne:false, assurance:false, update:false });
  return true;
}

setTimeout(function PreselectionTAB() {
  $("ul.tabs").find("a[id=tab1-1]").focus(function() { SelectTabCal('CreditAutoHybElect-Juil2020'); })
  $("ul.tabs").find("a[id=tab1-2]").focus(function() { SelectTabCal('CreditTravauxDD-Juil2020'); })
  $("ul.tabs").find("a[id=tab1-3]").focus(function() { SelectTabCal('CreditPersoPromo-Juil2020'); })
}, 1000);

function ChangeType(currentType) {

  var HidTypeCredit = "";
  var PhraseTypeCredit = "";
  switch (currentType) {
    case "CreditAutoHybElect-Juil2020":
      PhraseTypeCredit = "Pour votre projet d'achat d'un véhicule&nbsp;hybride/éléctrique, votre mensualité&nbsp;totale<sup aria-describedby='descriptionAssurance'>*</sup> serait&nbsp;de";
      HidTypeCredit = "Crédit Auto Hybride/éléctrique";
      break;
    case "CreditAutoSansMalus-Juil2020":
      PhraseTypeCredit = "Pour votre projet d'achat d'un véhicule&nbsp;essence sans&nbsp;malus, votre mensualité&nbsp;totale<sup aria-describedby='descriptionAssurance'>*</sup> serait&nbsp;de";
      HidTypeCredit = "Crédit Auto sans malus";
      break;
    case "CreditAuto-Juil2020":
      PhraseTypeCredit = "Pour votre projet d'achat d'un véhicule, votre mensualité&nbsp;totale<sup aria-describedby='descriptionAssurance'>*</sup> serait&nbsp;de";
      HidTypeCredit = "Crédit Auto";
      break;
    case "CreditTravauxDD-Juil2020":
      PhraseTypeCredit = "Pour votre projet de travaux développement&nbsp;durable, votre mensualité&nbsp;totale<sup aria-describedby='descriptionAssurance'>*</sup> serait&nbsp;de";
      HidTypeCredit = "Crédit Travaux Développement Durable";
      break;
    case "CreditTravaux-Juil2020":
      PhraseTypeCredit = "Pour votre projet de travaux, votre mensualité&nbsp;totale<sup aria-describedby='descriptionAssurance'>*</sup> serait&nbsp;de";
      HidTypeCredit = "Crédit Travaux";
      break;
    case "CreditPersoPromo-Juil2020":
      PhraseTypeCredit = "Pour votre projet personnel court&nbsp;therme, votre mensualité&nbsp;totale<sup aria-describedby='descriptionAssurance'>*</sup> serait&nbsp;de";
      HidTypeCredit = "Crédit Perso Promo";
      break;
    case "CreditPerso-Juil2020":
      PhraseTypeCredit = "Pour votre projet personnel long&nbsp;therme, votre mensualité&nbsp;totale<sup aria-describedby='descriptionAssurance'>*</sup> serait&nbsp;de";
      HidTypeCredit = "Credit Perso";
      break;

  }
  $('section.block_calc-min .result_bref .TypeCredit').html(PhraseTypeCredit);
  $('#hidTypeSI').val(HidTypeCredit);

}

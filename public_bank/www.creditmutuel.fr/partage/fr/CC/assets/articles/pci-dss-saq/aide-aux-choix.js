;
/* =================== Aide au choix PCI DSS =========================== */
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

  // Initialisation du slider de l'aide au choix
  function initSlider(e) {
    $.ajaxSetup({ cache: false });
    sliderContainer.data("nSlide", 1);
    sliderInner.children().each(function(i) {
      if ($(this).height() > slidesHeight) slidesHeight = $(this).height();
      if (i == 0) {
        $(this).attr("tabindex", "0");
        $(this).find('input[type=radio]').attr("tabindex", "0");
      } else {
        $(this).attr("tabindex", "-1").find("a").attr("tabindex", "-1");
        $(this).find('input[type=radio]').attr("tabindex", "-1");
        $(this).find('[name=INPPrev]').attr("tabindex", "-1");
        $(this).attr("aria-hidden", "true");
      }

      // Gestion des boutons
      if ((i + 1) == (nbSlides - 1)) {
        $(this).find('button#INPSubmit' + (i + 1)).attr('disabled', true);
        $(this).find('input[type=radio]').change(function() {
          sliderInner.find('button#INPSubmit' + (i + 1)).attr('disabled', false).focus();
        });
      } else {
        $(this).find('button#INPNext' + (i + 1)).attr('disabled', true);
        $(this).find('input[type=radio]').change(function() {
          sliderInner.find('button#INPNext' + (i + 1)).attr('disabled', false).focus();
        });
      }
    });

    sliderInner.children().height(slidesHeight);
    $('#result').height("auto");
    slidesHeight += 2; // Les bordures !!
    slider.height(slidesHeight);
    sliderInnerHeight = nbSlides * slidesHeight;
    sliderInner.height(sliderInnerHeight);
    var steps = '<div class="slider-steps"><progress max="' + nbSlides + '" value="1"><div class="progress"><div>&nbsp;</div></div></progress></div>';
    sliderContainer.append(steps);
    sliderContainer.find('input[type=submit]').addClass("invisible"),

	// Question suivante
	sliderContainer.find('[name=INPNext]').click(function() {
		sliderInner.children(':eq(' + (nSlide - 1) + ')').attr("aria-hidden", "true").attr("tabindex", "-1").find("input").attr("tabindex", "-1");
		sliderInner.children(':eq(' + (nSlide - 1) + ')').find('[name=INPPrev]').attr("tabindex", "-1");
		sliderInner.children(':eq(' + (nSlide - 1) + ')').find('[name=INPNext]').attr('disabled', true).attr("tabindex", "-1");
		sliderInner.animate({
		  marginTop: "-=" + slidesHeight + "px"
		}, "slow", function() {
		  nSlide++;
		  sliderContainer.data("nSlide", nSlide);
		  sliderContainer.find('progress').attr('value', (nSlide));
		  sliderContainer.find('progress div').width(((nSlide) * (100 / nbSlides)) + '%');

		  sliderInner.children(':eq(' + (nSlide - 1) + ')').find("input[type=radio]").attr("tabindex", "0").first().focus();
		  sliderInner.children(':eq(' + (nSlide - 1) + ')').removeAttr("aria-hidden").attr("tabindex", "0");
		});
		// Analytics
		if (typeof dataLayer !== 'undefined') {
		  console.log("Analytics: " + 'question-' + nSlide);
		  dataLayer.push({ 'customCategory': 'Technique', 'customAction': 'PageVirtuelle', 'customLabel': 'question-' + nSlide, 'event': 'customEvent' });
		}

    //si Q1:oui ou Q2:oui, alors fin direct
    rdStep1 = $("input[name=amcRdStep1]:checked").attr('value');
    rdStep2 = $("input[name=amcRdStep2]:checked").attr('value');
    lafin = '<h2>Pour votre mise en conformité, nous vous conseillons ceci&nbsp;:</h2><ul><li>Vous devez faire appel à un <a target="blank" href="https://www.pcisecuritystandards.org/assessors_and_solutions/qualified_security_assessors">cabinet d’audit accrédité PCI DSS (QSA ou ISA)</a> qui vous accompagnera pour obtenir votre certification.</li></ul><p></p>';
    if(rdStep1 =='1' || rdStep2 =='1' ) {
      sliderInner.find("#result").html('<div aria-live="assertive">' + lafin + '</div><a href="" onClick="window.location.reload();" class="reload" id="reloadBtn">Recommencer le formulaire</a></div>').height("auto");
      sliderInner.animate({
          marginTop: "-300px"
        }, "slow", function() {
          nSlide++;
          sliderContainer.data("nSlide", nSlide);
          sliderContainer.find('progress').attr('value', (nSlide));
          sliderContainer.find('progress div').width(((nSlide) * (100 / nbSlides)) + '%');
          // Si c'était la dernière étape, on retire le bouton suivant
          slider.height("auto");
          sliderInner.height("auto");
          sliderInner.children(':eq(' + (nSlide - 1) + ')').removeAttr("aria-hidden").attr("tabindex", "0");
          $('#slide2, #slide3, #slide4, #slide5, #slide6').remove();
    })
  }
  return false;
	});

    // Question précédente
    sliderContainer.find('[name=INPPrev]').click(function() {
      sliderInner.children(':eq(' + (nSlide) + ')').attr("aria-hidden", "true").attr("tabindex", "-1").find("input").attr("tabindex", "-1");
      sliderInner.children(':eq(' + (nSlide - 2) + ')').find('[name=INPNext]').attr('disabled', false).attr("tabindex", "0");
      sliderInner.animate({
        marginTop: "+=" + slidesHeight + "px"
      }, "slow", function() {
        nSlide--;
        sliderContainer.data("nSlide", nSlide);
        sliderContainer.find('progress').attr('value', (nSlide));
        sliderContainer.find('progress div').width(((nSlide) * (100 / nbSlides)) + '%');
      });
      // Analytics
      if (typeof dataLayer !== 'undefined') {
        console.log("Analytics: Q precedent" + 'question-' + nSlide);
        //dataLayer.push({'customCategory':'Technique', 'customAction':'PageVirtuelle', 'customLabel':'question-'+nSlide,'event':'customEvent'});
      }
      return false;
    });

    // Réponse de l'aide au choix
    var arr = [];
    var arr2 = [];
    var nbrdStep5 = 0;
    var nbrdStep = 0;
    sliderContainer.find('[name=INPSubmit]').click(function() {
      //url = "aide-au-choix-pci-dss-saq.cgi?";
      //url = "donnees-paiement-proteger-entreprise.cgi?";
      //pr recup l'url du cgi en auto /!\ au nb de / ds l'url :6
      var urltemp = $(location).attr('href').split('/')[6];
      var final_url = urltemp.replace('html','cgi');
      url = final_url + '?';
      console.log(url)

      rdStep1 = $("input[name=amcRdStep1]:checked").attr('value');
      rdStep2 = $("input[name=amcRdStep2]:checked").attr('value');
      rdStep3 = $("input[name=amcRdStep3]:checked").attr('value');
      rdStep4 = $("input[name=amcRdStep4]:checked").attr('value');
      //rdStep5 = $("input[name=amcRdStep5]:checked").attr('value');
      rdStep5 = $.each($("input[name=amcRdStep5]:checked"), function(){
            arr.push($(this).val());
      });
      //rdStep6 = $("input[name=amcRdStep6]:checked").attr('value');
      rdStep6 = $.each($("input[name=amcRdStep6]:checked"), function(){
            arr2.push($(this).val());
      });

      var rdStep5Url = '';
      for(var i = 0; i < arr.length; i++){
        if(arr[i] === '1'){
          rdStep5Url = '&amcRdStep5='+arr[i];
        }
        else {
          rdStep5Url += '&amcRdStep5'+ arr[i] +'='+arr[i];
        }
      }

      var rdStep6Url = '';
      for(var i = 0; i < arr2.length; i++){
        if(arr2[i] === '1'){
          rdStep6Url = '&amcRdStep6='+arr2[i];

        }
        else {
          rdStep6Url += '&amcRdStep6'+ arr2[i] +'='+arr2[i];
        }
      }
      //url = url + 'amcJson=1&amcQ=6&amcRdStep1=' + rdStep1 + '&amcRdStep2=' + rdStep2 + '&amcRdStep3=' + rdStep3 + '&amcRdStep4=' + rdStep4 + '&amcRdStep5=' + rdStep5 + '&amcRdStep6=' + rdStep6;
      url = url + 'amcJson=1&amcQ=6&amcRdStep1=' + rdStep1 + '&amcRdStep2=' + rdStep2 + '&amcRdStep3=' + rdStep3 + '&amcRdStep4=' + rdStep4 + rdStep5Url + rdStep6Url;
      console.log("Reponse Aide au choix URL: " + url);

      jQuery.getJSON(url, function(datajson) {
        console.log("Résultat: ");
        console.log(datajson);
        sliderInner.find("#result").html('<div aria-live="assertive">' + datajson.result[0] + '</div><a href="" onClick="window.location.reload();" class="reload" id="reloadBtn">Recommencer le formulaire</a></div>').height("auto");

        sliderInner.children(':eq(' + (nSlide - 1) + ')').attr("aria-hidden", "true").attr("tabindex", "-1").find("input").attr("tabindex", "-1");
        sliderInner.animate({
          marginTop: "-=" + slidesHeight + "px"
        }, "slow", function() {
          nSlide++;
          sliderContainer.data("nSlide", nSlide);
          sliderContainer.find('progress').attr('value', (nSlide));
          sliderContainer.find('progress div').width(((nSlide) * (100 / nbSlides)) + '%');
          // Si c'était la dernière étape, on retire le bouton suivant
          slider.height("auto");
          sliderInner.height("auto");

          sliderInner.children(':eq(' + (nSlide - 1) + ')').removeAttr("aria-hidden").attr("tabindex", "0");
        });

        //Recommencer le formulaire
        $('#reloadBtn').click(function() {
          resetRadio("frmQuiz");

          //	sliderInner.children(':eq('+(nSlide+1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("input").attr("tabindex","-1");
          slider.height(slidesHeight);
          sliderInner.height(sliderInnerHeight);
          sliderInner.animate({
            marginTop: "+=" + (slidesHeight * 6) + "px"
          }, "slow", function() {
            nSlide = 12;
            sliderContainer.data("nSlide", nSlide);
            sliderContainer.find('progress').attr('value', (nSlide));
            sliderContainer.find('progress div').width(((nSlide) * (100 / nbSlides)) + '%');
          });
          // Analytics
          if (typeof dataLayer !== 'undefined') {
            console.log("Analytics: " + 'recommencer');
            //dataLayer.push({'customCategory':'Technique', 'customAction':'PageVirtuelle', 'customLabel':'recommencer','event':'customEvent'});
          }
          return false;
        });

        // Analytics
        if (typeof dataLayer !== 'undefined') {
          console.log("result Analytics: " + datajson.result[1]);
          dataLayer.push({ 'customCategory': 'Technique', 'customAction': 'PageVirtuelle', 'customLabel': +datajson.result[1], 'event': 'customEvent' });
        }
      });
      //});
      return false;
    }); //fin slider reponse
  } //fin init slider

  $(document).ready(initSlider);

  function resizeSlider(e) {
    $("[data-slider=yes]").each(function(s) {
      var sliderContainer = $(this);
      var slider = $(this).find('.slider');
      var sliderInner = slider.find('.slider-inner');
      var nbSlides = sliderInner.children().length;
      var nSlide = sliderContainer.data("nSlide");
      // Slider par étapes
      slider.height("auto");
      sliderInner.height("auto");
      sliderInner.children().height("auto");

      var sliderHeight = slider.outerHeight(false);
      var sliderInnerHeight = sliderInner.outerHeight(true);

      slidesHeight = 0;
      sliderInner.children().each(function(i) {
        if ($(this).height() > slidesHeight) slidesHeight = $(this).height();
      });
      sliderInner.children().height(slidesHeight);
      sliderInner.css("marginTop", -(slidesHeight * (nSlide - 1)));
      slidesHeight += 2; // Les bordures !!

      slider.height(slidesHeight);
      sliderInnerHeight = nbSlides * slidesHeight;
      sliderInner.height(sliderInnerHeight);
    });
  }
  $(window).resize(resizeSlider);
})();

//coche une case parente si case enfant cochée (Q5 et Q6)
$(document).ready(function(){
  $(document).on('change', 'input[type="radio"]', function(e){
  	if( $('input[name=amcRdStep4]').is(':checked') ){
        $('input:radio[name=amcRdStep40]:nth(0)').attr('checked',true);
        $('button[name=INPNext]').removeAttr('disabled');
      }
  });
  	
  $(document).on('change', 'input[type="checkbox"]', function(e){
      //si radio checked sur Q5, alors radio Q5 passe à oui
      if( $('input[name=amcRdStep5]').is(':checked') ){
        $('input:radio[name=amcRdStep50]:nth(0)').attr('checked',true);
        $('button[name=INPNext]').removeAttr('disabled');
      }
      //si radio checked sur Q6, alors radio Q6 passe à oui
      if( $('input[name=amcRdStep6]').is(':checked') ){
        $('input:radio[name=amcRdStep60]:nth(0)').attr('checked',true);
        $('button[name=INPSubmit]').removeAttr('disabled');
      }
  });
});
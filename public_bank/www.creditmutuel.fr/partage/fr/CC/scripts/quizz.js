;

/* =================== Gérer le Quizz debit différé ============================ */
(function() {
    var step;
    var sliderInner;
    var slidesHeight;
    var prev = 0; //pr eviter les doubles boutons si clic sur précédent
    var ledernier;
    var pas = 0;
    var deja = 0;
    var dejan = 0;
    nbetapes = $('.ctxt-QCC .slider .hidden').html();

    function itemQuizz() {
                step++;
                bonnesreponses = $('#item'+step).data("bonnereponse").toString().split("-");
                console.log('la base:'+bonnesreponses);

                while (pas < step) {
                    pas++;
                    $('.etapes:nth-child(-n+'+step+')').addClass('on');
                }                

            	if ($('#Q'+step+'-next').length > 0) {
            	}
            	else {
               			ledernier = '#item'+step; 
                        //test sur la derniere question
						if(ledernier != '#item'+nbetapes+'') {
                            sliderInner.find('#item'+step+' .form-button').prepend('<button id="Q'+step+'-next" aria-hidden="true" class="button next" disabled="true">Suivant</button>');
						}
						else {
                            sliderInner.find('#item'+step+' .form-button').prepend('<button id="Q'+nbetapes+'-next" aria-hidden="true" class="button next" onclick="document.location.reload(true);">Recommencez le quizz &nbsp;!</button>');
						}
                        sliderInner.find('#item'+step+' .form-button').prepend('<button id="Q'+step+'-prev" class="button prev">Précédent<span class="invisible">Précédent</span></button>');
            	}		              

                sliderInner.find('#item'+step+' input[type=radio]').click(function() {
                    
                    $('#item'+step).data('reponse', $(this).val() );

                    if(ledernier != '#item'+nbetapes+'') {
                    	$('#Q'+step+'-next').attr('disabled', false);
                    } 
                    $('.result-'+step).addClass('load');
                    
                    // Afficher quelque chose quand l'utilisateur a donné la mauvaise réponse
                    $('.result-'+step+' .false').each(function( index ) {
                        if ( $('#item'+step).data("bonnereponse").toString().search( $('#item'+step).data("reponse") ) == -1 ) {
                            $( this ).show();
                        } else {
                            $( this ).hide();
                        }
                    });

                    // Afficher quelque chose quand l'utilisateur a donné la bonne réponse
                    $('.result-'+step+' .true').each(function( index ) {
                        if ( $('#item'+step).data("bonnereponse").toString().search( $('#item'+step).data("reponse") ) != -1 ) {
                            $( this ).show();
                        } else {
                            $( this ).hide();
                        }
                    });

                    // Afficher quelque chose quand l'utilisateur a donné la réponse numéro x
                    $('.result-'+step+' [class^="reponse"]').each(function( index ) {
                        if ( ( 'reponse' + $('#item'+step).data("reponse") ) == $( this ).attr("class") ) {
                            $( this ).show();
                        } else {
                            $( this ).hide();
                        }
                    });

                    //$('label[for="amcQ'+step+'.'+bonnereponse+'"]').addClass('success');                   
                    var arrBonnesreponses = new Array(bonnesreponses);
                    for (val in arrBonnesreponses) {
                            $('label[for="amcQ'+step+'.'+arrBonnesreponses[val]+'"]').addClass('success');
                        console.log('what:'+arrBonnesreponses);
                    }
                });

                sliderInner.animate({
                    marginTop: "-="+slidesHeight
                }, "slow", function() {
                    sliderInner.find('#item'+step).find("input").first().focus();
                });

                $('#Q'+step+'-next').off("click").on("click",function() {
                    itemQuizz();
                    return false;
                });

                $('#Q'+step+'-prev').click(function() {
                    sliderInner.animate({
                        marginTop: "+="+slidesHeight+"px"
                    }, "slow", function() {
                        step--;
                        prev++;
                    });
                    return false;
                });
    }

    function initQuizz(e) {  
        //la toute 1ere fois
        //hauteur réglée selon largeur du .ctxt-QCC
            if($('.ctxt-QCC').width() > 414) {
                slidesHeight = 400 + 32 + 8;
            }
            else {
                slidesHeight = 650 + 32 + 8;    
            }

        $('.ctxt-QCC').find('.slider').height(slidesHeight);
            if(deja==0  && dejan==0) {
                $(".ctxt-QCC h1").after('<div class=\"step\"><span class=\"etapes on\">1</span>');
                    deja=1;
                    var j;
                    for (j=2; j<=nbetapes; j++) {
                        $(".step").append('<span class=\"etapes\">'+j+'</span>');
                    }
            $("#frmQCC").before('</div>');
        }

        sliderInner = $('.ctxt-QCC').find('.slider-inner');
        sliderInner.find('input[type=submit]').hide();

        $('#frmQCC fieldset').append('<div class="form-button paddings"></div>');
        if($('button#Q1-next')){
            $('#item1 fieldset').append('<button id="Q1-next" aria-hidden="true" class="button next" disabled="true">Suivant</button>');
        }    
        $('.ctxt-QCC div[role=form]').height(slidesHeight - 32 - 8);
        

        if ( $('#item1 input:checked').length > 0 ) {
            $('#Q1-next').attr('disabled', false);
        }
        step = 1;
        sliderInner.find('#item1 input[type=radio]').click(function() {
            $('#item1').data('reponse', $(this).val() );
            $('#Q1-next').attr('disabled', false).focus();
            $('.result-1').addClass('load');
            $('label[for="amcQ1.' + $('#item1').data("bonnereponse") + '"]').addClass('success');
        });

        bonnesreponses = $('#item1').data("bonnereponse").toString().split("-");
        //console.log( "Bonne réponse : " + bonnesreponses );

        sliderInner.find('#item1 input[type=radio]').click(function() {
            
            $('#item1').data('reponse', $(this).val() );
            
            // Afficher quelque chose quand l'utilisateur a donné la mauvaise réponse
            $('.result-1 .false').each(function( index ) {
                if ( $('#item1').data("bonnereponse").toString().search( $('#item1').data("reponse") ) == -1 ) {
                    $( this ).show();
                } else {
                    $( this ).hide();
                }
            });

            // Afficher quelque chose quand l'utilisateur a donné la bonne réponse
            $('.result-1 .true').each(function( index ) {
                if ( $('#item1').data("bonnereponse").toString().search( $('#item1').data("reponse") ) != -1 ) {
                    $( this ).show();
                } else {
                    $( this ).hide();
                }
            });

            // Afficher quelque chose quand l'utilisateur a donné la réponse numéro x
            $('.result-1 [class^="reponse"]').each(function( index ) {
                if ( ( 'reponse' + $('#item1').data("reponse") ) == $( this ).attr("class") ) {
                    $( this ).show();
                } else {
                    $( this ).hide();
                }
            });

            for (bonnereponse in bonnesreponses) {
                $('label[for="amcQ'+step+'.'+bonnereponse+'"]').addClass('success');
            }
        });

        $('#Q1-next').click(function() {
            itemQuizz();
            return false;
        });
    }
    $(document).ready(initQuizz);
})();
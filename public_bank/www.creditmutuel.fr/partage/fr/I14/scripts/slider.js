;

/* =================== Sliders ============================ */
(function() {
    function initSlider(e) {
        $("[data-slider=yes]").each(function(s){
			var sliderContainer = $(this);
			var slider = $(this).find('.slider');
// console.log( slider.attr("id") );
			if ( slider.attr("id") != undefined) return false;
			var sliderInner = slider.find('.slider-inner');
			slider.attr("id","slider"+(s+1));

			var nbSlides = sliderInner.children().length;
			var nSlide = 1;

			switch( sliderContainer.attr("data-slider-type") ) {
    			case "carousel":
    			// Carrousel
				var sliderWidth = slider.outerWidth(false);
				var sliderInnerWidth = sliderInner.outerWidth(true);

				var slidesWidth = sliderWidth;
				sliderInner.children().width(slidesWidth);

				var slidesList = '<ol role="tablist">';
				sliderInner.children().each(function(i){
					$(this).attr("id","slide"+(s+1)+"-"+(i+1));
					$(this).attr("role","tabpanel");
					var titlesTag = sliderContainer.attr("data-slider-titles");
					$(this).find(titlesTag).attr("id","slider"+(s+1)+"-title"+(i+1));
					$(this).attr("aria-labelledby","slider"+(s+1)+"-title"+(i+1));
					if (i==0) {
						$(this).attr("tabindex","0");
						slidesList += '<li role="presentation"><a role="tab" id="slider'+(s+1)+'-list'+(i+1)+'" aria-selected="true" tabindex="0" aria-controls="slider'+(s+1)+'-'+(i+1)+'" data-slide="'+(i+1)+'" title="'+$(this).find(titlesTag).html()+'"><span class="invisible">'+$(this).find(titlesTag).html()+'</span></li>';
					} else {
						$(this).attr("tabindex","-1").find("a").attr("tabindex","-1");
						$(this).attr("aria-hidden","true");
						slidesList += '<li role="presentation"><a role="tab" id="slider'+(s+1)+'-list'+(i+1)+'" aria-selected="false" tabindex="-1" aria-controls="slider'+(s+1)+'-'+(i+1)+'" data-slide="'+(i+1)+'" title="'+$(this).find(titlesTag).html()+'"><span class="invisible">'+$(this).find(titlesTag).html()+'</span></li>';
					}
				});
				slidesList += '</ol>';
				sliderContainer.prepend('<div class="slider-list">'+slidesList+'</div>');
				var sliderList = $(this).find('ol');

				slider.width(slidesWidth);
				sliderInnerWidth = nbSlides*slidesWidth;
				sliderInner.width(sliderInnerWidth);

        		var sliderPrevious = sliderContainer.attr("data-slider-previous")?sliderContainer.attr("data-slider-previous"):"Précédent";
        		var sliderNext = sliderContainer.attr("data-slider-next")?sliderContainer.attr("data-slider-next"):"Suivant";
       			sliderContainer.append('<div class="slider-buttons"><button title="'+sliderPrevious+'" class="prev" aria-controls="slider'+(s+1)+'" aria-label="'+sliderPrevious+'"><span class="invisible">'+sliderPrevious+'</span></button><button title="'+sliderNext+'" class="next" aria-controls="slider'+(s+1)+'" aria-label="'+sliderNext+'"><span class="invisible">'+sliderNext+'</span></button></div></div>');

				$(this).find('.next').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("a").attr("tabindex","-1");
					sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","false").attr("tabindex","-1");
//					console.log("1: " + sliderInner.css("marginLeft"));
//					console.log("2: " + sliderInnerWidth)
					if ((slidesWidth-sliderInner.css("marginLeft").replace(/[^-\d\.]/g, '')) >= sliderInnerWidth) {
						sliderInner.animate({
							marginLeft: "0px"
						}, "slow", function() {
							nSlide = 1;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","true").attr("tabindex","0");
						});
					} else {
						sliderInner.animate({
							marginLeft: "-="+slidesWidth+"px"
						}, "slow", function() {
							nSlide++;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","true").attr("tabindex","0");
						});
					}
					return false;
				});

				$(this).find('.prev').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("a").attr("tabindex","-1");
					sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","false").attr("tabindex","-1");
					if ((sliderInner.css("marginLeft").replace(/[^-\d\.]/g, '')) == 0) {
						sliderInner.animate({
							marginLeft: "-"+(sliderInnerWidth-slidesWidth)+"px"
						}, "slow", function() {
							nSlide = nbSlides;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","true").attr("tabindex","0");
						});
					} else {
						sliderInner.animate({
							marginLeft: "+="+slidesWidth+"px"
						}, "slow", function() {
							nSlide--;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","true").attr("tabindex","0");
						});
					}
					return false;
				});

				sliderList.find('a').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("a").attr("tabindex","-1");
					sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","false").attr("tabindex","-1");

					nSlide = $(this).attr("data-slide");
					sliderInner.animate({
						marginLeft: "-"+(slidesWidth*(nSlide-1))+"px"
					}, "slow", function() {
						sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
						sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","true").attr("tabindex","0");
					});
				});
				break;
    		case "steps":
    			// Slider par étapes
	        	var sliderHeight = slider.outerHeight(false);
	        	var sliderInnerHeight = sliderInner.outerHeight(true);

				var slidesHeight = 0;
				sliderInner.children().each(function(i){
					if ($(this).height() > slidesHeight) slidesHeight = $(this).height();
					$(this).attr("id","slide"+(s+1)+"-"+(i+1));
					if (i==0) {
						$(this).attr("tabindex","0");
					} else {
						$(this).attr("tabindex","-1").find("a").attr("tabindex","-1");
						$(this).attr("aria-hidden","true");
					}
				});
				sliderInner.children().height(slidesHeight);
/*				$('#result').height(slidesHeight+33); */
				slidesHeight+=2; // Les bordures !!

				slider.height(slidesHeight);
				sliderInnerHeight = nbSlides*slidesHeight;
				sliderInner.height(sliderInnerHeight);

				var steps = '<div class="slider-steps"><progress max="'+(nbSlides+1)+'" value="1"><div class="progress"><div>&nbsp;</div></div></progress></div>';
				sliderContainer.append(steps);
				$(this).find('.slider-next').html('<button disabled="true" class="button next" aria-hidden="true">Suivant</button>');

				// Si un champ est déjà coché, on active le bouton suivant
	/*			if ( sliderInner.find('#slide"+(s+1)+"-1 input:checked').length > 0 ) {
					sliderContainer.find('.next').attr('disabled', false);
				} */
				sliderContainer.find('button[datastep=1]').attr('disabled', false);

				// Quand on coche un champ, ça active le bouton suivant
				slider.find('input[type=radio]').click(function() {
					sliderContainer.find('.next').attr('disabled', false).focus();
				});

				$(this).find('.next').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("input").attr("tabindex","-1");
					sliderInner.animate({
						marginTop: "-="+slidesHeight+"px"
					}, "slow", function() {
						nSlide++;
						sliderContainer.find('progress').attr('value', (nSlide) );
						sliderContainer.find('progress div').width(((nSlide)*(100/nbSlides))+'%');
						// Si c'était la dernière étape, on retire le bouton suivant
						if (nSlide > nbSlides) {
							sliderContainer.find('.next').remove();
						} else {
							sliderContainer.find('.next').attr('disabled', true);
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("input").removeAttr("tabindex").first().focus();
						}
  					});
					return false;
				});
				break;
    		default:
    			// Slider classique
				var sliderHeight = slider.outerHeight(false);
				var sliderInnerHeight = sliderInner.outerHeight(true);

				var slidesHeight = 0;
				sliderInner.children().each(function(i){
					if ($(this).height() > slidesHeight) slidesHeight = $(this).height();
					$(this).attr("id","slide"+(s+1)+"-"+(i+1));
					if (i==0) {
						$(this).attr("tabindex","0");
					} else {
						$(this).attr("tabindex","-1").find("a").attr("tabindex","-1");
						$(this).attr("aria-hidden","true");
					}
				});
				sliderInner.children().height(slidesHeight);
				slidesHeight+=2; // Les bordures !!

				slider.height(slidesHeight);
				sliderInnerHeight = nbSlides*slidesHeight;
				sliderInner.height(sliderInnerHeight);

        		var sliderPrevious = sliderContainer.attr("data-slider-previous")?sliderContainer.attr("data-slider-previous"):"Précédent";
        		var sliderNext = sliderContainer.attr("data-slider-next")?sliderContainer.attr("data-slider-next"):"Suivant";
       			sliderContainer.append('<div class="slider-buttons"><button title="'+sliderPrevious+'" class="prev hide-tooltîp" aria-controls="slider'+(s+1)+'"><span class="invisible">'+sliderPrevious+'</span></button><button title="'+sliderNext+'" class="next hide-tooltîp" aria-controls="slider'+(s+1)+'"><span class="invisible">'+sliderNext+'</span></button><span class="pos"><span>1</span>/'+nbSlides+'</span></div></div>');
        		var sliderPos = $(this).find('.pos span');

				$(this).find('.next').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("a").attr("tabindex","-1");
					if ((slidesHeight-sliderInner.css("marginTop").replace(/[^-\d\.]/g, '')) >= sliderInnerHeight) {
						sliderInner.animate({
							marginTop: "0px"
						}, "slow", function() {
							nSlide = 1;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderPos.html(nSlide);
						});
					} else {
						sliderInner.animate({
							marginTop: "-="+slidesHeight+"px"
						}, "slow", function() {
							nSlide++;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderPos.html(nSlide);
						});
					}
					return false;
				});

				$(this).find('.prev').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("a").attr("tabindex","-1");
					if ((sliderInner.css("marginTop").replace(/[^-\d\.]/g, '')) == 0) {
						sliderInner.animate({
							marginTop: "-"+(sliderInnerHeight-slidesHeight)+"px"
						}, "slow", function() {
							nSlide = nbSlides;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderPos.find('.pos span').html(nSlide);
						});
					} else {
						sliderInner.animate({
							marginTop: "+="+slidesHeight+"px"
						}, "slow", function() {
							nSlide--;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderPos.find('.pos span').html(nSlide);
						});
					}
					return false;
				});
			} 
        });
    }
    $(document).ready(initSlider);

    function resizeSlider(e) {
        $("[data-slider=yes]").each(function(s){
			var sliderContainer = $(this);
			var slider = $(this).find('.slider');
			var sliderInner = slider.find('.slider-inner');

			var nbSlides = sliderInner.children().length;
			var nSlide = 1;

			switch( sliderContainer.attr("data-slider-type") ) {
    			case "carousel":
    			// Carrousel
				slider.width("auto");
				sliderInner.width("auto");
				sliderInner.children().width("auto");

				var sliderWidth = slider.outerWidth(false);
				var sliderInnerWidth = sliderInner.outerWidth(true);

				var slidesWidth = sliderWidth;
				sliderInner.children().width(slidesWidth);

				slider.width(slidesWidth);
				sliderInnerWidth = nbSlides*slidesWidth;
				sliderInner.width(sliderInnerWidth);

				var sliderList = $(this).find('ol');

				$(this).find('.next').unbind( "click" );
				$(this).find('.next').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("a").attr("tabindex","-1");
					sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","false").attr("tabindex","-1");
//					console.log("1: " + sliderInner.css("marginLeft"));
//					console.log("2: " + sliderInnerWidth)
					if ((slidesWidth-sliderInner.css("marginLeft").replace(/[^-\d\.]/g, '')) >= sliderInnerWidth) {
						sliderInner.animate({
							marginLeft: "0px"
						}, "slow", function() {
							nSlide = 1;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","true").attr("tabindex","0");
						});
					} else {
						sliderInner.animate({
							marginLeft: "-="+slidesWidth+"px"
						}, "slow", function() {
							nSlide++;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","true").attr("tabindex","0");
						});
					}
					return false;
				});

				$(this).find('.prev').unbind( "click" );
				$(this).find('.prev').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("a").attr("tabindex","-1");
					sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","false").attr("tabindex","-1");
					if ((sliderInner.css("marginLeft").replace(/[^-\d\.]/g, '')) == 0) {
						sliderInner.animate({
							marginLeft: "-"+(sliderInnerWidth-slidesWidth)+"px"
						}, "slow", function() {
							nSlide = nbSlides;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","true").attr("tabindex","0");
						});
					} else {
						sliderInner.animate({
							marginLeft: "+="+slidesWidth+"px"
						}, "slow", function() {
							nSlide--;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","true").attr("tabindex","0");
						});
					}
					return false;
				});

				sliderList.find('a').unbind( "click" );
				sliderList.find('a').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("a").attr("tabindex","-1");
					sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","false").attr("tabindex","-1");

					nSlide = $(this).attr("data-slide");
					sliderInner.animate({
						marginLeft: "-"+(slidesWidth*(nSlide-1))+"px"
					}, "slow", function() {
						sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
						sliderList.find('#slider'+(s+1)+'-list'+nSlide).attr("aria-selected","true").attr("tabindex","0");
					});
				});
				break;
    		case "steps":
    			// Slider par étapes
				slider.height("auto");
				sliderInner.height("auto");
				sliderInner.children().height("auto");

	        	var sliderHeight = slider.outerHeight(false);
	        	var sliderInnerHeight = sliderInner.outerHeight(true);

				var slidesHeight = 0;
				sliderInner.children().each(function(i){
					if ($(this).height() > slidesHeight) slidesHeight = $(this).height();
				});
				sliderInner.children().height(slidesHeight);
/*				$('#result').height(slidesHeight+33); */
				slidesHeight+=2; // Les bordures !!

				slider.height(slidesHeight);
				sliderInnerHeight = nbSlides*slidesHeight;
				sliderInner.height(sliderInnerHeight);

				$(this).find('.next').unbind( "click" );
				$(this).find('.next').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("input").attr("tabindex","-1");
					sliderInner.animate({
						marginTop: "-="+slidesHeight+"px"
					}, "slow", function() {
						nSlide++;
						sliderContainer.find('progress').attr('value', (nSlide) );
						sliderContainer.find('progress div').width(((nSlide)*(100/nbSlides))+'%');
						// Si c'était la dernière étape, on retire le bouton suivant
						if (nSlide > nbSlides) {
							sliderContainer.find('.next').remove();
						} else {
							sliderContainer.find('.next').attr('disabled', true);
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("input").removeAttr("tabindex").first().focus();
						}
  					});
					return false;
				});
				break;
    		default:
    			// Slider classique
				slider.height("auto");
    			sliderInner.height("auto");
				sliderInner.children().height("auto");

				var sliderHeight = slider.outerHeight(false);
				var sliderInnerHeight = sliderInner.outerHeight(true);

				var slidesHeight = 0;
				sliderInner.children().each(function(i){
					if ($(this).height() > slidesHeight) slidesHeight = $(this).height();
				});
				sliderInner.children().height(slidesHeight);
				slidesHeight+=2; // Les bordures !!

				slider.height(slidesHeight);
				sliderInnerHeight = nbSlides*slidesHeight;
				sliderInner.height(sliderInnerHeight);
				var sliderPos = $(this).find('.pos span');

				$(this).find('.next').unbind( "click" );
				$(this).find('.next').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("a").attr("tabindex","-1");
					if ((slidesHeight-sliderInner.css("marginTop").replace(/[^-\d\.]/g, '')) >= sliderInnerHeight) {
						sliderInner.animate({
							marginTop: "0px"
						}, "slow", function() {
							nSlide = 1;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderPos.html(nSlide);
						});
					} else {
						sliderInner.animate({
							marginTop: "-="+slidesHeight+"px"
						}, "slow", function() {
							nSlide++;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderPos.html(nSlide);
						});
					}
					return false;
				});

				$(this).find('.prev').unbind( "click" );
				$(this).find('.prev').click(function() {
					sliderInner.children(':eq('+(nSlide-1)+')').attr("aria-hidden","true").attr("tabindex","-1").find("a").attr("tabindex","-1");
					if ((sliderInner.css("marginTop").replace(/[^-\d\.]/g, '')) == 0) {
						sliderInner.animate({
							marginTop: "-"+(sliderInnerHeight-slidesHeight)+"px"
						}, "slow", function() {
							nSlide = nbSlides;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderPos.find('.pos span').html(nSlide);
						});
					} else {
						sliderInner.animate({
							marginTop: "+="+slidesHeight+"px"
						}, "slow", function() {
							nSlide--;
							sliderInner.children(':eq('+(nSlide-1)+')').removeAttr("aria-hidden").attr("tabindex","0").find("a").removeAttr("tabindex").first().focus();
							sliderPos.find('.pos span').html(nSlide);
						});
					}
					return false;
				});
			} 
        });
    }
    $(window).resize(resizeSlider);

})();
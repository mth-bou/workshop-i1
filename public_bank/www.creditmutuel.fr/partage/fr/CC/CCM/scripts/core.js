/* ===========  Fonctions utiles  ================*/
function getVar(key, default_) {
	if (default_==null) default_=0;
	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&#]"+key+"=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if(qs == null) return default_; else return qs[1];
}
function ReadCookie(cookieName) {
	// Lire les cookies du site
	var theCookie=""+document.cookie;
	var ind=theCookie.indexOf(cookieName);
	if (ind==-1 || cookieName=="") return "";
	var ind1=theCookie.indexOf(';',ind);
	if (ind1==-1) ind1=theCookie.length;
	return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}
// En attendant de savoir pour la fonction getCookieI14 n'est pas trouvée
function getCookieI14(name) {
	name+='EQU';
	var cookie = ReadCookie('I14wirt').split('SEP');
	for (var i=0;i<cookie.length;i++) {
		if (cookie[i].substr(0,name.length) == name) {
			var value = cookie[i].split('EQU');
			break;
		}
	}
	if (typeof(value) != 'undefined') {
		return value[1];
	}
	return null;
}
function getEspace() {
	return getCookieI14('EIESP');
}
function getEspaceClientReconnu() {
	return getCookieI14('EIECR');
}
function getFede() {
	return getCookieI14('FEDE');
}
function getSousMarche() {
	return getCookieI14('SSMARCHE');
}

/* =================== Etendre la zone de clic ============================ */
function initClicks(e) {
	$("[data-click='yes']").each(function(){
		$(this).addClass('clickable');
		$(this).click(function(e) {
			$(this).find('a').get(0).click();
			e.stopPropagation();
		});
		$(this).find('a').click(function(e) {
			e.stopPropagation();
		});
	});
}
/*$(document).ready(initClicks);*/


/*==========================================================================
4.  lightbox
========================================================================== */
//pour empecher une double ouverture de lightbox
var lightIsOpen = 0;
function openLightboxes( link ) {
  if(lightIsOpen == 0)
  {
    lightIsOpen = 1;
    //  console.log("link: "+link)
      var $this = $(link),
          options = $this.data(),
          $lightbox_opener = $this.attr('id'),
          $lightbox_title = options.lightboxTitle || '',
          $lightbox_class = ($this.attr('href').substr(-3)=="pdf")?' class="pdf"':'',
          $lightbox_width = options.lightboxWidth || '',
          $lightbox_height = options.lightboxHeight || '',
          $lightbox_code,
          $lightbox_iframe = $this.attr('href'),
          $lightbox_type = "iframe",
          $lightbox_overlay,
          $page = $('#lightbox_page');

      //Cas des lightbox lisant un contenu caché de la page et non une url
      if($lightbox_iframe.substr(0,1)=="#")
      {
        $lightbox_type = "innerHtml";
        //spécifique page nouvelle charte prospection
        var cible = $this.data("cible");
        if(cible != "" && cible != undefined)
        {
          var innerHtmlId = $this.attr('href');
          if($(innerHtmlId +" input[name='cible']").length )
          {
            $(innerHtmlId +" input[name='cible']").value = cible;
            $(innerHtmlId +" input[name='cible']").attr("value",cible);
          }
        }
      }

      if(($lightbox_iframe.substr(-3)=="jpg")||($lightbox_iframe.substr(-3)=="gif")||($lightbox_iframe.substr(-3)=="png"))
        $lightbox_type = "image";

    // console.log("type: " + $lightbox_type);

      // insert code at the end
      if (($lightbox_width !== '') && ($lightbox_height !== '')) {
        $lightbox_code = '<dialog id="lightbox"'+$lightbox_class+' role="dialog" aria-labelledby="lightbox_title" style="width:'+$lightbox_width+';height:'+$lightbox_height+'"><div role="document">';
      } else {
        if (($lightbox_width == '') && ($lightbox_height !== '')) {
          $lightbox_code = '<dialog id="lightbox"'+$lightbox_class+' role="dialog" aria-labelledby="lightbox_title" class="nowidth" style="height:'+$lightbox_height+';"><div role="document">';
        } else {
          if ($lightbox_width !== '') {
            $lightbox_code = '<dialog id="lightbox"'+$lightbox_class+' role="dialog" aria-labelledby="lightbox_title" class="noheight" style="width:'+$lightbox_width+';"><div role="document">';
          } else {
            $lightbox_code = '<dialog id="lightbox"'+$lightbox_class+' role="dialog" aria-labelledby="lightbox_title" class="nowidth noheight"><div role="document">';
          }
        }
      }
      $lightbox_code += '<button id="lightbox_close" class="close" data-opener="' + $lightbox_opener + '" title="Fermer"><span class="invisible">Fermer</span></button>';
      if ($lightbox_class !== ''){
        $lightbox_code += '<a href="'+$lightbox_iframe+'" target="_blank" id="lightbox_fullscreen" class="fullscreen" title="Plein écran"><span class="invisible">Voir le <abbr>PDF</abbr> en plein écran</span></a>';
      } else {
        $lightbox_code += '<a href="'+$lightbox_iframe+'" target="_blank" id="lightbox_fullscreen" class="fullscreen" title="Plein écran"><span class="invisible">Ouvrir en plein écran</span></a>';
      }
      if ($lightbox_title !== ''){
        $lightbox_code += '<h1 id="lightbox_title">' + $lightbox_title + '</h1>';
      }
      
      if($lightbox_type == "iframe")
        $lightbox_code += '<iframe src="' + $lightbox_iframe + '"></iframe>';
      else if($lightbox_type == "innerHtml")
      {
        //on prefixe les id pour ne pas avoir d'incohérences
        $lightbox_code += $($this.attr('href')).html().replace("id=\"","id=\"lightbox_");
      }
      else if($lightbox_type == "image")
        $lightbox_code += '<figure><img src="' + $lightbox_iframe + '" alt="" /></figure>';

      $lightbox_code += '</div></dialog>';

    //console.log('----=== $lightbox_code ===----');
    //console.log($lightbox_code);
      $( $lightbox_code ).insertAfter($page);

    //spécifique page nouvelle charte prospection
    $("#lightbox form[data-form='geoloc']").on( "submit", function( event ) {
      geoloc($(this));
      event.preventDefault();
    });

      $page.attr('aria-hidden', 'true');

      if ($lightbox_width !== '') {
        if ($lightbox_width.indexOf("px") != -1) {
          halfwidth = Number( $lightbox_width.replace("px","") ) / 2;
          $('#lightbox').css("left","calc(50% - "+halfwidth+"px)");
        }
        if ($lightbox_width.indexOf("%") != -1) {
          halfwidth = Number( $lightbox_width.replace("%","") ) / 2;
          $('#lightbox').css("left","calc(50% - "+halfwidth+"%)");
        }
      }

      // Overlay      
      $lightbox_overlay = '<div id="overlay" title="Fermer"><span class="invisible">Fermer la fenêtre</span></div>';
      $( $lightbox_overlay ).insertAfter($('#lightbox'));

      $('#overlay').show().fadeTo(500, 0.6);
      $('#lightbox').animate({top:'50%'},'slow','swing')
      $('#lightbox_close').focus();
    }
}
function closeLightboxes() {
  var $close = $('#lightbox_close'),
  $focus = '#' + $close.attr('data-opener'),
  $lightbox = $('#lightbox'),
  $lightbox_overlay = $('#overlay'),
  $page = $('#lightbox_page');

  $page.removeAttr('aria-hidden');
  $lightbox.remove();
  $lightbox_overlay.remove();
  $( $focus ).focus();
  lightIsOpen = 0;
}

function initLightboxes(e) {
  // init
//console.log( $('a.lightbox').length + " lightbox(s)");
  if ( $('a.lightbox').length) {
    $('a.lightbox').each( function(index) {
      var $this = $(this);
      if ( $this.attr('id') == undefined ) {
        $this.attr('id','open_lightbox_' + index);
      }
    });

    if ( $('#lightbox_page').length === 0 ) {
      $( 'body' ).wrapInner('<div id="lightbox_page"></div>');
    }

    // Au clic sur un a.lightbox
    $( 'body' ).on( 'click', 'a.lightbox', function( event ) {
      openLightboxes( $(this) );      
      event.preventDefault();
    });

    // Bouton de fermeture (et touche ESC)
    $( 'body' ).on( 'click', '#lightbox_close', function( event ) {
      closeLightboxes();
    });
    //pour pouvoir ajouter un bouton de fermeture dans la lightbox
    $( 'body' ).on( 'click', '.lightbox_close', function( event ) {
      closeLightboxes();
    });
    $( 'body' ).on( 'click', '#overlay', function( event ) {
      closeLightboxes();
    });
    $( 'body' ).on( 'keydown', '#overlay', function( event ) {
      closeLightboxes();
    });
    $( 'body' ).on( "keydown", "#lightbox", function( event ) {
      var $this = $(this);
      if ( event.keyCode == 27 ) { // ESC
        closeLightboxes();
      }
    });

    // Au besoin, on peut déclencher l'ouverture de la lightbox via un paramètre "open" dans l'URL prenant la valeur de l'ID du lien à déclencher
    id2open=getVar('open');
    if (id2open!=0) {
// console.log('id2open: ' + id2open);
//        $("a#"+id2open).click();
//        var eventClick = new Event('click');
//        document.querySelector("a#"+id2open).dispatchEvent(eventClick);
      openLightboxes( $( "a.lightbox#"+id2open ) );
    }

  }
}
$(document).ready(initLightboxes);
/* =================== Tableaux responsives ============================ */
function responsiveEntries( table ) {
	cols = table.find("thead th:not([colspan])");
	linesTH = table.find("tbody th");
	linesTD = table.find("tbody td");
	linesTDwidthColspan = [];
	for (var c=0 ; c<linesTD.length ; c++) {
		linesTDwidthColspan.push(linesTD[c]);
		if (linesTD[c].colSpan>1) {
			colspan = linesTD[c].colSpan-1;
			for (var cs=0 ; cs<colspan ; cs++) {
				linesTDwidthColspan.push(linesTD[c]);
			}
		}
	}
	newTables = "";
	for (var t=0 ; t<cols.length ; t++) {
		newTables += '<table class="one-entry border RWD-M-alt">';
		newTables += '<caption>' + cols[t].innerHTML + '</caption>';
		newTables += '<tbody>';
		for (var l=0 ; l<linesTH.length ; l++) {
			newTables += '<tr>';
			newTables += '<th scope="row">' + linesTH[l].innerHTML + '</th>';
			newTables += '<td>' + linesTDwidthColspan[t+(l*cols.length)].innerHTML + '</td>';
			newTables += '</tr>';
		}
		newTables += '</tbody>';
		newTables += '</table>';
	}
//	table.hide();
	table.after(newTables);
}

function responsiveLists( table ) {
	lines = table.find("tbody tr");
	linesTH = table.find("thead th");
	linesTD = table.find("tbody td");
	colspan = 1;
	colspanVal = "";
	colspanCount = 0;
	newTables = "";
	for (var t=0 ; t<lines.length ; t++) {
		if ( linesTD[ (t*linesTH.length)-colspanCount ].className == "group") {
			newTables += '<h3 class="RWD-M-alt">' + linesTD[ (t*linesTH.length)-colspanCount ].innerHTML + '</h3>';
			colspanCount += (linesTH.length-1);
		} else {
			if ( lines[t].id ) {
				newTables += '<table class="one-entry border RWD-M-alt" id="ALT-' + lines[t].id + '">';
			} else {
				newTables += '<table class="one-entry border RWD-M-alt">';
			}
			newTables += '<caption>' + linesTD[ (t*linesTH.length)-colspanCount ].innerHTML + '</caption>';
			newTables += '<tbody>';
			for (var l=1 ; l<linesTH.length ; l++) {
				newTables += '<tr>';
				newTables += '<th scope="row">' + linesTH[l].innerHTML + '</th>';
				if ( colspan>1 ) {
					newTables += '<td>' + colspanVal + '</td>';
					colspan--;
				} else {
					newTables += '<td>' + linesTD[ (l+(t*linesTH.length))-colspanCount ].innerHTML.replace("#","#ALT-") + '</td>';
					if ( linesTD[ (l+(t*linesTH.length))-colspanCount ].colSpan>1) {
						colspan = linesTD[ (l+(t*linesTH.length))-colspanCount ].colSpan;
						colspanVal = linesTD[ (l+(t*linesTH.length))-colspanCount ].innerHTML.replace("#","#ALT-");
						colspanCount += (colspan-1);
					}
				}
				newTables += '</tr>';
			}
			newTables += '</tbody>';
			newTables += '</table>';
		}
	}
	table.after(newTables);
}

function initResponsiveTable(e) {
	$("table.two-entry.RWD-M").each(function(){
		responsiveEntries( $(this) );
	});			
	$("table.list.RWD-M").each(function(){
		responsiveLists( $(this) );
	});			
}
$(document).ready(initResponsiveTable);

/* =================== Optin/Optout des cookies ============================ */
/*
//Cette fonction retourne la date d’expiration du cookie de consentement 
function getCookieExpireDate() { 
	var cookieTimeout = 34214400000;// Le nombre de millisecondes que font 13 mois 
	var date = new Date();
	date.setTime(date.getTime()+cookieTimeout);
	var expires = "; expires="+date.toGMTString();
	return expires;
}

function initCookieCNIL() {
	if (!ReadCookie('hasConsent')) {//L'utilisateur n'a pas encore de cookie de consentement
		// console.log("Pas encore accepté");
		if (ReadCookie('askConsent')) {
			// console.log("Déjà demandé ?");
			cookiesOptin();
		} else {
			// console.log("Cookies ?");
			askConsent();
		}
	} else {
		// console.log("Déjà répondu");
		if (ReadCookie('hasConsent-perf') == "false") {
			xtnocookies = true;
		}
	}
}
// Cette fonction est appelée pour afficher la demande de consentement
function askConsent() {
    $('body').prepend(
    	'<div id="cookie-banner" class="cc">'+
    	'<p><strong>En poursuivant votre navigation sur notre site internet, vous acceptez l’utilisation de <span lang="en">cookies</span> ou technologies similaires pour sécuriser votre connexion et faciliter votre navigation, vous proposer des offres adaptées et permettre l’élaboration de statistiques</strong>. ' +
    	'Pour en savoir plus ou pour désactiver les <span lang="en">cookies</span>, <a href="/mabanque/fr/informations-legales/protection-des-donnees.html" onclick="$(\'#lnkProtectionDesDonnees\').click();">consultez notre politique de protection des données</a>.'+
    	'<a id="cookie-close" class="picto" aria-label="Fermer" title="Fermer" href="#" onclick="cookiesOptin();return false" >&#xe607;</a></p>' +
    	'</div>');
    document.cookie = 'askConsent=true;path=/'; 
}
// La fonction d'opt-out
function cookiesOpt(obj, lib) {
	if ( $('#cookies-'+obj+"-y").is(':checked') ) {
		document.cookie = 'hasConsent-'+obj+'=true; '+ getCookieExpireDate() +' ; path=/'; 
    	$('div#cookiesMsg-'+obj).html('<div class="msg info"><p>Vous avez accepté l’utilisation de <span lang="en">cookies</span> '+lib+'.</p></div>');
    	if (obj=='perf') xtnocookies = false;
//   	    if (jQuery.isFunction(xt_click)) {
//		    xt_click(this,'C','6','Cookies::Optin-'+obj,'N');    	
//		}
	} else {
    	document.cookie = 'hasConsent-'+obj+'=false;'+ getCookieExpireDate() +' ; path=/';
    	$('div#cookiesMsg-'+obj).html('<div class="msg info"><p>Vous vous êtes opposé à l’utilisation de <span lang="en">cookies</span> '+lib+'.</p></div>');
    	if (obj=='perf') xtnocookies = true;
		//if (jQuery.isFunction(xt_click)) {
		//	xt_click(this,'C','6','Cookies::Optout-'+obj,'N');
		//}
	}
}
function cookiesOptin() {
    document.cookie = 'hasConsent=true;'+ getCookieExpireDate() +' ; path=/';
    document.cookie = 'hasConsent-perf=true;'+ getCookieExpireDate() +' ; path=/';
    document.cookie = 'hasConsent-pub=true;'+ getCookieExpireDate() +' ; path=/';
    $('div#cookie-banner').remove();
//    $('div#optoutMsg').html('<div id="cookie-banner" class="bloctxt info"><p>Vous vous avez accepté l’utilisation de <span lang="en">cookies</span>.</p></div>');
    xtnocookies = false;
    //if (jQuery.isFunction(xt_click)) {
		//xt_click(this,'C','6','Cookies::Optin','N');
	//}
}
$(document).ready(function() {
	initCookieCNIL();
});*/

/* =================== Récupération de variables clients dans l'URL ============================ */
function persoEmails() {
	if ( getVar("rdCivil") != 0 ) {
		$("#Civilite").attr("value", getVar("rdCivil"));
	}
	if ( getVar("txtNom") != 0 ) {
		$("#Nom").attr("value", getVar("txtNom"));
	}
	if ( getVar("txtPrenom") != 0 ) {
		$("#Prenom").attr("value", getVar("txtPrenom"));
	}
	if ( getVar("txtCaisse") != 0 ) {
		$("#Telephone").attr("value", getVar("txtCaisse"));
	}
	if ( getVar("txtEmail") != 0 ) {
		$("#Email").attr("value", getVar("txtEmail"));
	}
	if ( getVar("txtTelPers") != 0 ) {
		$("#Telephone").attr("value", getVar("txtTelPers"));
	}
}
$(document).ready(function() {
	persoEmails();
});

/*==========================================================================
5.  Geoloc
========================================================================== */
function getCookieExpireDate() { 
  var cookieTimeout = 34214400000;// Le nombre de millisecondes que font 13 mois 
  var date = new Date();
  date.setTime(date.getTime()+cookieTimeout);
  var expires = "; expires="+date.toGMTString();
  return expires;
}
function geoloc(target){
    var CP = target.find('input[name="txtCP"]').val();
    var cible = target.find('input[name="cible"]').val();

  console.log("Cible : "+cible);
  console.log("CP : "+CP);

    if(cible != null && cible != undefined && cible != "")
      document.cookie = 'Cible='+ cible +'; path=/';


    //https://tst-www.creditmutuel.fr/webservice/wsFede.aspx?world_id=CM&postal_code=67000
    //{"Status":"OK","Fede":"11","Bank":null}
    url = "/webservice/wsFede.aspx?world_id=CM&postal_code="+CP;
    console.log("URL"+url);
    jQuery.getJSON(url, function(datajson) {
      console.log("OK?");
      console.log(datajson);
      if (datajson.Status == "OK") {
        fede = datajson.Fede;
        console.log("Fede: " + fede);
        document.cookie = 'Fede='+fede+';'+ getCookieExpireDate() +' ; path=/';
        bank = datajson.Bank;
        document.cookie = 'Bank='+bank+';'+ getCookieExpireDate() +' ; path=/';
        document.cookie = 'Geoloc=1;'+ getCookieExpireDate() +' ; path=/';
        // envoi push GTM
       if (typeof(dataLayer) != 'undefined'){
            dataLayer.push({'eventCategory':'Redirection','eventAction':fede,'eventLabel':window.parent.location,'event':'CreationCookie'})
        }
        // fin envoi push GTM                                 
      
        window.parent.location.reload();
      }
    })
    
}
$(document).ready(function() {
  $("form[data-form='geoloc']").on( "submit", function( event ) {
  geoloc($(this));
  event.preventDefault();
});
});


/* =================== Scroller jusqu'à une section/un élément ============================ */
function Scroll2ID(id) {
	 var OffsetTop = Math.floor( $("#"+id).offset().top - menuTop );
	$('html, body').animate( { scrollTop: OffsetTop }, 900 );
}
function Scroll2Hash() {

	//décalage lié au header sticky
	var stickyHeight = 10;
	$("*[data-sticky]").each(function(){
		stickyHeight += $(this).outerHeight();
	});
//console.log("stickyHeight: " + stickyHeight);

	//smoothscroll si ancre dans l'URL
	var urlHash = window.location.href.split("#")[1];
//console.log("hash 2: " + urlHash);

	//urlHash = ( (urlHash==undefined) && (getVar("hash")!=0) )?( getVar("hash") ):undefined; FX: ré-ecriture de cette ligne ci dessous, cette ligne empechait la récupération d'ancres. PS: éviter ce type d'écriture peu lisible est propice aux erreurs
	if((urlHash == undefined || urlHash == "") && getVar("hash") != 0)
		urlHash=getVar("hash");

	if ( $( "#"+urlHash ).length && urlHash.substr(0,2)!="DL" ) {
		var OffsetTop = Math.floor( $("#"+urlHash).offset().top - stickyHeight );
		$('html, body').animate( { scrollTop: OffsetTop }, 900 );
	}

		
	// sélection des liens de type ancre, différent de "#" et qui restent sur la page
	//FX: modif de l'appel du callback car sinon il se déclenchait 2 fois (cf http://stackoverflow.com/questions/8790752/callback-of-animate-gets-called-twice-jquery)
	//FX: ajout du event dans le fonction pour pouvoir désactiver l'action par défaut (aller à l'ancre) qui se lance parfois avec IE
	$('a[href*=#]:not([href=#]):not([data-smoothscrolling=false])')
		.filter(function(){ return location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname; } )
		.off("click.smoothscroll")
		.on("click.smoothscroll",function(event) {
			event.preventDefault();//FX: desactivation de l'action par défaut
			var sId = decodeURIComponent(this.hash);
			var target = $(sId);
			target = target.length ? target : $('[name=\'' + sId.slice(1) +'\']');
			if (target.length) {
				//par défaut, pas de décalage
				var iDecal = 0;
				if(!target.hasClass("ei_decal_anchor")){
					//s'il y a la classe ei_decal_anchor, le décalage est déjà géré et on ne fait rien de spécial, sinon, on exploite le décalage lié au header sticky
					iDecal = stickyHeight +10; //on ajoute 10px pour éviter d'être collé au header.
				}
//console.log("iDecal: " + iDecal);

				var targetOffsetTop=target.offset().top;
				//si la cible a la classe invisible, on se base sur le parent visible le plus proche (la classe invisible est positionnée en négatif)
				if(target.hasClass('invisible')) {
					var offsetOk=0;
					while(offsetOk != 1)
					{
						target=target.next();
						if(!target.hasClass('invisible'))
						{
							targetOffsetTop=target.offset().top;
							offsetOk=1;
						}
					}
				}
//console.log("targetOffsetTop: " + targetOffsetTop);

				// on calcule la distance à parcourir (en valeur absolue)
				var iDuration = Math.abs($("body,html").scrollTop() - (targetOffsetTop - iDecal)) ;
				// cette distance sert de temps pour l'animation, mais on bride à 1s max. Vitesse de déplacement : 1000px/s si distance <= 1000px
				if(iDuration > 1000) iDuration = 1000;
				if(iDuration == 0) return false;//FX: si l'on est déjà à la bonne position, on arrête tout 

				//animation pour se déplacer en douceur jusqu'à la cible, par défaut on est en "swing" (accélération puis décélération)					
//console.log("(targetOffsetTop - iDecal): " + (targetOffsetTop - iDecal));
				$('html,body').animate({scrollTop: (targetOffsetTop - iDecal) }, iDuration, "swing").promise().then(function(){
					//APE - 24/02/16 - on donne le focus à l'élément ciblé pour que la tabulation suive un ordre logique
					if(target.attr("tabindex") == undefined || target.attr("tabindex") == null || target.attr("tabindex") == ""){ 
						if (target.is(":hidden") || target.is(":disabled") || !target.is(":input, a[href], area[href], iframe")){	
							target.attr("tabindex","-1"); //si l'élément ne pouvait pas prendre le focus, on fait en sorte qu'il puisse
							target.css("outline","none"); //mais on ne le montre pas
						}
					}
					target.focus();
					
					$('html,body').scrollTop(targetOffsetTop - iDecal);//FX: Sinon IE se positionne sur l'ancre à la prise de focus. Ce n'est pas très éléguants et ça fait un moche effet visuel (sous IE) mais je n'ai rien trouvé d'autre ...
				});
				//return false;
			}	   
		});

}
$(document).ready(Scroll2Hash);
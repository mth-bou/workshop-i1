if(typeof getCookie == "undefined") {
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  // lecture cookie : getCookie('myCookie');
}

if(typeof setCookie == "undefined") {
  function setCookie(name, value, days, path) {
    if (path == undefined)
      path = "/";
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else expires = "";
    document.cookie = name + "=" + value + expires + "; path=" + path;
  }
  // ex : creation / ecriture cookie pour 1 journee : setCookie('myCookie', 'myValue', 1);
}

var checkEnv = String(document.location).substring(8,11);
var amcdebug = getCookie('amcdebug');
if(checkEnv == "tst" || checkEnv == "sit" || checkEnv == "rqt" || amcdebug == "1") {
	$.getScript({
		url: "/partage/fr/CC/scripts/testsMain.min.js",
		cache: true
	});
}

// Chargement de la bar SEO en fonction des cookies 21/12/2020
if(getCookie("debug_bar") == "1" && getCookie("seo_bar") == "1") {
	$.getScript({
		url: "/partage/fr/CC/scripts/seobar.min.js",
		cache: true
	});
}

	/*if(getCookie('amcdebug') == null)
		setCookie('amcdebug', '1', 365);*/

	// Utilisé pour afficher des tooltips en cas de HREF vide
	//############ A SUPPRIMER ####################
	/*$.getScript({
		url: "https://unpkg.com/@popperjs/core@2.0.5/dist/umd/popper.min.js",
		cache: true
	});*/
/*
const tab_dclic=["/fr/professionnels/magazine/4-bonnes-raisons-d-adopter-rapidement-la-facture-electronique.html","/fr/banques/professionnels/gestion-courante/e-factures.html","/fr/particuliers/gerer-au-quotidien/carte-gold-mastercard.html","/fr/particuliers/emprunter/acheter-un-logement.html","/fr/guide/immobilier.html","/fr/particuliers/magazine/residence-principale-achat-ou-location.html","/fr/particuliers/assurance/protection-vol.html","/fr/particuliers/assurance/alarme-maison-homiris.html","/fr/particuliers/actualites/2017/du-nouveau-pour-vos-credits.html"];
const url_page = window.location.toString();
var tab_url_page = url_page.split('/');
tab_url_page.shift();
tab_url_page.shift();
tab_url_page.shift();
const end_url = tab_url_page.join('/');
if(tab_dclic.indexOf("end_url") != -1)
{
	$.getScript({
		url: "/partage/fr/CC/scripts/external/dclic.min.js",
		cache: true
	});
}*/

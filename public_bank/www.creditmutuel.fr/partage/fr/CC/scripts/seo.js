//SEO : traitement des canoniques en js pr les pages actus et magazines


//URL
var currentURL = $(location).attr('href');
//console.log('ici : '+currentURL);
var macanoniq = currentURL;

//canonique
var new_canoniq = $("link[rel='canonical']").attr("href")
//console.log('ici : '+new_canoniq);


//on recup les param de l'url
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);
	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}
var nbpage = $_GET('amcpage');
//si amcpage=1, faire comme si index.html ...
//split retourne un tab[...]
var labase = currentURL.split('?');

// si page=1, on garde .html
if(nbpage =='1') {
	$("link[rel='canonical']").attr("href", labase[0]);
}
//sinon pages suivantes, avec args
else {
	// on remplace la valeur par l'url
	$("link[rel='canonical']").attr("href", macanoniq);	
}


//evolution pr les associations
const letrucachercher = macanoniq;
console.log(letrucachercher.indexOf("associations")); // 1
//si associations,
if(letrucachercher.indexOf("associations") == '35' || letrucachercher.indexOf("associations") == '31') {
	//alors rediriger vers professionnels
	macanoniq=macanoniq.replace('associations','professionnels');
	//$("link[rel='canonical']").attr("href", macanoniq);
	$("link[rel='canonical']").attr("href", "https://www.creditmutuel.fr/fr/professionnels/actualites.html");
}
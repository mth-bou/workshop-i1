//La simulation affiche dans certains cas une offre passeport crédit même si l'on est sur une page crédit auto, travaux...
//Il faut donc qu'un exemple passeport crédit soit visible sur la page.
//on place donc cet exemple en permanence, on le cache au chargement de la page via Javascript puis, au rafraichissement de la simulation on l'affiche si l'on détecte une offre passeport dans la calculette

//Fonction appelée en cas d'actualisation de la calculatrice afin de gérer les liens vers des ancres nouvellement créés ou d'afficher l'exemple crédit Conso
function webconsoHasEvolved(){
		Scroll2Hash();//on scrolle si besoin

		//on regarde si l'pon a une proposition de passeport ou crédit en réserve
		if($("[id$='DirectConsoPasseport']").length)
		{
			$("#exemple_passeport").show();
		}

}


$(document).ready(function() {
	if(getVar("project")!==0 || getVar("mnc")!==0){
		Scroll2ID("SimulCredit");
	}

	//par défaut on cache l'exemple passeport
	if($("#exemple_passeport").length)
		$("#exemple_passeport").hide();

});
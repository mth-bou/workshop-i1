/*
// calcul simulateur madelin
// auteur : Devfront/GH
// sur formule fournie par contenu
*/
function calculSimMad(wrapper){
	/*  txtResult, txtMontantAchat, rdTypeAchat (Ancien, Neuf), txtnumDepartement	*/
	//reset .err-msg
	$("div.error").remove();
	$("input[type='text'").removeClass('error');
	$("input[type='text'").removeClass('err-msg');
	$("p.messageResult").remove();

	function affRound(num){
		num=Math.round(num)
		return num;
	}

	function affErreur(pText, elt){
		elt.before("<div role=\"alert\" aria-live=\"assertive\" class=\"error err-msg\"><p>" + pText + "</p></div>");
		elt.addClass("error");
		elt.addClass("err-msg");
		elt.focus();
		fErreur=true;
	}
	var fErreur=false;
	var eltForm=$("#SimulMadelin");
	var eltBenefice=$("#txtBenefImp");
	var eltVersement=$("#txtVersMad");
	var eltResult=$("#txtResult");
	var eltLabelResult=$("#labelResult");
	var eltContentForm=$("#contentForm");
	var content="";
	var PASS=41136;/*2021 */
	var maxVersement=Math.round(73504);/*2020 */
	var Benefice=Math.round(eltBenefice.val().replace(/\s/g,'').replace(/,/g,'.')*100)/100;

	if(isNaN(Benefice)||Benefice===""){
		affErreur("Vous devez entrer votre revenu imposable en chiffre", eltBenefice);
	}else{
		Benefice=affRound(Benefice);
		eltBenefice.val(Benefice);
	}
	var Versement=Math.round(eltVersement.val().replace(/\s/g,'').replace(/,/g,'.')*100/100);

	if(isNaN(Versement)||Versement===""){
		affErreur("Vous devez indiquer le montant des versements Madelin retraite 2020", eltVersement);
	}else{

		Versement=affRound(Versement);
		eltVersement.val(Versement);
	}
	if(!fErreur){
		/*var assiette=Benefice+Versement;*/
		var assiette=Benefice;
		if(assiette>8*PASS){assiette=8*PASS;}
		if(Versement>maxVersement){versement=maxVersement;}
		var Tx1=PASS*0.1;
    var Tx2=(assiette>PASS)?(assiette-PASS)*0.25:0;//10% auquel s'ajoute 15% = 25%
    var DispoFiscal=Math.round(Tx1+Tx2);
		if(DispoFiscal<0.1*PASS){DispoFiscal=0.1*PASS;}// si plus favorable 10%*PASS
		var SoldeDispo=DispoFiscal-Versement;
		var DispoFiscalHtml=formatNumber(DispoFiscal.toFixed(0));
		var SoldeDispoHtml=formatNumber(SoldeDispo.toFixed(0));
		eltResult.attr('value',DispoFiscalHtml);
		if(SoldeDispo>=0){
			var content="Votre disponible fiscal retraite non utilis&eacute;&nbsp;est de <span class='teaser'>"+SoldeDispoHtml+ "&nbsp;&euro;</span>";
		}else{
			var content="Votre plafond de d&eacute;ductibilit&eacute; maximum de <span>"+DispoFiscalHtml+"&nbsp;&euro;</span> est atteint";
		}

		if(!$("#messageResult").length)
			eltContentForm.append("<output aria-live=\"assertive\" class=\"messageResult\" id=\"messageResult\">"+content+"</output>");
		else
			$("#messageResult").html(content);


		document.getElementById("messageResult").focus();
	}

	return false;
}
function formatNumber (num) {
    return num.toString().replace('.',',').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
}
 $(document).ready(function(){
 	$("#SimulMadelin").submit(calculSimMad);
 });

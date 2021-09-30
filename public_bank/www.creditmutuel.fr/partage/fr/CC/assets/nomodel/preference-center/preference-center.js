let page = "";
if(window.location.toString().split("/").reverse()[0].slice(0,16) == "newsletters.html")
	page="abonnement";
else if(window.location.toString().split("/").reverse()[0].slice(0,17) == "confirmation.html")
	page="confirmation";
else if(window.location.toString().split("/").reverse()[0].slice(0,11) == "emails.html")
	page="modification";
else if(window.location.toString().split("/").reverse()[0].slice(0,31) == "en-attente-de-confirmation.html")
	page="attente-confirmation";


if(typeof(trackEvent) !='undefined')
{
  switch (page) {
    case 'abonnement':
      trackEvent({category:'Formulaire', action:'AbonnementNewsletter', label:'Formulaire'});
      break;
    case 'confirmation':
      if(document.querySelector("#ei_tpl_content .a_blocappli .succes") && document.querySelector("#ei_tpl_content .a_blocappli .succes").innerText == "Votre désabonnement total est effectif à partir de maintenant.")
        trackEvent({category:'Formulaire', action:'Newsletter', label:'Desabonnement'});
      else if(document.querySelector("#ei_tpl_content .a_blocappli .alerte"))
        trackEvent({category:'Formulaire', action:'Newsletter', label:'erreurIdentifiant'});
      else
        trackEvent({category:'Formulaire', action:'Newsletter', label:'Confirmation'});
      break;
    case 'modification':
      if(document.querySelector("#ei_tpl_content .a_blocappli .alerte"))
        trackEvent({category:'Formulaire', action:'ModificationNewsletter', label:'erreurIdentifiant'});
      else
        trackEvent({category:'Formulaire', action:'ModificationNewsletter', label:'Formulaire'});
      break;
    case 'attente-confirmation':
      if(document.querySelector("#ei_tpl_content .a_blocappli .alerte"))
        trackEvent({category:'Formulaire', action:'Newsletter', label:'erreurIdentifiant'});
      else if(document.referrer.search("abonnements/emails.html") != -1)
          trackEvent({category:'Formulaire', action:'ModificationNewsletter', label:'attenteConfirmation'});
        else if(document.referrer.search("abonnements/newsletters.html") != -1)
          trackEvent({category:'Formulaire', action:'AbonnementNewsletter', label:'attenteConfirmation'});
      break;
    default:
      // statements_def
      break;
  }
}
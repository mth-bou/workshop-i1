$(document).ready(function(){
  // Selecteur JQuery pour les tuiles
  var vstTuiles = $(".cc .tile a"),
  vstTuilesLiensSelecteur = ".cc .tile a",
  // Clé de local storage 
  vstNomCleLocalStorage = "vst",
  // Variable stockant les tuiles visitées, qui sera enregistrée sous forme de JSON
  vstValue = {"tuilesVisitees": []};

  // Récupération des données JSON du localstorage si disponible
  if( localStorage.getItem(vstNomCleLocalStorage) != null ){
    vstValue = JSON.parse( localStorage.getItem(vstNomCleLocalStorage) );
  }

  // Au clic sur une des tuiles:
  $(vstTuiles).click(function(e){
    e.stopPropagation();

    // Récupération du href l'élément <a> de la tuile 
    var vstTuileHref;

    if($(this).prop("tagName") == "A"){
      vstTuileHref = $(this).attr("href");
    }else{
      vstTuileHref = $(this).find("a").attr("href");
    }

    // Si ce href existe, traitement de la tuile
    if( vstTuileHref ){

      // Création d'un nouvel objet tuile avec comme attributs son url un nombre de visite
      var vstNouvelleTuile = {
        url: vstTuileHref,
        nombreVisites: 1,
      }

      // Vérification de la présence de cette tuile dans les tuiles déjà enregistrées en local storage.
      var vstStorageTuilesLength = vstValue.tuilesVisitees.length,
      vstStorageTuileExiste = false;

      for(var i=0 ; i<vstStorageTuilesLength ; i++){
        var vstStorageCurrentTuile = vstValue.tuilesVisitees[i];
        
        // Si elle existe dans le local storage, on incrémente son nombre de visite...
        if(vstNouvelleTuile.url == vstStorageCurrentTuile.url){
          vstStorageCurrentTuile.nombreVisites++;
          vstStorageTuileExiste = true;
          break;
        }
      }

      // ...Sinon on la rajoute à la liste des tuiles stockées
      if(!vstStorageTuileExiste){
        vstValue.tuilesVisitees.push(vstNouvelleTuile);
      }

      // Sauvegarde des nouvelles données dans le localstorage
      localStorage.setItem(vstNomCleLocalStorage, JSON.stringify(vstValue) );
    }
  });
});
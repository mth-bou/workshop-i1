;
//MAJ le 30/04/2021 FX
//avec la MAJ des FAQ on a à présent uniquement besoin de gérer le rechargement de la masonry en contexte CIC

function initFaq() {
  //on relance la maçonnerie si l'on est dans un contexte de maçonerie
  if($('div.ei_cardboard').length && typeof $('div.ei_cardboard').masonry === "function")
  {
      RebuildTheWall();
      //on detecte l'affichage d'une réponse pour recalculer la masonnery (dans le cas ou la longueur de la réponse soit supérieure à la taille de la tuile)
      /*$("faq-questions").off().on('DOMNodeInserted', "[role='tabpanel']", function() {
          RebuildTheWall();
      });*/
      $(".FAQ_question").on('click', function() {
        RebuildTheWall();
    });
  }
}
   //Fonction qui reconstruit la maçonerie
   function RebuildTheWall() {
    $('div.ei_cardboard').each(function () {
        var myboard = $(this);
        myboard.Rebuild = function () {
            this.masonry({
                columnWidth: '.ei_gridsizer',
                gutter: '.ei_guttersizer',
                itemSelector: '.ei_cardboarditem',
                percentPosition: true
            });
        };
        myboard.find('img').load(function () {
            myboard.Rebuild(); //résout le problème safari : les images se chargent à postériori, il faut redéclencher le "layout"
        });
        myboard.Rebuild();
    });
}

/* =================== Gérer des FAQ en plié/déplié ============================ */
/*
$("faq-category").hide();
$("faq-category").before("<div class=\"loader faq-category-loader\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class=\"invisible\">Chargement</div></div>");

$("faq-category-group").hide();
$("faq-category-group").before("<div class=\"loader faq-category-group-loader\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class=\"invisible\">Chargement</div></div>");

var loadingCollapsed = 0;//utilisation d'une variable en plus du test sur le typeof initCollapse, car sinon appels multiples de collapsed.js tant qu'elle n'est pas chargée (typeof initCollapse passe à "function")

    function initFaq() {
        //console.log("#faq# init");
        //on appelle collapsed.js s'il n'a pas été chargé par ailleurs, sinon on relance l'initialisation de collapsed.js pour qu'il traite les nouveaux éléments ajoutés dans le DOM
         $.ajaxSetup({cache: true});//sinon les js sont rechargés systematiquements
         //console.log("initCollapse " + typeof initCollapse);
         if (typeof initCollapse == 'undefined' && loadingCollapsed === 0) {
                //console.log("Chargement de collapsed.js");
                loadingCollapsed=1;
                //console.log("show faq");
              $.getScript( "/partage/fr/CC/scripts/collapsed.js" )
                  .done(function( script, textStatus ) {
                    loadingCollapsed=0;
                    //console.log("#faq# collapsed.js chargee !");
                    initCollapse();
                    showFaq();
                  })
                  .fail(function( jqxhr, settings, exception ) {
                    console.log("Triggered ajaxError handler. jqxhr:"+jqxhr+" settings "+settings+" exception:"+exception );
                    console.log(jqxhr);
                });
         }
         else if (typeof initCollapse != 'undefined')
        {
            //console.log("#faq# initCollapse != 'undefined'");
            initCollapse();
            showFaq();
        }
    }

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
    function initFaq() {
        //on appelle collapsed.js s'il n'a pas été chargé par ailleurs, sinon on relance l'initialisation de collapsed.js pour qu'il traite les nouveaux éléments ajoutés dans le DOM
         //console.log("initCollapse " + typeof initCollapse);
         if (typeof initCollapse == 'undefined' && loadingCollapsed === 0) {
                //console.log("Chargement de collapsed.js");
                loadingCollapsed=1;
                //console.log("show faq");
                loadScript("/partage/fr/CC/scripts/collapsed.min.js", initCollapseLoaded)

         }
         else if (loadingCollapsed === 1)
        {
            initCollapse();
            showFaq();
        }
    }

var initCollapseLoaded = function() {
   loadingCollapsed=0;
    //console.log("collapsed.js chargee !");
    initCollapse();
    showFaq();
};



    function showFaq() {
        //console.log("#faq# showFaq");

        $(".faq-category-loader").remove();
        $("faq-category").show();
        $(".faq-category-group-loader").remove();
        $("faq-category-group").show();
        //on relance la maçonnerie si l'on est dans un contexte de maçonerie
        if($('div.ei_cardboard').length && typeof $('div.ei_cardboard').masonry === "function")
        {
            RebuildTheWall();
            //on detecte l'affichage d'une réponse pour recalculer la masonnery (dans le cas ou la longueur de la réponse soit supérieure à la taille de la tuile)
            $("faq-questions").off().on('DOMNodeInserted', "[role='tabpanel']", function() {
                RebuildTheWall();
            });
        }
        //si on a une ancre vers une item d'faq
        var urlHash = window.location.href.split("#")[1];
        if ($("#"+urlHash).data("collapsed") == "yes") {
            $("#"+urlHash).parents().each(function(index, el) {
               if($(this).attr("aria-hidden") == "true")
               {
                $(this).prev().click();
               }
            });
            $("#"+urlHash).click();

            //on scrolle jusqu'a la définition ***************************
            //Calcul du décalage liés aux éléments sticky
            var stickyHeight = 0;
            if (typeof $("#ei_tpl_head").attr('data-sticky')=='undefined')
                stickyHeight = $('#ei_tpl_head').outerHeight();//hauteur du header
            $("*[data-sticky]").each(function(){
                stickyHeight += $(this).outerHeight();
            });
            //-------------------------------
            OffsetTop = Math.floor( $("#"+urlHash).offset().top - stickyHeight );
            //console.log("urlHash "+urlHash+" toto :"+OffsetTop+" stickyHeight"+stickyHeight);
            //$('html, body').animate( { scrollTop: OffsetTop }, 900 );


            $('html,body').animate({scrollTop: OffsetTop }, 900, "swing").promise().then(function(){
                //APE - 24/02/16 - on donne le focus à l'élément ciblé pour que la tabulation suive un ordre logique
                if($("#"+urlHash).attr("tabindex") == undefined || $("#"+urlHash).attr("tabindex") == null || $("#"+urlHash).attr("tabindex") == ""){
                    if ($("#"+urlHash).is(":hidden") || $("#"+urlHash).is(":disabled") || !$("#"+urlHash).is(":input, a[href], area[href], iframe")){
                        $("#"+urlHash).attr("tabindex","-1"); //si l'élément ne pouvait pas prendre le focus, on fait en sorte qu'il puisse
                        $("#"+urlHash).css("outline","none"); //mais on ne le montre pas
                    }
                }
                $("#"+urlHash).focus();
                $('html,body').scrollTop(OffsetTop);//FX: Sinon IE se positionne sur l'ancre à la prise de focus. Ce n'est pas très éléguants et ça fait un moche effet visuel (sous IE) mais je n'ai rien trouvé d'autre ...
            });

        }

    }


    function Scroll2Faq() {
        var urlHash = window.location.href.split("#")[1];
        if ( $( "#"+urlHash ).length && urlHash.slice(0,4)=="faq_") {
            $("#"+urlHash+" > h3").attr("data-collapsed","no").attr("aria-expanded","false");
            $("#"+urlHash+" > h3").next().attr("aria-hidden","false");
            $("#"+urlHash+" > h3").parent().attr("data-openedtab",$("#"+urlHash+" > h3").attr("id"));

                //décalage lié au header sticky
                var stickyHeight = 0;

                if (typeof $("#ei_tpl_head").attr('data-sticky')=='undefined')
                    stickyHeight = $('#ei_tpl_head').outerHeight();//hauteur du header

                $("*[data-sticky]").each(function(){
                    stickyHeight += $(this).outerHeight();
                });
                var target=$("#"+urlHash);
                target.focus();
                $('html,body').scrollTop(target.offset().top - stickyHeight);
                //IE et chrome retournent quand même à l'ancre... du coup astuce avec l'historique
                if(history.pushState) {
                    var sId = decodeURIComponent(window.location.hash);
                    history.pushState(null, null,sId);
                    history.back();
                }
        }
    }

*/

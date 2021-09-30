/****************************************/
/********** Scripts  *************/
/****************************************/
/* Description :                        */
/*  - Scripts commun 2017                   */
/* Responsabilité :                     */
/*  - équipe DIGITALE CM-CIC/AM         */
/* Historique :                         */
/*  - 10/10/2017 : maj FX             */
/*  -  07/12/2017 : Gilles
/*      ajout fct pour protection-des-donnees.html  */
/*       function getCookieExpireDate() => retourne la date d'expiration du cookie de consentement  */
/*  - 14/02/2018 : maj FX : ajout de la possibilité de lire le contenu de la lightbox dans la page + possibilté de mettre des liens de fermeture dans le contenu   */
/*  - 07/03/2018 : maj FX : Modif initClicks : gestion des target blank, unbind, modif pour évitter de prendre en lien les liens de mots clés   */
/*  - 18/09/2018 : maj BD : Tableaux responsives : Ajout de l'index du tableau lors de la création de ID pour les tableaux sans ID */
/*  - 20/02/2019 : maj AM/SB : Tooltips
/*  - 20/05/2019 : maj GH : Tableaux responsives :  correction décalage tableau avec td group */
/*  - 04/03/2020 : maj DB : Lazyload des images : ajout PlaceHolder + intersectionObserver */
/*  - 04/03/2020 : maj DB : ajout de polyfill dans sommary */
/*  - 11/03/2020 : correctif tableauResponsive double entries ref: cs<= colspan ajout du = correctif  */
/*                                                           */
/****************************************/
/****************************************/
/*
Summary
0.  Polyfill
1.  Gestion des cookie et du LocalStorage
2.  Extraction des paramétres d'URL
3.  Etendre la zone de clic
4.  lightbox
5.  Tableaux responsives
6.  Select Navigation
7.  Récupération de variables clients dans l'URL
8.  Lazyload des images
9.  Tooltips
10. Console "safe"
11. Test si une date est passée
XX.  Debug
**********************************************************************************************/

/*==========================================================================
0.  Polyfill
========================================================================== */

// Polyfill pour forEach pour IE 8 à 11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

/*==========================================================================
1.  Gestion des cookie et du LocalStorage
========================================================================== */
function setCookie(name, value, days, path) {
  if (path == undefined) path = '/';
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    expires = '; expires=' + date.toGMTString();
  } else expires = '';
  document.cookie = name + '=' + value + expires + '; path=' + path;
}
// ex : creation / ecriture cookie pour 1 journee : setCookie('myCookie', 'myValue', 1);

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
// lecture cookie : getCookie('myCookie');

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
}
//delete cookie : deleteCookie('myCookie');

function setLocalData(name, value, days) {
  // Le navigateur supporte le localStorage
  if (typeof window.localStorage == 'undefined') setCookie(name, value, days);
  else localStorage.setItem(name, value);
}

function getLocalData(name) {
  // Le navigateur supporte le localStorage
  var resultat;
  if (typeof window.localStorage == 'undefined') resultat = getCookie(name);
  else resultat = localStorage.getItem(name);

  return resultat;
}

function removeLocalData(name) {
  // Le navigateur supporte le localStorage
  if (typeof window.localStorage == 'undefined') deleteCookie(name);
  else localStorage.removeItem(name);
}

// pour retro-compatibilité anciens sites ----------------
function ReadCookie(cookieName) {
  // Lire les cookies du site
  var theCookie = '' + document.cookie;
  var ind = theCookie.indexOf(cookieName);
  if (ind == -1 || cookieName == '') return '';
  var ind1 = theCookie.indexOf(';', ind);
  if (ind1 == -1) ind1 = theCookie.length;
  return unescape(theCookie.substring(ind + cookieName.length + 1, ind1));
}
//--------------------------------------------------------
// pour protection-des-donnees.html

//Cette fonction retourne la date d'expiration du cookie de consentement
function getCookieExpireDate() {
  var cookieTimeout = 34214400000; // Le nombre de millisecondes que font 13 mois
  var date = new Date();
  date.setTime(date.getTime() + cookieTimeout);
  var expires = '; expires=' + date.toGMTString();
  return expires;
}

// En attendant de savoir pour la fonction getCookieI14 n'est pas trouvée
// spécifique Bancaire
function getCookieI14(name) {
  name += 'EQU';
  var cookie = ReadCookie('I14wirt').split('SEP');
  for (var i = 0; i < cookie.length; i++) {
    if (cookie[i].substr(0, name.length) == name) {
      var value = cookie[i].split('EQU');
      break;
    }
  }
  if (typeof value != 'undefined') {
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
//----------------------------------------------------------------------------------

/*==========================================================================
2.  Extraction des paramétres d'URL
========================================================================== */
function getVar(key, default_) {
  if (default_ == null) default_ = 0;
  key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&#]' + key + '=([^&#]*)');
  var qs = regex.exec(window.location.href);
  if (qs == null) return default_;
  else return qs[1];
}

/*==========================================================================
3.  Etendre la zone de clic
========================================================================== */

function initClicks(e) {
  $("[data-click='yes']").each(function () {
    var lien;
    $(this)
      .find('a')
      .each(function (index, el) {
        if (!$(this).hasClass('label')) {
          lien = $(this);
          return false; //on quite le each
        }
      });

    if (typeof lien == 'object') {
      $(this).addClass('clickable');
      $(this).unbind('click'); //on retire les différentes fonctions attachées au click au cas ou appel multiple é initClicks
      $(this).click(function (e) {
        lien.get(0).click();
        e.stopPropagation();
      });
      lien.click(function (e) {
        console.log($(this).attr('href'));
        e.stopPropagation();
      });
    }
  });
}
$(document).ready(initClicks);

/*==========================================================================
4.  lightbox
========================================================================== */

function openLightboxes(link) {
  //	console.log("link: "+link)
  var $this = $(link),
    options = $this.data(),
    $lightbox_opener = $this.attr('id'),
    $lightbox_title = options.lightboxTitle || '',
    $lightbox_class = $this.attr('href').substr(-3) == 'pdf' ? ' class="pdf"' : '',
    $lightbox_width = options.lightboxWidth || '',
    $lightbox_height = options.lightboxHeight || '',
    $lightbox_code,
    $lightbox_iframe = $this.attr('href'),
    $lightbox_type = 'iframe',
    $lightbox_overlay,
    $page = $('#lightbox_page');

  //Cas des lightbox lisant un contenu caché de la page et non une url
  if ($lightbox_iframe.substr(0, 1) == '#') $lightbox_type = 'innerHtml';

  if (
    $lightbox_iframe.substr(-3) == 'jpg' ||
    $lightbox_iframe.substr(-3) == 'gif' ||
    $lightbox_iframe.substr(-3) == 'png'
  )
    $lightbox_type = 'image';

  // console.log("type: " + $lightbox_type);

  // insert code at the end
  if ($lightbox_width !== '' && $lightbox_height !== '') {
    $lightbox_code =
      '<dialog id="lightbox"' +
      $lightbox_class +
      ' role="dialog" aria-labelledby="lightbox_title" style="width:' +
      $lightbox_width +
      ';height:' +
      $lightbox_height +
      '"><div role="document">';
  } else {
    if ($lightbox_width == '' && $lightbox_height !== '') {
      $lightbox_code =
        '<dialog id="lightbox"' +
        $lightbox_class +
        ' role="dialog" aria-labelledby="lightbox_title" class="nowidth" style="height:' +
        $lightbox_height +
        ';"><div role="document">';
    } else {
      if ($lightbox_width !== '') {
        $lightbox_code =
          '<dialog id="lightbox"' +
          $lightbox_class +
          ' role="dialog" aria-labelledby="lightbox_title" class="noheight" style="width:' +
          $lightbox_width +
          ';"><div role="document">';
      } else {
        $lightbox_code =
          '<dialog id="lightbox"' +
          $lightbox_class +
          ' role="dialog" aria-labelledby="lightbox_title" class="nowidth noheight"><div role="document">';
      }
    }
  }
  $lightbox_code +=
    '<button id="lightbox_close" class="close" data-opener="' +
    $lightbox_opener +
    '" title="Fermer"><span class="invisible">Fermer</span></button>';
  if ($lightbox_class !== '') {
    $lightbox_code +=
      '<a href="' +
      $lightbox_iframe +
      '" target="_blank" id="lightbox_fullscreen" class="fullscreen" title="Plein écran"><span class="invisible">Voir le <abbr>PDF</abbr> en plein écran</span></a>';
  } else {
    $lightbox_code +=
      '<a href="' +
      $lightbox_iframe +
      '" target="_blank" id="lightbox_fullscreen" class="fullscreen" title="Plein écran"><span class="invisible">Ouvrir en plein écran</span></a>';
  }
  if ($lightbox_title !== '') {
    $lightbox_code += '<h1 id="lightbox_title">' + $lightbox_title + '</h1>';
  }

  if ($lightbox_type == 'iframe') $lightbox_code += '<iframe src="' + $lightbox_iframe + '"></iframe>';
  else if ($lightbox_type == 'innerHtml') $lightbox_code += $($this.attr('href')).html();
  else if ($lightbox_type == 'image')
    $lightbox_code += '<figure><img src="' + $lightbox_iframe + '" alt="" /></figure>';

  $lightbox_code += '</div></dialog>';

  //console.log('----=== $lightbox_code ===----');
  //console.log($lightbox_code);
  $($lightbox_code).insertAfter($page);
  $page.attr('aria-hidden', 'true');

  if ($lightbox_width !== '') {
    if ($lightbox_width.indexOf('px') != -1) {
      halfwidth = Number($lightbox_width.replace('px', '')) / 2;
      $('#lightbox').css('left', 'calc(50% - ' + halfwidth + 'px)');
    }
    if ($lightbox_width.indexOf('%') != -1) {
      halfwidth = Number($lightbox_width.replace('%', '')) / 2;
      $('#lightbox').css('left', 'calc(50% - ' + halfwidth + '%)');
    }
  }

  // Overlay
  $lightbox_overlay = '<div id="overlay" title="Fermer"><span class="invisible">Fermer la fenétre</span></div>';
  $($lightbox_overlay).insertAfter($('#lightbox'));

  $('#overlay').show().fadeTo(500, 0.6);
  $('#lightbox').animate(
    {
      top: '130px',
    },
    'slow',
    'swing'
  );
  $('#lightbox_close').focus();
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
  $($focus).focus();
}

function initLightboxes(e) {
  // init
  //console.log( $('a.lightbox').length + " lightbox(s)");
  console.log('init');
  if ($('a.lightbox').length) {
    $('a.lightbox').each(function (index) {
      var $this = $(this);
      if ($this.attr('id') == undefined) {
        $this.attr('id', 'open_lightbox_' + index);
      }
    });

    if ($('#lightbox_page').length === 0) {
      $('body').wrapInner('<div id="lightbox_page"></div>');
    }

    // Au clic sur un a.lightbox
    $('a.lightbox').on('click', function (event) {
      event.preventDefault();
      openLightboxes($(this));
    });

    // Bouton de fermeture (et touche ESC)
    $('body').on('click', '#lightbox_close', function (event) {
      closeLightboxes();
    });
    //pour pouvoir ajouter un bouton de fermeture dans la lightbox
    $('body').on('click', '.lightbox_close', function (event) {
      closeLightboxes();
    });
    $('body').on('click', '#overlay', function (event) {
      closeLightboxes();
    });
    $('body').on('keydown', '#overlay', function (event) {
      closeLightboxes();
    });
    $('body').on('keydown', '#lightbox', function (event) {
      var $this = $(this);
      if (event.keyCode == 27) {
        // ESC
        closeLightboxes();
      }
    });

    // Au besoin, on peut déclencher l'ouverture de la lightbox via un paramétre "open" dans l'URL prenant la valeur de l'ID du lien é déclencher
    id2open = getVar('open');
    if (id2open != 0) {
      // console.log('id2open: ' + id2open);
      //				$("a#"+id2open).click();
      //				var eventClick = new Event('click');
      //				document.querySelector("a#"+id2open).dispatchEvent(eventClick);
      openLightboxes($('a.lightbox#' + id2open));
    }
  }
}
$(document).ready(initLightboxes);

/*==========================================================================
5.  Tableaux responsives
========================================================================== */
function responsiveEntries(table, index) {
  var tableID = table.attr('id') === undefined || table.attr('id') === '' ? 'rwd-' + index : table.attr('id');

  var deskTable = {
    entries: {},
  };

  // On récupère toutes les colonnes dans le thead et on les stocke dans l'objet deskTable
  var tableHeads = table.find('thead th:not([colspan])');

  if (tableHeads.length !== 0) {
    tableHeads.each(function (headsLoop) {
      deskTable.entries[headsLoop] = { heads: this.innerHTML, headings: {} };

      // Pour chaque ligne on récupère le couple texte + valeur
      var tableLines = table.find('tbody tr');
      tableLines.each(function (linesLoop) {
        tableHeadings = $(this).find('th');
        tableCells = $(this).find('td');

        var currentIndex = '';

        // On boucle sur chaque cellule
        for (var i = 0; i <= tableCells.length - 1; i++) {
          var cellColSpan = tableCells[i].colSpan;

          // Si le colspan est supérieur à 1 on stocke l'index actuel pour le réutiliser pour les autres colonnes
          cellColSpan > 1 ? (currentIndex = i) : (currentIndex = headsLoop);
          deskTable.entries[headsLoop].headings[linesLoop] = {
            text: tableHeadings[0].innerHTML,
            value: tableCells[currentIndex].innerHTML,
          };
        }
      });
    });
  } else {
    // Pour chaque ligne on récupère le couple texte + valeur
    var tableLines = table.find('tbody tr');

    deskTable.entries['headings'] = [];

    tableLines.each(function (linesLoop) {
      tableHeadings = $(this).find('th');
      tableCells = $(this).find('td');

      deskTable.entries['headings'].push({
        text: tableHeadings[0].innerHTML,
        values: [],
      });

      //On boucle sur chaque cellule
      for (var i = 0; i <= tableCells.length - 1; i++) {
        var cellColSpan = tableCells[i].colSpan;

        if (cellColSpan === 1) {
          deskTable.entries['headings'][linesLoop].values.push({
            text: tableCells[i].innerHTML,
          });
        }
      }
    });
  }

  // On crée le tableau responsive
  var mobileTable = '';

  // On récupère le nombre d'entrées
  var tableNumber = Object.keys(deskTable.entries.headings);

  // On boucle sur chacune pour récupérer le caption
  for (var i = 0; i < tableNumber.length - 1; i++) {
    for (var j = 0; j < deskTable.entries.headings[i].values.length; j++) {
      mobileTable += '<table id="' + tableID + '-alt-' + i + '" class="one-entry border RWD-M-alt">';
      mobileTable += '<caption>' + deskTable.entries.headings[i].text + '</caption>';
      mobileTable +=
        '<thead><tr><th colspan="' +
        tableNumber.length +
        '">' +
        deskTable.entries.headings[i].values[j].text +
        '</th></tr></thead>';
      mobileTable += '<tbody>';

      mobileTable += '<tr>';
      mobileTable += '<th scope="row">' + deskTable.entries.headings[i + 1].text + '</th>';
      mobileTable += '<td class="center">' + deskTable.entries.headings[i + 1].values[j].text + '</td>';
      mobileTable += '</tr>';
      mobileTable += '</tbody></table>';
      console.log(mobileTable);
    }
  }

  table.after(mobileTable);
}

// On ajoute tous les tableaux responsives après l'original

function responsiveEntriesOld(table, index) {
  // ajout d'un identifiant au tableau alternatif
  // Ajout de l'index du tableau lors de la cr�ation de ID pour les tableaux sans ID
  var tableId = table.attr('id') === undefined || table.attr('id') === '' ? 'rwd-' + index : table.attr('id');

  var tableData = table.data();
  var attrData = '';
  var colspan;

  for (var attr in tableData) {
    valeur = tableData[attr].replace('td', 'caption');
    attrData += ' data-' + attr + '="' + valeur + '"';
  }

  //console.log("tableId "+table.attr("id")+" "+tableId);
  //console.log($("[id^='"+tableId+"-alt-']").length);
  //et test de  la non-existantce dans le dom car la fonction se lance plusiiuers fois
  if ($("[id^='" + tableId + "-alt-']").length == 0) {
    cols = table.find('thead th:not([colspan])');
    linesTH = table.find('tbody th');
    linesTD = table.find('tbody td');
    linesTDwidthColspan = [];
    for (var c = 0; c < linesTD.length; c++) {
      /* On replique les cellules colspan dasn un tableau */
      if (linesTD[c].colSpan > 1) {
        colspan = linesTD[c].colSpan;
        if (linesTD[c].className == 'group') {
          colspan=colspan-1;//-1 car on recupere une cellule en moins correspondant au th d'un group colspan
        }
        for (var cs = 0; cs < colspan; cs++) {
          linesTD[c].classList.remove("center");// on retire le center d'un colspan pour les tableau alt
          linesTDwidthColspan.push(linesTD[c]);
        }
      } else {
        linesTDwidthColspan.push(linesTD[c]);
      }
      //console.log("tableId "+tableId+" c="+c+" linesTD[c].innerHTM="+linesTD[c].innerHTML+" class="+linesTD[c].className+" th="+linesTH.length+" colspan="+colspan);
      //console.log("tableId "+tableId+" c="+c+" linesTDwidthColspan[c].innerHTM="+linesTDwidthColspan[c].innerHTML+" class="+linesTDwidthColspan[c].className+" th="+linesTH.length+" colspan="+colspan);
    }
    /*
      console.log(
        '@linesTD.length ' + linesTD.length + ' @cols.length ' + cols.length + ' @linesTH.length ' + linesTH.length
      );
      console.log('@linesTDwidthColspan.length ' + linesTDwidthColspan.length + ' ##== ' + linesTH.length * cols.length);
    */
    newTables = '';
    for (var t = 0; t < cols.length; t++) {
      offset = 0; /* ajout de la variable offset pour decalage de l'indice dans tableau linesTDwidthColspan . La variable augmente de 1 lors d'une rupture (class="group) */
      newTables += '<table id="' + tableId + '-alt-' + t + '" class="one-entry border RWD-M-alt"' + attrData + '>';
      newTables += '<caption>' + cols[t].innerHTML + '</caption>';
      newTables += '<tbody>';
      for (var l = 0; l < linesTH.length; l++) {
        //console.log(" c="+c+" - t="+t+" - l=  "+l+" - col.length= "+cols.length+" - t+(l*cols.length)= "+(t+(l*cols.length))+" - class="+linesTDwidthColspan[t+(l*cols.length)].className+" html="+ linesTDwidthColspan[t+(l*cols.length)].innerHTML);
        //console.log(" [t + (l + offset) * cols.length] "+ (t + (l + offset) * cols.length) + " ### linesTDwidthColspan.length "+linesTDwidthColspan.length);
        attrClass = '';
        //console.log("index => "+numIndex);
        if (linesTDwidthColspan[t + (l + offset) * cols.length].className == 'group') {
          //affichage d'une rupture
          newTables +=
            '<tr><td class="group" colspan="2">' +
            linesTDwidthColspan[t + (l + offset) * cols.length].innerHTML +
            '</td></tr>';
            offset++; //incrementation du decalage d'indice
        }

          nameClass = linesTDwidthColspan[t + (l + offset) * cols.length].className;
          if (nameClass != '') {
            attrClass = " class='" + nameClass + "'";
          }

          newTables += '<tr>';
          newTables += '<th scope="row">' + linesTH[l].innerHTML + '</th>';
          newTables += '<td' + attrClass + '>' + linesTDwidthColspan[t + (l + offset) * cols.length].innerHTML + '</td>';
          newTables += '</tr>';





      }
      newTables += '</tbody>';
      newTables += '</table>';
    }
    //	table.hide();
    table.after(newTables);
  }
}

// function responsiveEntries(e, t) {
//     var l, n = void 0 === e.attr("id") || "" === e.attr("id") ? "rwd-" + t : e.attr("id"), i = e.data(), a = "";
//     for (var o in i)
//         valeur = i[o].replace("td", "caption"),
//         a += " data-" + o + '="' + valeur + '"';
//     if (0 == $("[id^='" + n + "-alt-']").length) {
//         cols = e.find("thead th:not([colspan])"),
//         linesTH = e.find("tbody th"),
//         linesTD = e.find("tbody td"),
//         linesTDwidthColspan = [];
//         for (var s = 0; s < linesTD.length; s++)
//             if (linesTD[s].colSpan > 1) {
//                 l = linesTD[s].colSpan - 1;
//                 for (var r = 0; r < l; r++)
//                     linesTDwidthColspan.push(linesTD[s])
//             } else
//                 linesTDwidthColspan.push(linesTD[s]);
//         newTables = "";
//         for (var c = 0; c < cols.length; c++) {
//             offset = 0,
//             newTables += '<table id="' + n + "-alt-" + c + '" class="one-entry border RWD-M-alt"' + a + ">",
//             newTables += "<caption>" + cols[c].innerHTML + "</caption>",
//             newTables += "<tbody>";
//             for (var d = 0; d < linesTH.length; d++)
//               if(linesTDwidthColspan[c + (d + offset) * cols.length]){
//                 "group" == linesTDwidthColspan[c + (d + offset) * cols.length].className && (newTables += '<tr><td class="group" colspan="2">' + linesTDwidthColspan[c + (d + offset) * cols.length].innerHTML + "</td></tr>",
//                 offset++),
//                 attrClass = "",
//                 nameClass = linesTDwidthColspan[c + (d + offset) * cols.length].className,
//                 "" != nameClass && (attrClass = " class='" + nameClass + "'"),
//                 newTables += "<tr>",
//                 newTables += '<th scope="row">' + linesTH[d].innerHTML + "</th>",
//                 newTables += "<td" + attrClass + ">" + linesTDwidthColspan[c + (d + offset) * cols.length].innerHTML + "</td>",
//                 newTables += "</tr>";
//               }
//             newTables += "</tbody>",
//             newTables += "</table>"
//         }
//         e.after(newTables)
//     }
// }
function responsiveLists(e, t) {
  var l = e.data(),
    n = '',
    i = !1,
    c = !1,
    a = void 0 === e.attr('id') || '' === e.attr('id') ? 'rwd-' + t : e.attr('id');
  for (var o in l) {
    valeur = l[o].replace('td', 'caption');
    n += ' data-' + o + '="' + valeur + '"';
    if ('caption' == o && 'yes' == valeur) {
      i = !0;
    }
    if ('mainReadingDirection' == o && 'column' == valeur) {
      c = !0;
    }
  }
  (lines = e.find('tbody tr')),
    (linesTH = e.find('thead th')),
    (linesTD = e.find('tbody td')),
    (caption = e.find('caption')),
    (colspan = 1),
    (colspanVal = ''),
    (colspanCount = 0),
    (newTables = ''),
    (i || c) && (newTables += '<h3 id="' + a + '-alt" class="RWD-M-alt">' + caption.html() + '</h3>');
  if (c) {
    //data-main-reading-direction==column
    for (var r = 0; r < linesTH.length; r++) {
      newTables += '<table class="one-entry border RWD-M-alt"' + n + '>';
      newTables += '<caption>' + linesTH[r].innerHTML + '</caption>';
      newTables += '<tbody>';
      for (var s = 0; s < lines.length; s++) {
        newTables += '<tr>';
        newTables += '<td>' + linesTD[r + s * linesTH.length - colspanCount].innerHTML + '</td>';
        newTables += '</tr>';
      }
      (newTables += '</tbody>'), (newTables += '</table>');
    }
  } else {
    //pas data-main-reading-direction //par defaut
    for (var s = 0; s < lines.length; s++)
      if (linesTD[s * linesTH.length - colspanCount] && 'group' == linesTD[s * linesTH.length - colspanCount].className)
        (newTables += '<h3 class="RWD-M-alt">' + linesTD[s * linesTH.length - colspanCount].innerHTML + '</h3>'),
          (colspanCount += linesTH.length - 1);
      else {
        lines[s].id
          ? (newTables += '<table class="one-entry border RWD-M-alt" id="ALT-' + lines[s].id + '"' + n + '>')
          : (newTables += '<table class="one-entry border RWD-M-alt"' + n + '>');

        if (linesTD[s * linesTH.length - colspanCount]) {
          newTables += '<caption>' + linesTD[s * linesTH.length - colspanCount].innerHTML + '</caption>';
        }

        newTables += '<tbody>';
        //GH pourquoi r=1?? => modif r=0 2020-10-20
        for (var r = 0; r < linesTH.length; r++) {
          console.log(
            't=' +
              s +
              ' - l=  ' +
              r +
              ' - lines.length= ' +
              lines.length +
              ' - linesTH.length= ' +
              linesTH.length +
              ' - l+(t*linesTH.length)= ' +
              (r + s * linesTH.length) +
              ' - colspanCount=' +
              colspanCount
          ),
            // newTables += "<tr>",
            // newTables += '<th scope="row">' + linesTH[r].innerHTML + "</th>",
            // colspan > 1 ? (newTables += "<td>" + colspanVal + "</td>",
            // colspan--) : (newTables += "<td>" + linesTD[r + s * linesTH.length - colspanCount].innerHTML.replace("#", "#ALT-") + "</td>",
            // linesTD[r + s * linesTH.length - colspanCount].colSpan > 1 && (colspan = linesTD[r + s * linesTH.length - colspanCount].colSpan,
            // colspanVal = linesTD[r + s * linesTH.length - colspanCount].innerHTML.replace("#", "#ALT-"),
            // colspanCount += colspan - 1)),
            // newTables += "</tr>";

            (newTables += '<tr>');

          newTables += '<th scope="row">' + linesTH[r].innerHTML + '</th>';

          if (colspan > 1) {
            (newTables += '<td>' + colspanVal + '</td>'), colspan--;
          } else if (linesTD[r + s * linesTH.length - colspanCount]) {
            newTables +=
              '<td>' + linesTD[r + s * linesTH.length - colspanCount].innerHTML.replace('#', '#ALT-') + '</td>';
          }

          if (
            linesTD[r + s * linesTH.length - colspanCount] &&
            linesTD[r + s * linesTH.length - colspanCount].colSpan > 1
          ) {
            colspan = linesTD[r + s * linesTH.length - colspanCount].colSpan;
            colspanVal = linesTD[r + s * linesTH.length - colspanCount].innerHTML.replace('#', '#ALT-');
            colspanCount += colspan - 1;
          }

          newTables += '</tr>';
        }
        (newTables += '</tbody>'), (newTables += '</table>');
      }
  }
  e.after(newTables);
}
function initResponsiveTable(e) {
  $('table.two-entry.RWD-M').each(function (index) {
    responsiveEntriesOld($(this), index);
  }),
    $('table.one-entry.RWD-M').each(function (index) {
      responsiveEntries($(this), index);
    }),
    $('table.list.RWD-M').each(function (e) {
      responsiveLists($(this));
    });
}
$(document).ready(initResponsiveTable);

/*==========================================================================
6.  Select Navigation
========================================================================== */
//références :
//https://www.smashingmagazine.com/2017/11/building-accessible-menu-systems/
//https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-collapsible.html
//a placer dans /CC/scripts/selectNav.js quand tout sera validé

function selectNav() {
  var selectNavInPage = 0;
  $('.selectNav').each(function () {
    selectNavInPage = 1;
    var target = $(this);

    $(this)
      .find('button')
      .off('click')
      .on('click', function (event) {
        openCloseMenu(target);
        event.preventDefault();
      });
  });

  if (selectNavInPage == 1) {
    //fermer les selects en cas de click en dehors
    $(document).mouseup(function (e) {
      $('.selectNav').each(function () {
        //si la cible clickée n'est pas le menu ou un de ces descendants
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0) {
          closeMenu($(this));
        }
      });
    });
    //fermer les selects en cas d'apuis sur la touche espace
    $('body')
      .off('keydown')
      .on('keydown', '.selectNav', function (event) {
        switch (event.which) {
          case 27: // ESC
            $('.selectNav').each(function () {
              closeMenu($(this));
            });
            break;

          case 9: // Tab : si on est sur le dernier item du menu, on ferme le menu
            if ($(document.activeElement).parent().is('li:last-child'))
              closeMenu($(document.activeElement).parent().parent().parent());
            break;

          /*case 16: // Shift + Tab
					break;*/

          case 36: // home : si on est dans le menu, on sélectionne le premier élément
            if ($(document.activeElement).parent().parent().is('ul'))
              $(document.activeElement).parent().parent().find('li:first-child a').focus();
            event.preventDefault(); // prevent the default action (scroll / move caret)
            break;

          case 35: // end : si on est dans le menu, on sélectionne le dernier élément
            if ($(document.activeElement).parent().parent().is('ul'))
              $(document.activeElement).parent().parent().find('li:last-child a').focus();
            event.preventDefault(); // prevent the default action (scroll / move caret)
            break;

          case 38: // up
            if (!$(document.activeElement).parent().is('li:first-child'))
              $(document.activeElement).parent().prev().find('a').focus();
            event.preventDefault(); // prevent the default action (scroll / move caret)
            break;

          case 40: // down
            if ($(document.activeElement).next().is('ul'))
              $(document.activeElement).next().find('li:first-child a').focus();
            else {
              if (!$(document.activeElement).parent().is('li:last-child'))
                $(document.activeElement).parent().next().find('a').focus();
            }
            event.preventDefault(); // prevent the default action (scroll / move caret)
            break;

          default:
            return; // exit this handler for other keys
        }
      });
  }
}

function openCloseMenu(target) {
  if (target.find('ul').length) {
    if (target.find('button').attr('aria-expanded') == 'false') {
      openMenu(target);
      var targetChildren = target.find('ul').children();
      var targetHeight = 0;

      targetChildren.each(function () {
        targetHeight += $(this).outerHeight();
      });

      if (targetHeight < 200) {
        target.find('ul').css({
          height: targetheight,
          overflow: 'hidden',
        });
      }
    } else {
      closeMenu(target);
    }
  }
}

function closeMenu(target) {
  target.find('button').attr('aria-expanded', 'false');
  target.find('ul').attr('hidden', 'hidden');
}

function openMenu(target) {
  target.find('button').attr('aria-expanded', 'true');
  target.find('ul').removeAttr('hidden');
  //sélection du premier élément
  target.find('ul li:first-child a').focus();
}

$(document).ready(selectNav);

/*==========================================================================
7.  Récupération de variables clients dans l'URL
========================================================================== */

function persoEmails() {
  if (getVar('rdCivil') != 0) {
    $('#Civilite').attr('value', getVar('rdCivil'));
  }
  if (getVar('txtNom') != 0) {
    $('#Nom').attr('value', getVar('txtNom'));
  }
  if (getVar('txtPrenom') != 0) {
    $('#Prenom').attr('value', getVar('txtPrenom'));
  }
  if (getVar('txtCaisse') != 0) {
    $('#Telephone').attr('value', getVar('txtCaisse'));
  }
  if (getVar('txtEmail') != 0) {
    $('#Email').attr('value', getVar('txtEmail'));
  }
  if (getVar('txtTelPers') != 0) {
    $('#Telephone').attr('value', getVar('txtTelPers'));
  }
}
$(document).ready(function () {
  persoEmails();
});

/*==========================================================================
8.	PlaceHolder - image très petite en premier chargement qui donnerait une image « flouter » en premier lieu, mais permettrai de consulter la page sans attente,
	Lazyload - remplacement de Placeholder après l’affichage de la page dans sa totalité et en fonction de la progression du scrolling (grace a IntersectionObserver - Polyfill pour IE),
	Utilisation des « SrcSet » et/ou "Picture/source" : chargement de l’image en fonction du média et/ou de l’affichage disponible
========================================================================== */

/* OLD ############################################################### */
/*var visuel = document.querySelectorAll("[data-lazy='yes']");
[].forEach.call(visuel, function(pointer) {

var newUrl;
  if(pointer.getAttribute("srcset"))
  {
      newUrl=pointer.getAttribute("srcset").replace(/\-lazy/g,"");//bien mettre le g pour faire un replace all
    //console.log("New srcset" + newUrl);
  	pointer.setAttribute("srcset",newUrl)
  }
  if(pointer.getAttribute("src"))
  {
      newUrl=pointer.getAttribute("src").replace(/\-lazy/g,"");//bien mettre le g pour faire un replace all
  	//console.log("New src" + newUrl);
  	pointer.setAttribute("src",newUrl)
  }
});*/
/* OLD ############################################################### */

// Fonction de préchargement d'image
function preloadImage(media) {
  var src = media.getAttribute('data-src');
  var srcset = media.getAttribute('data-srcset');
  if (src) {
    media.src = src;
    media.removeAttribute('data-src');
  } else if (srcset) {
    media.srcset = srcset;
    media.removeAttribute('data-srcset');
  }
}

// Instanciation de l'intersectionObserver pour le lazy loading
// https://www.w3.org/TR/intersection-observer/
// pas d'utilisation de poyfill sur IE

// Configuration de l'observer (optionnel)
var config = {
  rootMargin: '0px 0px 100px 0px',
  // threshold: 0  // Incompatible avec Safari, attention !
};

if (typeof IntersectionObserver == 'function') {
  // test la fonction
  var observer = new IntersectionObserver(function (entries, self) {
    // Pour chaque entrée ciblée (les images ici)
    entries.forEach(function (entry) {
      // L'API Javascript vérifie que l'entrée existe...
      if (entry.isIntersecting) {
        if ((entry.target.tagName == 'VIDEO' || entry.target.tagName == 'AUDIO') && entry.target.children.length > 0) {
          for (var source in entry.target.children) {
            var mediaSource = entry.target.children[source];
            if (typeof mediaSource.tagName === 'string' && mediaSource.tagName === 'SOURCE') {
              // mediaSource.src = mediaSource.dataset.src;
              preloadImage(mediaSource);
              entry.target.load(); // Recharge l'élément média
              self.unobserve(mediaSource);
            }
          }
        } else {
          // Modifie la data-src en src avec une fonction preloadImage()
          preloadImage(entry.target);
        }

        // L'image est chargée, l'API peut s'arrêter jusqu'à la prochaine, etc.
        self.unobserve(entry.target);
      }
    });
  }, config);
}

function Go_LazyLoading() {
  // Sélectionne les images et lance l'observer asynchrone
  var medias = document.querySelectorAll('[data-srcset]');
  //console.log(medias);
  medias.forEach(function (media) {
    // Observation des images à charger au fur et à mesure
    if (typeof IntersectionObserver == 'function') {
      // test la fonction
      observer.POLL_INTERVAL = 100;
      observer.observe(media);
    } else {
      preloadImage(media);
    }
  });
}
// lancement du LazyLoading en "Defer"
document.addEventListener('DOMContentLoaded', Go_LazyLoading);

/*==========================================================================
9.  Tooltips
========================================================================== */

function toogleTooltip(item) {
  $(item).parent().siblings('span').toggleClass('hidden');
}

function initTooltips(e) {
  $('abbr[data-tooltip]').each(function (index) {
    var tooltipContainer =
      '<span data-tooltip=" ><a href="#tt-' +
      index +
      '" aria-describedby="tt-' +
      index +
      '" data-smoothscrolling="false"><abbr>' +
      $(this).text() +
      '</abbr></a> <span id="tt-' +
      index +
      '" class="hidden" role="tooltip">' +
      $(this).attr('title') +
      '</span></span>';
    $(this).replaceWith(tooltipContainer);
  });

  // Clic sur l'abbr
  $("span[data-tooltip=''] abbr").click(function () {
    toogleTooltip(this);
    return false;
  });
  // Survol de l'abbr
  $("span[data-tooltip=''] abbr").mouseenter(function () {
    toogleTooltip(this);
  });
  $("span[data-tooltip=''] abbr").mouseleave(function () {
    toogleTooltip(this);
  });
  // Clavier
  $("span[data-tooltip='']").keyup(function () {
    toogleTooltip(this);
  });
  $("span[data-tooltip='']").keydown(function () {
    toogleTooltip(this);
  });
}
$(document).ready(initTooltips);

/*==========================================================================
10.  Console "safe"
========================================================================== */
var showLog = getCookie('amcdebug') == 1 ? true : false;
consoleAssert = function (exp, obj) {
  if (window.console && showLog) console.assert(exp, obj);
};
consoleClear = function () {
  if (window.console && showLog) console.clear();
};
consoleCount = function (lab) {
  if (window.console && showLog) console.count(lab);
};
consoleDebug = function (obj) {
  if (window.console && showLog) console.debug(obj);
};
consoleDir = function (obj) {
  if (window.console && showLog) console.dir(obj);
};
consoleDirxml = function (obj) {
  if (window.console && showLog) console.dirxml(obj);
};
consoleError = function (obj) {
  if (window.console && showLog) console.error(obj);
};
consoleGroup = function (data) {
  if (window.console && showLog) console.group(data);
};
consoleGroupCollapsed = function (data) {
  if (window.console && showLog) console.groupCollapsed(data);
};
consoleGroupEnd = function () {
  if (window.console && showLog) console.groupEnd();
};
consoleInfo = function (obj) {
  if (window.console && showLog) console.info(obj);
};
consoleLog = function (obj) {
  if (window.console && showLog) console.log(obj);
};
consoleProfile = function (lab) {
  if (window.console && showLog) console.profile(lab);
};
consoleProfileEnd = function () {
  if (window.console && showLog) console.profileEnd();
};
consoleTime = function (lab) {
  if (window.console && showLog) console.time(lab);
};
consoleTable = function (obj) {
  if (window.console && showLog) console.table(obj);
};
consoleTimeEnd = function (lab) {
  if (window.console && showLog) console.timeEnd(lab);
};
consoleTimeStamp = function (lab) {
  if (window.console && showLog) console.timeStamp(lab);
};
consoleTrace = function (obj) {
  if (window.console && showLog) console.trace(obj);
};
consoleWarn = function (obj) {
  if (window.console && showLog) console.warn(obj);
};
consoledebugger = function () {
  if (window.console && showLog) debugger;
};

/*==========================================================================
11. Test si une date est passée
========================================================================== */
/*
Les paramètres sont facultatifs
Est-ce que le 28/11/2020 23h59 59s 59ms  est passé ? isDateOver(2020,11,28,23,59,59,59)
Est-ce que le 28/11/2020 est passé ? isDateOver(2020,11,28)
Est-ce que l'année 2020 est passé ? isDateOver(2020)
*/
function isDateOver(year, month, day, hour, minutes, seconds, getMilliseconds) {
  function checkZero(data) {
    if (data.length == 1) {
      data = '0' + data;
    }
    return data;
  }

  if (year && year.toString().length == 4) year = checkZero(year.toString());
  else year = '0000';
  if (month && month.toString().length > 0 && month.toString().length < 3) month = checkZero(month.toString());
  else month = '00';
  if (day && day.toString().length > 0 && day.toString().length < 3) day = checkZero(day.toString());
  else day = '00';
  if (hour && hour.toString().length > 0 && hour.toString().length < 3) hour = checkZero(hour.toString());
  else hour = '00';
  if (minutes && minutes.toString().length > 0 && minutes.toString().length < 3)
    minutes = checkZero(minutes.toString());
  else minutes = '00';
  if (seconds && seconds.toString().length > 0 && seconds.toString().length < 3)
    seconds = checkZero(seconds.toString());
  else seconds = '00';
  if (getMilliseconds && getMilliseconds.toString().length > 0 && getMilliseconds.toString().length < 3)
    getMilliseconds = checkZero(getMilliseconds.toString());
  else getMilliseconds = '00';

  var formatDateToTest = Number(year + month + day + hour + minutes + seconds);

  var today = new Date();
  var actualDay = today.getDate().toString();
  var actualMonth = checkZero((today.getMonth() + 1).toString());
  var actualYear = checkZero(today.getFullYear().toString());
  var actualHour = checkZero(today.getHours().toString());
  var actualMinutes = checkZero(today.getMinutes().toString());
  var actualSeconds = checkZero(today.getSeconds().toString());
  var actualMilliseconds = checkZero(today.getMilliseconds().toString());
  var formatNow = Number(actualYear + actualMonth + actualDay + actualHour + actualMinutes + actualSeconds);

  if (formatNow > formatDateToTest) return true;
  else return false;
}

/*==========================================================================
XX.  Debug
========================================================================== */
var ed_tools = getCookie('debugAmc') == 1 ? true : false;

if (ed_tools) {
  $(document).ready(function () {
    var nestorLink = $('[data-nestor]').data('nestor');
    if (nestorLink != undefined && nestorLink != '') {
      var bar_ed_tools = '';
      bar_ed_tools = bar_ed_tools + '<div class="bar_debug_bad"><a target="blank" href="' + nestorLink + '">Nestor</a>'; //" | <a href=\"#js\" id=\"ShowHideAmcLink\" onclick=\"ShowHideAmcContent();\">AMC</a> | <a href=\"#js\" id=\"ShowHideACELink\" onclick=\"ShowHideACEContent();\">ACE</a></div></div>";
      $('body').addClass('debug').prepend(bar_ed_tools);
    }
  });
}

/* Fonction pour afficher les informations de la Sinbar*/
function sfWebDebugShowDetailsFor(debugTarget) {
  console.log('ddebug :' + debugTarget + ' ' + $('#' + debugTarget).css('display'));
  if ($('#' + debugTarget).css('display') == 'block') $('#' + debugTarget).css('display', 'none');
  else $('#' + debugTarget).css('display', 'block');

  $('.sfWebDebugTop').each(function (index, el) {
    if ($(this).attr('id') != debugTarget) $(this).css('display', 'none');
  });
}

// Patch pour erreur Chrome "ResizeObserver loop limit exceeded" CF SARA
window.onerror = function (message, file, line, col, error) {
  if (!error && message === 'ResizeObserver loop limit exceeded') {
    return;
  }
};

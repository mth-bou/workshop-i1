var InitMdResponsive=function(){function i(i){this.obj=i,0<this.obj.find("span.ei_mdrespinfo").length?this.IsAlreadyLoaded=!0:(this.IsAlreadyLoaded=!1,this.obj.prepend("<span class='ei_mdrespinfo'></span>"))}i.prototype.anchorbehavior=function(){var i=this.obj;if(!this.IsAlreadyLoaded){var e="inline"==i.find("span.ei_mdrespinfo").css("display"),d=!1;0<i.find("div.ei_md_envtech div.ei_md_nmaster").length&&(i.append("<div class='eir_md_showxs ei_mdr_nextblockmaster'></div>"),i.find("div.ei_md_envtech div.ei_md_nmaster").addClass("eir_md_hidexs").wrapInner("<div class='eir_techmd_nmaster'></div>")),e&&i.find("div.ei_mdr_nextblockmaster").append(i.find("div.ei_md_envtech div.ei_md_nmaster div.eir_techmd_nmaster")),$(window).resize(function(){(d=(!e||"inline"!=i.find("span.ei_mdrespinfo").css("display"))&&(!(!e||"none"!=i.find("span.ei_mdrespinfo").css("display"))||!e&&"inline"==i.find("span.ei_mdrespinfo").css("display")))&&e?(e=!1,i.find("div.ei_md_envtech div.ei_md_nmaster").append(i.find("div.ei_mdr_nextblockmaster div.eir_techmd_nmaster"))):d&&!e&&(e=!0,i.find("div.ei_mdr_nextblockmaster").append(i.find("div.ei_md_envtech div.ei_md_nmaster div.eir_techmd_nmaster")))})}},i.prototype.listboxbehavior=function(){var e=this.obj;if(!this.IsAlreadyLoaded){var d="inline"==e.find("span.ei_mdrespinfo").css("display");console.log(d);var i=!1;$("div.ei_titleblock.ei_mdr_maintitle").wrap("<div class='eir_md_hidexs' id='eir_techmd_maintitleId'></div>"),$("div.ei_titleblock.ei_mdr_maintitle .ei_titlelabel").wrapInner("<div class='eir_md_hidexs'></div>"),e.find("div.ei_titleblock.ei_mdr_titledetail div.ei_titlelabel").wrapInner("<div class='eir_md_hidexs'></div>"),0<e.find("div.ei_md_envtech div.ei_md_nmaster").length&&(e.append("<div class='eir_md_showxs ei_mdr_nextblockmaster'></div>"),e.find("div.ei_md_envtech div.ei_md_nmaster").addClass("eir_md_hidexs").wrapInner("<div class='eir_techmd_nmaster'></div>")),d&&(0==$("div#eir_techmd_maintitleId").length?e.find("div.ei_md_envtech").prepend("<div class='ei_titleblock ei_mdr_maintitle'><div class='ei_titlecontent'><div class='ei_titlelabelsblock'><div class='ei_titlelabel'></div></div></div></div>"):e.find("div.ei_md_envtech").prepend($("div.ei_titleblock.ei_mdr_maintitle")),e.find("div.ei_md_master ul.ei_md_masterroot").appendTo(e.find("div.ei_md_envtech div.ei_titleblock div.ei_titlelabel")),e.find("div.ei_md_envtech div.ei_titleblock div.ei_titlelabel ul.ei_md_masterroot").attr("tabindex","-1").wrap("<div class='ei_mdr_selectorsdetail'></div>"),e.find("div.ei_mdr_nextblockmaster").append(e.find("div.ei_md_envtech div.ei_md_nmaster div.eir_techmd_nmaster"))),e.find("ul.ei_md_masterroot a.ei_md_masterlink").click(function(i){if(d){if(!$(this).closest("ul.ei_md_masterroot").hasClass("ei_md_opened"))return $(this).closest("ul.ei_md_masterroot").addClass("ei_md_opened").focus(),i.stopPropagation(),!1;$(this).closest("ul.ei_md_masterroot").removeClass("ei_md_opened")}}),e.find("ul.ei_md_masterroot").blur(function(i){d&&setTimeout(function(){e.find("ul.ei_md_masterroot").removeClass("ei_md_opened")},200)}),$(window).resize(function(){(i=(!d||"inline"!=e.find("span.ei_mdrespinfo").css("display"))&&(!(!d||"none"!=e.find("span.ei_mdrespinfo").css("display"))||!d&&"inline"==e.find("span.ei_mdrespinfo").css("display")))&&d?(d=!1,e.find("div.ei_md_envtech div.ei_titleblock ul.ei_md_masterroot").removeAttr("tabindex").appendTo(e.find("div.ei_md_master div.ei_md_masterbody")),e.find("div.ei_md_envtech div.ei_titleblock div.ei_mdr_selectorsdetail").remove(),0<$("div#eir_techmd_maintitleId").length?$("div#eir_techmd_maintitleId").prepend($("div.ei_titleblock.ei_mdr_maintitle")):e.find("div.ei_md_envtech div.ei_titleblock").remove(),e.find("div.ei_md_envtech div.ei_md_nmaster").append(e.find("div.ei_mdr_nextblockmaster div.eir_techmd_nmaster"))):i&&!d&&(d=!0,0==$("div#eir_techmd_maintitleId").length?e.find("div.ei_md_envtech").prepend("<div class='ei_titleblock ei_mdr_maintitle'><div class='ei_titlecontent'><div class='ei_titlelabelsblock'><div class='ei_titlelabel'></div></div></div></div>"):e.find("div.ei_md_envtech").prepend($("div.ei_titleblock.ei_mdr_maintitle")),e.find("div.ei_md_master ul.ei_md_masterroot").appendTo(e.find("div.ei_md_envtech div.ei_titleblock div.ei_titlelabel")),e.find("div.ei_md_envtech div.ei_titleblock div.ei_titlelabel ul.ei_md_masterroot").attr("tabindex","-1").wrap("<div class='ei_mdr_selectorsdetail'></div>"),e.find("div.ei_mdr_nextblockmaster").append(e.find("div.ei_md_envtech div.ei_md_nmaster div.eir_techmd_nmaster")))})}},i.prototype.swipebehavior=function(e){var d=this.obj;if(this.IsAlreadyLoaded)!function(){0==d.find("div.ei_md_detail .ei_mdr_titledetail").length?d.find("div.ei_md_detail").prepend("<div class='ei_titleblock ei_mdr_titledetail'><div class='ei_titleback'><span class='eir_md_showxs'><a href='#' title='Pour retourner \xe0 la liste' class='ei_md_titlebackbutton'><span class='invisible'>Retour</span></a></span></div><div class='ei_titlecontent'><div class='ei_titlelabelsblock'><div class='ei_titlelabel'></div></div></div></div>"):d.find("div.ei_md_detail .ei_mdr_titledetail").hasClass("ei_titlelabel")?(d.find("div.ei_md_detail div.ei_titlelabel.ei_mdr_titledetail").wrap("<div class='ei_titleblock ei_mdr_titledetail'><div class='ei_titlecontent'><div class='ei_titlelabelsblock'></div></div></div>"),d.find("div.ei_md_detail div.ei_titleblock.ei_mdr_titledetail").prepend("<div class='ei_titleback'><span class='eir_md_showxs'><a href='#' title='Pour retourner \xe0 la liste' class='ei_md_titlebackbutton'><span class='invisible'>Retour</span></a></span></div>"),d.find("div.ei_md_detail div.ei_titlelabel.ei_mdr_titledetail").removeClass("ei_mdr_titledetail")):d.find("div.ei_md_detail .ei_mdr_titledetail").hasClass("ei_titleblock")&&0==d.find("div.ei_md_detail div.ei_titleblock.ei_mdr_titledetail div.ei_titleback").length&&d.find("div.ei_md_detail div.ei_titleblock.ei_mdr_titledetail").prepend("<div class='ei_titleback'><span class='eir_md_showxs'><a href='#' title='Pour retourner \xe0 la liste' class='ei_md_titlebackbutton'><span class='invisible'>Retour</span></a></span></div>");d.find("div.ei_md_detail a.ei_md_titlebackbutton").unbind("click.rwdmd"),d.find("div.ei_md_detail a.ei_md_titlebackbutton").bind("click.rwdmd",n)}();else{var i="2";0==d.find("li.ei_md_masteritem.ei_md_selected").length&&(i="1");var t=d.hasClass("ei_md_synchronous"),_=!1,l="inline"==d.find("span.ei_mdrespinfo").css("display"),a=!1;$("div.ei_titleblock.ei_mdr_maintitle").wrap("<div class='eir_md_hidexs' id='eir_techmd_maintitleId'></div>"),0==d.find("div.ei_md_detail .ei_mdr_titledetail").length?d.find("div.ei_md_detail").prepend("<div class='ei_titleblock ei_mdr_titledetail'><div class='ei_titleback'><span class='eir_md_showxs'><a href='#' title='Pour retourner \xe0 la liste' class='ei_md_titlebackbutton'><span class='invisible'>Retour</span></a></span></div><div class='ei_titlecontent'><div class='ei_titlelabelsblock'><div class='ei_titlelabel'></div></div></div></div>"):d.find("div.ei_md_detail .ei_mdr_titledetail").hasClass("ei_titlelabel")?(d.find("div.ei_md_detail div.ei_titlelabel.ei_mdr_titledetail").wrap("<div class='ei_titleblock ei_mdr_titledetail'><div class='ei_titlecontent'><div class='ei_titlelabelsblock'></div></div></div>"),d.find("div.ei_md_detail div.ei_titleblock.ei_mdr_titledetail").prepend("<div class='ei_titleback'><span class='eir_md_showxs'><a href='#' title='Pour retourner \xe0 la liste' class='ei_md_titlebackbutton'><span class='invisible'>Retour</span></a></span></div>"),d.find("div.ei_md_detail div.ei_titlelabel.ei_mdr_titledetail").removeClass("ei_mdr_titledetail")):d.find("div.ei_md_detail .ei_mdr_titledetail").hasClass("ei_titleblock")&&0==d.find("div.ei_md_detail div.ei_titleblock.ei_mdr_titledetail div.ei_titleback").length&&d.find("div.ei_md_detail div.ei_titleblock.ei_mdr_titledetail").prepend("<div class='ei_titleback'><span class='eir_md_showxs'><a href='#' title='Pour retourner \xe0 la liste' class='ei_md_titlebackbutton'><span class='invisible'>Retour</span></a></span></div>"),t&&(d.find("div.ei_md_detail").append("<div class='ei_md_fondloader'><div class='ei_md_loader'><img src='/fr/images/std/load_ajax.gif' alt='En cours de chargement ...' /></div></div>"),d.find("div.ei_md_detail").addClass("ei_dynrelativepos")),"formselectorType"==e&&d.find("div.ei_md_detail div.ei_titleblock.ei_mdr_titledetail .ei_titlelabel").wrapInner("<div class='eir_md_hidexs'></div>"),l&&(0<$("div#eir_techmd_maintitleId").length&&(d.find("div.ei_md_envtech").prepend($("div.ei_titleblock.ei_mdr_maintitle")),d.find("div.ei_md_envtech div.ei_titleblock.ei_mdr_maintitle").wrap("<div class='eir_md_showxs ei_mdr_envtechmaintitle'></div>")),_="2"==i?("formselectorType"==e?d.find("div.ei_md_envtech").animate({width:["toggle","linear"],opacity:["toggle","linear"]},0,function(){d.find("div.ei_md_master ul.ei_md_masterroot").appendTo(d.find("div.ei_md_detail div.ei_titlelabel")),d.find("div.ei_md_detail ul.ei_md_masterroot").attr("tabindex","-1").wrap('<div class="ei_mdr_selectorsdetail"></div>')}):d.find("div.ei_md_envtech").animate({width:["toggle","linear"],opacity:["toggle","linear"]},0),!0):(d.find("div.ei_md_detail").animate({width:["toggle","linear"],opacity:["toggle","linear"]},0),!1),d.find("div.ei_md_separator").hide()),d.find("ul.ei_md_masterroot a.ei_md_masterlink").click(function(i){if(t&&d.find(".ei_md_fondloader").show(),l)if("formselectorType"==e)if($(this).closest("ul.ei_md_masterroot").parent().hasClass("ei_md_masterbody"))d.find("div.ei_md_separator").hide(),d.find("div.ei_md_envtech").animate({width:["toggle","linear"],opacity:["toggle","linear"]},500,function(){d.find("div.ei_md_master ul.ei_md_masterroot").appendTo(d.find("div.ei_md_detail div.ei_titlelabel")),d.find("div.ei_md_detail ul.ei_md_masterroot").attr("tabindex","-1").wrap('<div class="ei_mdr_selectorsdetail"></div>')}),d.find("div.ei_md_detail").animate({width:["toggle","linear"],opacity:["toggle","linear"]},500),_=!0;else{if(_=!0,!$(this).closest("ul.ei_md_masterroot").hasClass("ei_md_opened"))return $(this).closest("ul.ei_md_masterroot").addClass("ei_md_opened").focus(),i.stopPropagation(),!1;$(this).closest("ul.ei_md_masterroot").removeClass("ei_md_opened")}else d.find("div.ei_md_separator").hide(),d.find("div.ei_md_envtech").animate({width:["toggle","linear"],opacity:["toggle","linear"]},500),d.find("div.ei_md_detail").animate({width:["toggle","linear"],opacity:["toggle","linear"]},500),_=!0}),d.find("ul.ei_md_masterroot").blur(function(i){l&&"formselectorType"==e&&$(this).closest("ul.ei_md_masterroot").parent().hasClass("ei_mdr_selectorsdetail")&&setTimeout(function(){d.find("div.ei_mdr_selectorsdetail ul.ei_md_masterroot").removeClass("ei_md_opened")},200)}),$(window).resize(function(){(a=(!l||"inline"!=d.find("span.ei_mdrespinfo").css("display"))&&(!(!l||"none"!=d.find("span.ei_mdrespinfo").css("display"))||!l&&"inline"==d.find("span.ei_mdrespinfo").css("display")))&&l?(l=!1,_?("formselectorType"==e&&(d.find("div.ei_md_detail ul.ei_md_masterroot").removeAttr("tabindex").appendTo(d.find("div.ei_md_master div.ei_md_masterbody")),d.find("div.ei_md_detail div.ei_mdr_selectorsdetail").remove()),d.find("div.ei_md_envtech").animate({width:["toggle","linear"],opacity:["toggle","linear"]},0),_=!1):d.find("div.ei_md_detail").animate({width:["toggle","linear"],opacity:["toggle","linear"]},0),d.find("div.ei_md_separator").show(),0<d.find("div.ei_md_envtech>div.ei_mdr_envtechmaintitle").length&&$("div#eir_techmd_maintitleId").append($("div.ei_md_envtech div.ei_mdr_envtechmaintitle div.ei_titleblock.ei_mdr_maintitle")),d.find("div.ei_md_envtech div.ei_mdr_envtechmaintitle").remove()):a&&!l&&(l=!0,_="2"==i?("formselectorType"==e&&(d.find("div.ei_md_master ul.ei_md_masterroot").appendTo(d.find("div.ei_md_detail div.ei_titlelabel")),d.find("div.ei_md_detail ul.ei_md_masterroot").attr("tabindex","-1").wrap('<div class="ei_mdr_selectorsdetail"></div>')),d.find("div.ei_md_envtech").animate({width:["toggle","linear"],opacity:["toggle","linear"]},0),!0):(d.find("div.ei_md_detail").animate({width:["toggle","linear"],opacity:["toggle","linear"]},0),!1),d.find("div.ei_md_separator").hide(),0<$("div#eir_techmd_maintitleId").length&&(d.find("div.ei_md_envtech").prepend($("div.ei_titleblock.ei_mdr_maintitle")),d.find("div.ei_md_envtech div.ei_titleblock.ei_mdr_maintitle").wrap("<div class='eir_md_showxs ei_mdr_envtechmaintitle'></div>")))}),d.find("div.ei_md_detail a.ei_md_titlebackbutton").bind("click.rwdmd",n)}function n(i){return"formselectorType"==e&&(d.find("div.ei_md_detail ul.ei_md_masterroot").removeAttr("tabindex").appendTo(d.find("div.ei_md_master div.ei_md_masterbody")),d.find("div.ei_md_detail div.ei_mdr_selectorsdetail").remove()),d.find("div.ei_md_detail").animate({width:["toggle","linear"],opacity:["toggle","linear"]},500,function(){d.find("div.ei_md_separator").hide()}),d.find("div.ei_md_envtech").animate({width:["toggle","linear"],opacity:["toggle","linear"]},500),_=!1}},$("div.ei_md.ei_mdr_formselector").each(function(){new i($(this)).swipebehavior("formselectorType")}),$("div.ei_md.ei_mdr_objectselector").each(function(){new i($(this)).swipebehavior("objectselectorType")}),$("div.ei_md.ei_mdr_formselectorlistbox").each(function(){new i($(this)).listboxbehavior()}),$("div.ei_md.ei_mdr_anchorselector").each(function(){new i($(this)).anchorbehavior()})};$(document).ready(function(){InitMdResponsive();try{$j(document).ajaxStop(InitMdResponsive)}catch(i){}$(document).ajaxStop(InitMdResponsive)});
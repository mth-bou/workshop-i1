function OpenLB(o,n,e){return $("#"+o).hasClass("ei_newlb")&&0<$("script[src$='ei_tools.js']").length?(ei_bodynoscroll(!0),OpenLightBox(o),$("#"+n).focus(),ei_centerbox(o)):(OpenLightBox(o,e),$("#"+n).focus()),!1}function CloseLB(o,n){return CloseLightBox(o,n),$("#"+o).hasClass("ei_newlb")&&0<$("script[src$='ei_tools.js']").length&&ei_bodynoscroll(!1),!1}function OpenLightBox(n,o){function e(){$("#bg_modal_name").css({height:$(document).height(),width:$(document).width()})}function i(){$("#"+n).css({top:$(this).scrollTop()+$(window).height()/2,left:$(this).scrollLeft()+$(window).width()/2})}$("#"+n).fadeIn(function(){null!=o&&o()});var t=$("#"+n).height()/2,l=$("#"+n).width()/2;return $("#"+n).css({"margin-top":-t,"margin-left":-l}),$("body").append('<div id="bg_modal_name" class="blocfondmodal bg-'+n+'"></div>'),$("div.blocfondmodal").css({filter:"alpha(opacity=60)"}).fadeIn(),$("body").bind("keydown.lb",function(o){27==o.keyCode&&$("#"+n+"  .btnclose").click()}),!1!==jQuery.support.boxModel||$("#"+n).hasClass("ei_newlb")||(e(),i(),$(window).resize(function(){e(),i()}),$(window).scroll(function(){e(),i()})),!1}function CloseLightBox(o,n){$("body").unbind("keydown.lb"),$("#bg_modal_name.bg-"+o+", #"+o).fadeOut(function(){$("#bg_modal_name.bg-"+o).remove(),$(this).is("#bg_modal_name.bg-"+o)&&null!=n&&n()})}
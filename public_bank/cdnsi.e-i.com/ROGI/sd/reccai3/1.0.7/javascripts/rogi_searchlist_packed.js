$(function(){function k(a){return $("#"+a).fadeIn(),$("body").append('<div id="mapbgmodal" style="width:100%;height:100%;background:black;position:fixed;left:0;top:0;opacity:0"></div>'),$("#mapbgmodal").fadeTo("slow",0.6),!1}function h(a){$("#mapbgmodal, #"+a).fadeOut(function(){$("#mapbgmodal").remove()})}var g=$.browser.msie,c=(g&&$.browser.version<7,$(window)),d=$("#rslt"),j=($("#rslt_lst"),$("#rslt_block"));j.length&&j.show();var b=j.offset();resultBlockPositionRefresh=function(){var l=!1,n=0;if(c.scrollTop()>b.top){n=c.scrollTop()-b.top;var a=d.height()-j.outerHeight();n>a&&(n=a,l=!0)}};$("#map_popup");if(mapSearchShowDialog=function(){var q=window.CDM.Geo.PoiMap,p=(window.CDM.Geo,q.map.getBounds()),r="SearchMap.aspx?"+server.boundsNorthEastLatitudeId+"="+p.getNorthEast().lat()+"&"+server.boundsNorthEastLongitudeId+"="+p.getNorthEast().lng()+"&"+server.boundsSouthWestLatitudeId+"="+p.getSouthWest().lat()+"&"+server.boundsSouthWestLongitudeId+"="+p.getSouthWest().lng()+"&"+server.queryStringParameterFilter;if(q.infowindow){var s=q.infowindow.getPosition(),l={};l[server.selectionLatitudeId]=s.lat(),l[server.selectionLongitudeId]=s.lng(),r+="&"+jQuery.param(l)}return $("#map_popup_content").html('<iframe src="'+r+'" width="100%" height="100%" scrolling="no" frameBorder="0"></iframe>'),k("map_popup"),!1},$("#map_close_btn").click(function(){return h("map_popup"),!1}),elementIsWindowVisible=function(l){var p=$(window).scrollTop(),a=p+$(window).height(),q=$(l).offset().top,r=q+$(l).height();return r>=p&&a>=q},itmIdFromLatLng=function(a){return(Math.round(1000000*a.lat())/1000000+"c"+Math.round(1000000*a.lng())/1000000).replace(/\./g,"d").replace("-","m")},itemLatLngFromId=function(a){a=a.replace(/d/g,".").replace(/m/g,"-");var i=a.indexOf("c");return new window.CDM.Geo.LatLng(parseFloat(a.substr(0,i)),parseFloat(a.substr(i+1)))},itmHghlght=null,itmHghlghtLockd=!1,itmHghlghtEnable=function(a,i){(!itmHghlghtLockd||i)&&(itmHghlght&&itmHghlght.removeClass("stabilo"),$item=$(a),$item.length>0?($item.addClass("stabilo"),itmHghlght=$item,itmHghlghtLockd=i):(itmHghlght=null,itmHghlghtLockd=!1))},itmHghlghtDisable=function(a){(!itmHghlghtLockd||a)&&(itmHghlght&&($item=$(itmHghlght),$item.length>0&&$item.removeClass("stabilo")),itmHghlght=null,itmHghlghtLockd=!1)},$("li.rslt_itm").each(function(){var a=$(this).attr("id"),i=$("div.ico a",this);i.click(function(){var p=window.CDM.Geo.PoiMap,l=(window.CDM.Geo,itemLatLngFromId(a)),q=p.markers[l.toString()];if(q&&q.DetailOpenInfoWindow){q.DetailOpenInfoWindow()}else{var r=p.map.getZoom();17>r&&(r=17),window.CDM.Geo.PoiMap.panToMarkerSinglePopup(l,r)}return !1})}),$("li.rslt_itm").each(function(){var a=$("div.schdl_short",this),i=$("a.schdl_show",this);i.click(function(){return a.is(":visible")?($(this).removeClass("masquer").addClass("afficher"),a.hide()):($(this).removeClass("afficher").addClass("masquer"),a.show()),!1})}),window.CDM){var f=window.CDM.Geo.PoiMap,m=window.CDM.Geo;f.markerSingleZoomMax=null,f.markerSingleCreated=function(a){var i="#"+itmIdFromLatLng(a.getPosition());a.DetailOpenInfoWindowOpened=function(){itmHghlghtEnable(i,!0)},m.event.addListener(a,"mouseover",function(){itmHghlghtEnable(i)}),m.event.addListener(a,"mouseout",function(){f.infowindow&&f.infowindow.map||itmHghlghtDisable()}),m.event.addListener(a,"click",function(){if(itmHghlghtEnable(i,!0),$item=$(i),$item.length){var e=$item[0];e&&(elementIsWindowVisible($item)||$item[0].scrollIntoView(!0))}})},m.OnLoadCallbackFinished=function(){f.markerDetailOpenInfoWindowGetNew=function(a){var i=new InfoBox({content:a,boxClass:"map_info_box",closeBoxMargin:"3px 3px 3px 3px",pixelOffset:new m.Size(-95,-70),alignBottom:!0,infoBoxClearance:new m.Size(20,70)});return m.event.addListener(i,"domready",function(){$lblLink=$("div.map_info_box div.content span.lbl a"),$lblLink.attr("href",$lblLink.attr("href")+"&"+server.filterQueryString)}),m.event.addListener(i,"closeclick",function(){itmHghlght&&itmHghlghtDisable(!0)}),i},m.event.addListener(f.map,"bounds_changed",function(){!itmHghlght||f.infowindow&&f.infowindow.map||itmHghlghtDisable(!0)})}}});
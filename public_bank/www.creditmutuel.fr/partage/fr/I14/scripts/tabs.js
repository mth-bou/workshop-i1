;

/* =================== Onglets ============================ */
(function() {
    function initTabs(e) {
        $("[data-tabs=yes]").each(function(t){
			var tabs = $(this);
			var nbTabs = tabs.children().length;
			var nTab = 1;
			var titlesTag = $(this).attr("data-tabs-titles");

			var tabsList = '<ul class="tabs" role="tablist">';
			tabs.children().each(function(i){
				$(this).attr("id","panel"+(t+1)+"-"+(i+1)).find(titlesTag).addClass('invisible');
				$(this).attr("role","tabpanel").attr("aria-labelledby","tab"+(t+1)+"-"+(i+1));
				if (i==0) {
					tabsList += '<li class="sel" role="presentation"><a id="tab'+(t+1)+'-'+(i+1)+'" role="tab" aria-controls="panel'+(t+1)+'-'+(i+1)+'" tabindex="0" aria-selected="true" data-nTab="'+(i+1)+'">'+$(this).find(titlesTag).html()+'</li>';
				} else {
					$(this).attr("aria-hidden","true");
					tabsList += '<li role="presentation"><a id="tab'+(t+1)+'-'+(i+1)+'" role="tab" aria-controls="panel'+(t+1)+'-'+(i+1)+'" tabindex="-1" aria-selected="false" data-nTab="'+(i+1)+'">'+$(this).find(titlesTag).html()+'</li>';
				}
			});
			tabsList += '</ul>';
			tabs.prepend(tabsList);

			var tabList = tabs.find('.tabs');
			tabList.find('a').click(function() {
				tabList.children(':eq('+(nTab-1)+')').removeClass('sel').find("a").attr("tabindex","-1").attr("aria-selected","true");
				tabs.children(':eq('+(nTab)+')').attr("aria-hidden","true");
				nTab = $(this).attr('data-nTab');
				tabList.children(':eq('+(nTab-1)+')').addClass('sel').find("a").attr("tabindex","0").attr("aria-selected","false");
				tabs.children(':eq('+(nTab)+')').attr("aria-hidden","false");
			});

			tabs.keypress(function(e) {
                console.log("DL: "+e.keyCode+" this : "+$(this));
                console.log("Ctrl? "+e.ctrlKey);
                if (!e.ctrlKey) {
					if ((e.keyCode == 39) || (e.keyCode == 40)) { // Droite ou bas
						e.preventDefault();
						if (nTab < nbTabs) {
							tabList.children(':eq('+(nTab)+')').find("a").focus().click();
						}
					}
					if ((e.keyCode == 37) || (e.keyCode == 38)) { // Gauche ou haut
						e.preventDefault();
						if (nTab > 0) {
							tabList.children(':eq('+(nTab-2)+')').find("a").focus().click();
						}
					}
					if (e.keyCode == 36) { // Début
						e.preventDefault();
						tabList.children(':eq(0)').find("a").focus().click();
					}
					if (e.keyCode == 35) { // Fin
						e.preventDefault();
						tabList.children(':eq('+(nbTabs-1)+')').find("a").focus().click();
					}
				} else {
					if ((e.keyCode == 37) || (e.keyCode == 38)) { // Gauche ou haut
						e.preventDefault();
						tabList.children(':eq('+(nTab-1)+')').find("a").focus();
					}					
				}
			});

        });
    }
    $(document).ready(initTabs);
})();
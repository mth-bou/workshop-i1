;

/* ============= Dynamiser les formulaires issus du générateur V2 ================ */
function initRequired() {
    // Tous les champs requis, avec des valeurs min/max ou des patterns à respecter
    $(".i_blocgenform input").blur(function() {
//console.log("qui?" + $(this).attr("id"));
        $(this).parent().find('.err-msg').remove();
        if ( (this.type=="checkbox") || (this.type=="radio") ) { // Je suis une case à cocher
            if ( $(this).filter(':invalid').length > 0) {
                $(this).parent().parent().addClass("invalid");
                $(this).parent().append('<span class="err-msg">' + $(this).attr('data-err-msg')+'</span>');
            } else {
                $(this).parent().parent().removeClass("invalid");
            }
        } else {
            if ( $(this).filter(':invalid').length > 0) {
                if (this.value=="") { // Je suis vide
                    $(this).parent().parent().addClass("invalid");
                    $(this).parent().append('<span class="err-msg">' + $(this).attr('data-err-msg')+'</span>');
                } else {
                    if (this.type=="email") { // Je suis une adresse e-mail
                        $(this).parent().parent().addClass("invalid");
                        $(this).parent().append('<span class="err-msg">' + $(this).attr('data-err-format-msg')+'</span>');
                    } else {
                        if ($(this).attr("min") || $(this).attr("max")) { // Si j'ai un attribut min ou max -> je suis un nombre
                            if ( eval($(this).attr('value') +'<'+ $(this).attr('min')) || eval($(this).attr('value') +'>'+ $(this).attr('max')) ) {
                                $(this).parent().parent().addClass("invalid");
                                $(this).parent().append('<span class="err-msg">' + $(this).attr('data-err-size-msg') + '</span>');
                            }
                        } else { // Sinon, je suis un texte et j'ai une expression regulière à respecter
                            var patt = new RegExp($(this).attr('pattern'));
    //console.log("pattern:" + patt);
    //console.log("if ( eval(" + $(this).attr('value') +"+'<'+ " + $(this).attr('min') + ") || eval(" + $(this).attr('value') + " +'>'+ " + $(this).attr('max') + ") || ( !RegExp(" + $(this).attr('pattern') + ").test(" + $(this).attr('value') + ") )) {");
                            if ( ( !RegExp($(this).attr('pattern')).test($(this).attr('value')) )) {
                                $(this).parent().parent().addClass("invalid");
    //console.log("message d'erreur:" + $(this).attr('data-err-size-msg') );
                                $(this).parent().append('<span class="err-msg">' + $(this).attr('data-err-size-msg') + '</span>');
                            }
                        }
                    }
                }
            } else {
                $(this).parent().parent().removeClass("invalid");
                $(this).parent().find('.err-msg').remove();
            }
        }
    });
    $(".i_blocgenform textarea").blur(function() {
        if ( $(this).filter(':invalid').length > 0) {
            $(this).parent().find('.err-msg').remove();
            $(this).parent().parent().addClass("invalid");
            $(this).parent().append('<span class="err-msg">' + $(this).attr('data-err-msg')+'</span>');
        } else {
            $(this).parent().find('.err-msg').remove();
            $(this).parent().parent().removeClass("invalid");
        }
    });
    $(".i_blocgenform select").blur(function() {
        if ( $(this).filter(':invalid').length > 0) {
            $(this).parent().find('.err-msg').remove();
            $(this).parent().parent().addClass("invalid");
            $(this).parent().append('<span class="err-msg">' + $(this).attr('data-err-msg')+'</span>');
        } else {
            $(this).parent().find('.err-msg').remove();
            $(this).parent().parent().removeClass("invalid");
        }
    });
    $(".i_blocgenform [role='radiogroup'] input[type='radio'][required]").change(function() {
//console.log("quel radiogroup ?" + $(this).attr("name"));
        $("#" + $(this).attr("name")).find('.err-msg').remove();
        $("#" + $(this).attr("name")).removeClass("invalid")
    });
    $(".i_blocgenform [role='radiogroup'] input[type='radio'][required]").blur(function() {
//console.log("quel radiogroup ?" + $(this).attr("name"));
//console.log("quelle valeur ? " + value);
//console.log("last ? " + $("#"+ $(this).attr("name") + " input[type='radio']").last().attr("id"));
//console.log("ID ? " + $(this).attr("id"));
//console.log("Est-ce le dernier radio ? " + ($(this).attr("id")==$("#"+ $(this).attr("name") + " input[type='radio']").last().attr("id")) );
        if ($(this).attr("id")==$("#"+ $(this).attr("name") + " input[type='radio']").last().attr("id")) {
            // C'est le dernier des radios
//console.log("value? " + getValue($(this).attr("name") );
            if (getValue($(this).attr("name")) == undefined) {
                $("#" + $(this).attr("name")).addClass("invalid");
                $("#" + $(this).attr("name")).append('<span class="err-msg">' + $("#" + $(this).attr("name")).attr('data-err-msg')+'</span>');
            }
        }
    });
}

function initRules() {
    $("[data-displayed-if]").each(function( index ) {
        FRMrules.push( new Rule( $(this).attr('data-displayed-if') , [$(this).attr('id')] , 'display') );
    });
    $("[data-disabled-if]").each(function( index ) {
        FRMrules.push( new Rule( $(this).attr('data-disabled-if') , [$(this).attr('id')] , 'disabled') );
    });
    $("[data-required-if]").each(function( index ) {
        FRMrules.push( new Rule( $(this).attr('data-required-if') , [$(this).attr('id')] , 'required') );
    });
    for (i = 0; i < FRMrules.length; i++) {
        FRMrules[i].n = i;
        FRMrules[i].initRule();
    }
}
 
function initRule() {
    this.rule = this.rule.replace(/#/g,'');
    for (e = 0; e < this.elts.length; e++) {
        this.elts[e] = this.elts[e].replace('#','');
        // On indique dans data-trigger la règle à appliquer
        if ($( "[id^='" + this.elts[e] + "']" ).attr('data-trigger') ) {
            if ( $( "[id^='" + this.elts[e] + "']" ).attr('data-trigger').indexOf(this.n)==-1 ) {
                $( "[id^='" + this.elts[e] + "']" ).attr('data-trigger',$( "[id^='" + this.elts[e] + "']" ).attr('data-trigger')+","+this.n);
            }
        } else  {
            $( "[id^='" + this.elts[e] + "']" ).attr('data-trigger',this.n);
        }
//console.log("data-trigger "+this.n+" sur : "+"#"+this.elts[e]);
        // On applique la règle à chaque changement des éléments ciblés
        $("[id^='" + this.elts[e] + "']").each(function(){
            $(this).change(function() {
                triggers = $(this).attr('data-trigger').split(",");
                for (t = 0; t < triggers.length; t++) {
//console.log("t: "+t);
                    FRMrules[triggers[t]].evalRule();
                }
               //FRMrules[$(this).attr('data-trigger')].evalRule();
            });
        });
    }
    this.evalRule();
}

function evalRule() {
    // On recupère la règle à évaluer
    theRule = this.rule.replace(/@/g,"");
//console.log( "rule " + this.n + ": " + theRule + " - type: " + this.ruleType + " - Elts: " + this.elts);
    // Pour chacun des élements, on recupère sa valeur
    for (e = 0; e < this.elts.length; e++) {
//console.log("getValue de "+this.elts[e]);
        theRule = theRule.replace( this.elts[e] , "'" + getValue(this.elts[e])+"'" );
    }
//console.log( "rule: " + theRule);
//console.log( "eval: " + eval(theRule));
    if ( eval(theRule) ) {
        for (j = 0; j<this.IfTrue.length; j++) {
//console.log( "IfTrue: " + this.IfTrue[j] );
            switch (this.ruleType) {
                case "display":
                    $( "#"+this.IfTrue[j] ).show("easing");
                    $( "#"+this.IfTrue[j] ).attr("aria-hidden","false");
                    break;
                case "disabled":
                    $( "[id^='"+this.IfTrue[j]+"']").prop( "disabled", false );
                    break;
                case "required":
                    $( "#"+this.IfTrue[j] ).attr("aria-required","true");
                    $( "#"+this.IfTrue[j] ).attr("required","required");
                    break;
            }
        }        
    } else {
        for (j = 0; j<this.IfTrue.length; j++) {
            switch (this.ruleType) {
                case "display":
//console.log("IFTrue : "+this.IfTrue[j]);
                    $( "#"+this.IfTrue[j] ).hide("easing");  
                    $( "#"+this.IfTrue[j] ).attr("aria-hidden","true");
                    break;
                case "disabled":
                    $( "[id^='"+this.IfTrue[j]+"']").prop( "disabled", true );
                    break;
                case "required":
                    $( "#"+this.IfTrue[j] ).attr("aria-required","false");
                    $( "#"+this.IfTrue[j] ).removeAttr("required");
                    break;
            }
        }
    }
}

function getValue(name) {
//console.log("name:" + name)
//console.log("combien:" + $("input[id^='"+name.replace('#','')+"']").length)
    if ($("select[id^='"+name.replace('#','')+"']").length==1) { // SELECT
        val= $("select[id^='"+name.replace('#','')+"']").val();
    } else {
        if ($("textarea[id^='"+name.replace('#','')+"']").length==1) { // TEXTAREA
            val= $("textarea[id^='"+name.replace('#','')+"']").val();
        } else {
            if ($("input[id^='"+name.replace('#','')+"']").length==1) { // INPUT (éventuellement CHECKBOX unique)
//console.log("type? " + $("input[id^='"+name.replace('#','')+"']").attr("type"));
                if ($("input[id^='"+name.replace('#','')+"']").attr("type")=="checkbox") { // CHECKBOX unique
//console.log(">>> " + name +"coché? " + $("input[id^='"+name.replace('#','')+"']:checked").length);
                    if ($("input[id^='"+name.replace('#','')+"']:checked").length==1) {
                        val= $("input[id^='"+name.replace('#','')+"']").val();
                    } else {
                        val='';
                    }
//console.log(">>>>>> " + val + "!");
                } else { // INPUT
                    val= $("input[id^='"+name.replace('#','')+"']").val();
                }
            } else { // CHECKBOX multiples
                val = $("input[id^='"+name.replace('#','')+"']:checked").val();
            }
        }
    }
//console.log("val:" + val)
    return val;
}

function Rule(rule, IfTrue, ruleType) {
    this.n;
//console.log("rule:" + rule);
    this.elts = rule.replace(/@/g,'#').match(/#(.+?)(?=[\=\>\<\!]|$)/gi);
//console.log("rule replaced:" + rule.replace(/@/g,'#'));
//console.log("elts:" + this.elts);
//console.log("IfTrue:" + IfTrue);
    this.rule = rule.replace(/=/g,'==').replace(/ or /gi,'||').replace(/ and /gi,'&&');
    this.IfTrue = IfTrue;
    this.ruleType = ruleType; 

    this.initRule = initRule;
    this.evalRule = evalRule;
}

var FRMrules = [];

function addRule(rule, IfTrue, ruleType) {
    if(!ruleType) {
        var ruleType = "display";
    }
    FRMrules.push( new Rule(rule, IfTrue, ruleType) );
}

$(document).ready(function() {
    initRequired();
    initRules();
});

/* Historique :                         */
/*  - 20/01/2017 : maj FX : Corrections encodages accents cassés, gestion des input date (transformation des valeurs html5 yyyy-mm-dd au format dd/mm/yyyy attendu)            */
/*  - 02/11/2020 : maj FX : Corrections pour utiliser le name comme selecteur des champs dans tous les cas (plutôt que l'id ce qui posait des problèmes sur les champs pouvant être multiples type checkbox ou radio)           */
/*  - 04/11/2020 : FX on retire les paramètres d'URL utilisés pour pré-remplir le formulaire à la validation sinon, les valeurs ne passent pas bien message d'erreur d'FGEN */

/*
A faire : contextualiser en cas de formulaires multiple sur une même page
*/

/* Pour test
$(document).ready(function(){
  //on désactive la validation html5
  $(".ctxt-form-horizontal form").attr("novalidate","true");
});*/

//on defini getVar au cas ou FGenDyn2.js est appelée seule
if (typeof getVar == 'undefined') {
  function getVar(key, default_) {
    if (default_ == null) default_ = 0;
    key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&#]' + key + '=([^&#]*)');
    var qs = regex.exec(window.location.href);
    if (qs == null) return default_;
    else return qs[1];
  }
}

/* ============= Dynamiser les formulaires issus du générateur V2 ================ */
function validateInput(field) {
  //console.log('field', field);
  var target = '';
  $('.cc .form-control').length > 0 ? (target = '.form-control') : (target = '.form__control');

  valid = true;
  $('#err-msg-' + $(field).attr('id')).remove();
  if ($(field).attr('type') == 'checkbox' || $(field).attr('type') == 'radio') {
    // C'est une case à cocher ou un radio

    //on regarde s'il faut recalculer des champs liés à ce champs
    $('.i_blocgenform')
      .find("[data-required-if^='@" + $(field).attr('name') + "']")
      .each(function () {
        $(this).parent().removeClass('invalid');
        $(this).parent().removeClass('valid');
        $(this).parents(target).find('.err-msg').remove();
      });

    if (!$(field)[0].checkValidity()) {
      valid = false;
      $(field).parent().removeClass('valid');
      $(field).parent().addClass('invalid');

      if ($(field).attr('type') == 'radio') {
        //dans le cas des radios on affiche le message d'erreur aprés le dernier radio de la liste
        var radioName = $(field).attr('name');
        if (
          $(field).index("input:radio[name='" + radioName + "']") ==
          $(".i_blocgenform input:radio[name='" + radioName + "']").length - 1
        )
          $(field)
            .parents(target)
            .append(
              '<span class="err-msg" id="err-msg-' +
                $(field).attr('id') +
                '">' +
                $(field).attr('data-err-msg') +
                '</span>'
            );
      } else
        $(field)
          .parents(target)
          .append(
            '<span class="err-msg" id="err-msg-' +
              $(field).attr('id') +
              '">' +
              $(field).attr('data-err-msg') +
              '</span>'
          );
    } else {
      if ($(field).attr('type') == 'radio') {
        //dans le cas des radios on affiche le message d'erreur aprés le dernier radio de la liste
        var radioName = $(field).attr('name');
        $(".i_blocgenform input:radio[name='" + radioName + "']")
          .parents(target)
          .find('.err-msg')
          .remove();
        $(".i_blocgenform input:radio[name='" + radioName + "']")
          .parent()
          .removeClass('invalid');
      } else $(field).parent().removeClass('invalid');

      $(field).parent().addClass('valid');
    }
  } else {
    // console.log($(field).attr("name") +" : "+$(field)[0].checkValidity() +" : "+$(field).attr("value"));
    if (!$(field)[0].checkValidity()) {
      if ($(field).attr('value') === '' || $(field).attr('value') === undefined) {
        // Je suis vide
        valid = false;
        $(field).parent().removeClass('valid');
        $(field).parent().addClass('invalid');
        // console.log($(field).parents(".form-control"));
        $(field)
          .parents(target)
          .append(
            '<span class="err-msg" id="err-msg-' +
              $(field).attr('id') +
              '">' +
              $(field).attr('data-err-msg') +
              '</span>'
          );
      } else {
        if ($(field).attr('type') == 'email') {
          // Je suis une adresse e-mail
          valid = false;
          $(field).parent().removeClass('valid');
          $(field).parent().addClass('invalid');
          $(field)
            .parents(target)
            .append(
              '<span class="err-msg" id="err-msg-' +
                $(field).attr('id') +
                '">' +
                $(field).attr('data-err-format-msg') +
                '</span>'
            );
        } else {
          if ($(field).attr('min') || $(field).attr('max')) {
            // Si j'ai un attribut min ou max -> je suis un nombre
            if (
              eval($(field).attr('value') + '<' + $(field).attr('min')) ||
              eval($(field).attr('value') + '>' + $(field).attr('max'))
            ) {
              valid = false;
              $(field).parent().removeClass('valid');
              $(field).parent().addClass('invalid');
              $(field)
                .parents(target)
                .append(
                  '<span class="err-msg" id="err-msg-' +
                    $(field).attr('id') +
                    '">' +
                    $(field).attr('data-err-size-msg') +
                    '</span>'
                );
            }
          } else {
            // Sinon, je suis un texte et j'ai une expression regulière à respecter
            var patt = new RegExp($(field).attr('pattern'));
            if (!RegExp($(field).attr('pattern')).test($(field).attr('value'))) {
              valid = false;
              $(field).parent().removeClass('valid');
              $(field).parent().addClass('invalid');
              $(field)
                .parents(target)
                .append(
                  '<span class="err-msg" id="err-msg-' +
                    $(field).attr('id') +
                    '">' +
                    $(field).attr('data-err-size-msg') +
                    '</span>'
                );
            }
          }
        }
      }
    } else {
      $(field).parent().removeClass('invalid');
      $(field).parent().addClass('valid');
      $('#err-msg-' + $(field).attr('id')).remove();
    }
  }
  return valid;
}

function validateTextarea(field) {
  var target = '';
  $('.cc .form-control').length > 0 ? (target = '.form-control') : (target = '.form__control');
  valid = true;
  if (!$(field)[0].checkValidity()) {
    valid = false;
    $('#err-msg-' + $(field).attr('id')).remove();
    $(field).parent().removeClass('valid');
    $(field).parent().addClass('invalid');
    $(field)
      .parents(target)
      .append(
        '<span class="err-msg" id="err-msg-' + $(field).attr('id') + '">' + $(field).attr('data-err-msg') + '</span>'
      );
  } else {
    $('#err-msg-' + $(field).attr('id')).remove();
    $(field).parent().addClass('valid');
    $(field).parent().removeClass('invalid');
  }
  return valid;
}

function validateSelect(field) {
  var target = '';
  $('.cc .form-control').length > 0 ? (target = '.form-control') : (target = '.form__control');
  valid = true;
  if (!$(field)[0].checkValidity() && $(field).val() === '') {
    valid = false;
    $('#err-msg-' + $(field).attr('id')).remove();
    $(field).parent().removeClass('valid');
    $(field).parent().addClass('invalid');
    //console.log($('.form-control').length, $('.form__control').length);
    $(field)
      .parents(target)
      .append(
        '<span class="err-msg" id="err-msg-' + $(field).attr('id') + '">' + $(field).attr('data-err-msg') + '</span>'
      );
  } else {
    $('#err-msg-' + $(field).attr('id')).remove();
    $(field).parent().addClass('valid');
    $(field).parent().removeClass('invalid');
  }
  return valid;
}

/* FX: inutile ?
function validateRadios(field) {
  valid = true;
  rdGroup = $(field).attr("name");
//console.log("quel radiogroup ?" + $(field).attr("name"));
//console.log("quelle valeur ? " + $(field).attr("value"));
//console.log("last ? " + $("#"+ $(field).attr("name") + " input[type='radio']").last().attr("id"));
//console.log("ID ? " + $(field).attr("id"));
//console.log("Est-ce le dernier radio ? " + ($(field).attr("id")==$("#"+ $(field).attr("name") + " input[type='radio']").last().attr("id")) );
  if ($(field).attr("id")==$("#"+ $(field).attr("name") + " input[type='radio']").last().attr("id")) {
    // C'est le dernier des radios
//console.log(rdGroup );
    if (getValue($(field).attr("name")) == undefined) {
//console.log("msg? " + $('#'+rdGroup).attr('data-err-msg') );
      valid = false;
      $('#' + $(field).attr("name")).addClass("invalid");
      $('#' + $(field).attr("name")).prepend('<span class="err-msg" id="err-msg-'+$(field).attr('id')+'">' + $('#'+rdGroup).attr('data-err-msg') + '</span>');
//console.log( $('#' + $(field).attr("name")) );
    }
  }
  return valid;
}
*/
function initRequired() {
  // Tous les champs requis, avec des valeurs min/max ou des patterns à respecter
  /*$(".i_blocgenform input[type='text'],.i_blocgenform input[type='email'],.i_blocgenform input[type='number']").keyup(function() {
    validateInput(this);
  });*/
  $(".i_blocgenform input[type='text'],.i_blocgenform input[type='email'],.i_blocgenform input[type='number']")
    .off('keyup blur')
    .on('keyup blur', function (e) {
      validateInput(this);
    });

  $(".i_blocgenform input[type='radio'],.i_blocgenform input[type='checkbox']")
    .off('change')
    .on('change', function (e) {
      validateInput(this);
    });

  $('.i_blocgenform textarea')
    .off('blur')
    .on('blur', function (e) {
      validateTextarea(this);
    });
  /*
    $(".i_blocgenform select").change(function() {
      validateSelect(this);
    });
    $(".i_blocgenform select").blur(function() {
      validateSelect(this);
    });*/
  $('.i_blocgenform select')
    .off('change blur')
    .on('change blur', function (e) {
      validateSelect(this);
    });
}

function initRules() {
  //on supprime tous les attributs data-trigger au cas ou il y en ai qui trainent dans le code suite à de mauvais copiés/collé
  $('[data-trigger]').each(function (index) {
    $(this).removeAttr('data-trigger');
  });

  $('[data-displayed-if]').each(function (index) {
    //si le bloc n'a pas d'id on en créé un
    if ($(this).attr('id')) cible = $(this).attr('id');
    else {
      cible = 'datadisplayedif' + index;
      $(this).attr('id', cible);
    }
    FRMrules.push(new Rule($(this).attr('data-displayed-if'), [cible], 'display'));
  });
  $('[data-disabled-if]').each(function (index) {
    //si le bloc n'a pas d'id on en créé un
    if ($(this).attr('id')) cible = $(this).attr('id');
    else {
      cible = 'datadisplayedif' + index;
      $(this).attr('id', cible);
    }
    FRMrules.push(new Rule($(this).attr('data-disabled-if'), [$(this).attr('id')], 'disabled'));
  });
  $('[data-required-if]').each(function (index) {
    //si le bloc n'a pas d'id on en créé un
    if ($(this).attr('id')) cible = $(this).attr('id');
    else {
      cible = 'datadisplayedif' + index;
      $(this).attr('id', cible);
    }
    FRMrules.push(new Rule($(this).attr('data-required-if'), [$(this).attr('id')], 'required'));
  });
  for (i = 0; i < FRMrules.length; i++) {
    FRMrules[i].n = i;
    FRMrules[i].initRule();
  }
  //console.log(FRMrules);
}

function initRule() {
  //fx: remplacement des [id^= par des [name^= sinon des éléments autres que des champs de formulaires étaient ciblés (ex )
  //on prend un selecteur large pour rétro-compatibilité, nottament pour ciblage de champs se terminant par _dnfta (ex: data-displayed-if="@rdClient='client (::client::)'" alors que le champ en question à pour name rdClient_dfnta)
  //mais ne régle pas le soucis de noms en cascade ex: rdActionSuiteSinistre, rdActionSuiteSinistreDeclarationOk
  // console.log("Init rule"+this.n +" " +this.rule);

  this.rule = this.rule.replace(/#/g, '');
  if (this.elts != null) {
    for (e = 0; e < this.elts.length; e++) {
      //console.log("name " + this.elts[e]);
      var setOnChange = 0; //FX: correction car sinon le onchange était défini autant de fois qu'il y avait de régles sur un elt
      this.elts[e] = this.elts[e].replace('#', '');
      // On ajoute dans data-trigger la régle à appliquer
      if ($("[name^='" + this.elts[e] + "']").attr('data-trigger')) {
        if (
          $("[name^='" + this.elts[e] + "']")
            .attr('data-trigger')
            .indexOf(this.n) == -1
        ) {
          $("[name^='" + this.elts[e] + "']").attr(
            'data-trigger',
            $("[name^='" + this.elts[e] + "']").attr('data-trigger') + ',' + this.n
          );
        }
      } else {
        $("[name^='" + this.elts[e] + "']").attr('data-trigger', this.n);
        setOnChange = 1;
      }

      // On applique les régle à chaque changement des éléments ciblés
      //FX: correction car sinon le onchange était défini autant de fois qu'il y avait de régles sur un elt
      if (setOnChange == 1) {
        $("[name^='" + this.elts[e] + "']").each(function () {
          // console.log("set name " + $(this).attr("name") +" onchange");
          $(this).change(function () {
            //console.log("name : "+$(this).attr("name")+" id:"+$(this).attr("id"));
            triggers = $(this).attr('data-trigger').split(',');
            for (t = 0; t < triggers.length; t++) {
              //console.log("t: "+t);
              FRMrules[triggers[t]].evalRule();
              //console.log(FRMrules[triggers[t]]);
            }
            //FRMrules[$(this).attr('data-trigger')].evalRule();
          });
        });
      }
    }
    this.evalRule();
  }
}

function evalRule() {
  // On recupére la régle à évaluer
  theRule = this.rule.replace(/@/g, '');
  //console.log( "rule " + this.n + ": " + theRule + " - type: " + this.ruleType + " - Elts: " + this.elts);
  // Pour chacun des élements, on recupére sa valeur
  for (e = 0; e < this.elts.length; e++) {
    //console.log("getValue de "+this.elts[e]+"="+getValue(this.elts[e]));
    theRule = theRule.replace(this.elts[e], "'" + getValue(this.elts[e]) + "'");
  }
  //console.log( "rule: " + theRule);
  //console.log( "eval: " + eval(theRule));
  if (eval(theRule)) {
    for (j = 0; j < this.IfTrue.length; j++) {
      //console.log( "IfTrue: " + this.IfTrue[j] +" "+ this.ruleType);

      //FX: sinon jquery n'arrive pas à cibler les radio et autres id qui utilisent des caractéres spéciaux ex: rdCivil.Mme
      var target = this.IfTrue[j].replace(/(:|\.|\[|\]|,|=)/g, '\\$1');

      switch (this.ruleType) {
        case 'display':
          $('#' + target).show('easing');
          $('#' + target).attr('aria-hidden', 'false');
          break;
        case 'disabled':
          $('#' + target).prop('disabled', false);
          break;
        case 'required':
          $('#' + target).attr('aria-required', 'true');
          $('#' + target).attr('required', 'required');
          //console.log("#"+this.IfTrue[j] +" name:" +$( "#"+this.IfTrue[j].replace( /(:|\.|\[|\]|,|=)/g, "\\$1" ) ).attr("name"));
          break;
      }
    }
  } else {
    for (j = 0; j < this.IfTrue.length; j++) {
      if (this.IfTrue[j] != null && this.IfTrue[j] != undefined) {
        //FX: sinon jquery n'arrive pas à targetr les radio et autres id qui utilisent des caractéres spéciaux ex: rdCivil.Mme
        var target = this.IfTrue[j].replace(/(:|\.|\[|\]|,|=)/g, '\\$1');
        //console.log(target);
        switch (this.ruleType) {
          case 'display':
            // console.log("IFTrue "+j+" : "+this.IfTrue[j]);

            $('#' + target).hide('easing');
            $('#' + target).attr('aria-hidden', 'true');
            break;
          case 'disabled':
            $('#' + target).prop('disabled', true);
            break;
          case 'required':
            $('#' + target).attr('aria-required', 'false');
            $('#' + target).removeAttr('required');
            break;
        }
      }
    }
  }
}
/*
function getValue(name) {
  //console.log("Type:" + $("input[name^='"+name.replace('#','')+"']")[0].attr("type"))
  console.log($("input[name='"+name.replace('#','')+"']").prop("type"));
  //console.log("name:" + name)
  console.log("combien d'input:" + $("input[id^='"+name.replace('#','')+"']").length)
  //console.log("combien de select:" + $("select[id^='"+name.replace('#','')+"']").length)
  if ($("select[id^='" + name.replace('#', '') + "']").length == 1) { // SELECT
    //console.log("C'est un select");
    val = $("select[id^='" + name.replace('#', '') + "']").val();
  }
  else {
    if ($("textarea[id^='" + name.replace('#', '') + "']").length == 1) { // TEXTAREA
      val = $("textarea[id^='" + name.replace('#', '') + "']").val();
    }
    else {
      if ($("input[id^='" + name.replace('#', '') + "']").length == 1) { // INPUT (éventuellement CHECKBOX unique)
        //console.log("type? " + $("input[id^='"+name.replace('#','')+"']").attr("type"));
        if ($("input[id^='" + name.replace('#', '') + "']").attr("type") == "checkbox") { // CHECKBOX unique
          //console.log(">>> " + name +"coché? " + $("input[id^='"+name.replace('#','')+"']:checked").length);
          if ($("input[id^='" + name.replace('#', '') + "']:checked").length == 1) {
            val = $("input[id^='" + name.replace('#', '') + "']").val();
          }
          else {
            val = '';
          }
          //console.log(">>>>>> " + val + "!");
        }
        else { // INPUT
          val = $("input[id^='" + name.replace('#', '') + "']").val();
        }
      }
      else { // CHECKBOX multiples
        val = $("input[id^='" + name.replace('#', '') + "']:checked").val();
      }
    }
  }
  //console.log("val:" + val)
  return val;
}
*/

function getValue(name) {
  //on prend un selecteur large pour rétro-compatibilité, nottament pour ciblage de champs se terminant par _dnfta (ex: data-displayed-if="@rdClient='client (::client::)'" alors que le champ en question à pour name rdClient_dfnta)
  var cible = $("[name^='" + name.replace('#', '') + "']");
  var val = '';

  if (cible.length) {
    var type = cible.prop('type');
    if (type == 'checkbox' || type == 'radio') {
      cible.each(function (index) {
        if ($(this).prop('checked')) {
          if (val == '') val = $(this).val();
          else val = val + ';' + $(this).val();
        }
      });
    } else val = cible.val();
  }
  //console.log("val:" + val)
  return val;
}

function Rule(rule, IfTrue, ruleType) {
  this.n;
  // console.log("rule:" + rule);
  this.elts = rule.replace(/@/g, '#').match(/#(.+?)(?=[\=\>\<\!]|$)/gi);
  // console.log("rule replaced:" + rule.replace(/@/g,'#'));
  // console.log("elts:" + this.elts);
  // console.log("IfTrue:" + IfTrue);
  this.rule = rule.replace(/=/g, '==').replace(/ or /gi, '||').replace(/ and /gi, '&&');
  this.IfTrue = IfTrue;
  this.ruleType = ruleType;

  this.initRule = initRule;
  this.evalRule = evalRule;
}

var FRMrules = [];
// Variables utiles pour pouvoir scroller la page pour afficher le focus
//déplacés ds la function initSteps()
//var menuTop = $("#ei_tpl_head").height() + 3;
//var speed = 900;

function addRule(rule, IfTrue, ruleType) {
  if (!ruleType) {
    var ruleType = 'display';
  }
  FRMrules.push(new Rule(rule, IfTrue, ruleType));
}

function initSteps() {
  // Variables utiles pour pouvoir scroller la page pour afficher le focus
  var menuTop = $('#ei_tpl_head').height() + 3;
  var speed = 900;

  $("form[data-formsteps='true']").each(function (index) {
    // Insérer la barre de progression en haut du formulaires
    zeForm = $(this);
    divSteps = '<div class="steps" id="steps' + (i + 1) + '"><ol>';
    nSteps = 0;
    $(this)
      .find('fieldset')
      .each(function (i) {
        nSteps++;
        $(this).attr('id', 'fieldset' + (i + 1));
        divSteps +=
          '<li id="step' + (i + 1) + '" data-step="' + (i + 1) + '">' + $(this).find('legend').html() + '</li>';
        $(this).append(
          '<div class="form-buttons"><button class="button prev" id="prev' +
            (i + 1) +
            '">Précédent</button><button class="button next" id="next' +
            (i + 1) +
            '">Suivant</button></div>'
        );
        $(this)
          .find('#prev' + (i + 1))
          .click(function () {
            //console.log("Suivant ! "+i);
            zeForm.attr('data-step', i);
            $('#fieldset' + i + ' input:first').focus();
            sectionOffsetTop = Math.floor($('li#step' + i).offset().top - menuTop);
            $('html, body').animate(
              {
                scrollTop: sectionOffsetTop,
              },
              speed
            );
            return false;
          });
        $(this)
          .find('#next' + (i + 1))
          .click(function () {
            //console.log("Suivant ! "+(i+2));
            valid = true;
            $('#fieldset' + (i + 1) + ' input').each(function (index) {
              //console.log("valid: "+valid+" - input");
              //console.log(this);
              valid &= validateInput(this);
              //console.log("valid: "+valid);
            });
            $('#fieldset' + (i + 1) + ' textarea').each(function (index) {
              //console.log("valid: "+valid+" - textarea");
              //console.log(this);
              valid &= validateTextarea(this);
              //console.log("valid: "+valid);
            });

            /* FX: inutile ?
                $('#fieldset'+(i+1)+' [role="radiogroup"] input[type="radio"][required]').each(function( index ) {
        //console.log("valid: "+valid+" - radiogroup");
        //console.log(this);
                  valid &= validateRadios(this);
        //console.log("valid: "+valid);
                });
        */
            //console.log("valid? "+valid);
            if (valid) {
              zeForm.attr('data-step', i + 2);
              $('#fieldset' + (i + 2) + ' input:first').focus();
              sectionOffsetTop = Math.floor($('li#step' + (i + 2)).offset().top - menuTop);
              $('html, body').animate(
                {
                  scrollTop: sectionOffsetTop,
                },
                speed
              );
            } else {
              $('.form-group.invalid:first').each(function (index) {
                $(this).find('input:first').focus();
                sectionOffsetTop = Math.floor($(this).offset().top - menuTop);
                $('html, body').animate(
                  {
                    scrollTop: sectionOffsetTop,
                  },
                  speed
                );
              });
            }
            return false;
          });
      });
    divSteps += '</ol></di>';
    $(this).prepend(divSteps);
    $(this).attr('data-step', 1);
    $(this).attr('data-steps', nSteps);
    $('#prev1').remove();
    $('#next' + nSteps).replaceWith('<button class="button" type="submit">Envoyer</button>');
    $('.steps li').click(function () {
      //console.log("clic!");
      n = $(this).attr('data-step');
      if (n < zeForm.attr('data-step')) {
        zeForm.attr('data-step', n);
        $('#fieldset' + n + ' input:first').focus();
        sectionOffsetTop = Math.floor($('li#step' + n).offset().top - menuTop);
        $('html, body').animate(
          {
            scrollTop: sectionOffsetTop,
          },
          speed
        );
      }
    });
  });
}

$(document).ready(function () {
  initSteps();
  initRequired();
  initRules();
  //console.log(FRMrules);

  $(".i_blocgenform > form button[type='submit']").click(function (event) {
    event.preventDefault();
    event.stopPropagation();

    var result = [];

    //on teste tous les champs du formulaire et on affiche le message d'erreur si besoin
    $('.i_blocgenform input:visible').each(function () {
      result.push(validateInput(this));
    });
    $('.i_blocgenform textarea:visible').each(function () {
      result.push(validateTextarea(this));
    });
    $('.i_blocgenform select:visible').each(function () {
      result.push(validateSelect(this));
    });

    if (result.indexOf(false) === -1) {
      $(".i_blocgenform > form button[type='submit']").attr('disabled', 'disabled');
      $('.i_blocgenform > form').submit();
    }

    //on recherche le champ en erreur les plus "en haut" de la page
    //.offset().top;
    var minOffset = 0;
    //décalage lié au header sticky
    var stickyHeight = 0;
    $('*[data-sticky]').each(function () {
      stickyHeight += $(this).outerHeight();
    });

    //on place le focus sur le premier champ invalid
    $('.form-group.invalid').each(function () {
      /*
      $(".form-group.invalid input").each(function() {
        //$(this)[0] to get the dom object in the jQuery collection

        //Soucis : Si vous définissez un message d'erreur personnalisé setCustomValidity, l'élément est considéré comme invalide
        //il faut donc tester la validitée du champ "manuellement" via js, et le if($(this)[0].validity.valid === false) ci dessous ne marche pas ...
        if($(this)[0].validity.valid === false)
          {
            $(this)[0].setCustomValidity($(this).attr('data-err-msg'));
          }
          else
            $(this)[0].setCustomValidity("");
      });
      */
      minOffset = $(this).offset().top;
      $(this).focus();
      $('html,body').scrollTop(minOffset - (stickyHeight + 10));
      return false;
    });

    //gestion des input type="date"
    //Les champs html5 de type input="date" renvoeint une date au format yyyy-mm-dd (non modifiable). Comme pour les formulaires du groupe, le format attendu est dd/mm/yyyy, on convertit les valeurs avant envoi
    var regexDateFormatIso = /(2019|202[0-9])\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
    $(".i_blocgenform input[type='date']").each(function () {
      if ($(this).val().match(regexDateFormatIso)) {
        //on passe le champ au format texte, sinon il ne serra pas possible de lui attribuer une valeur de type dd/mm/yyyy
        $(this).attr('type', 'text');
        var tabDate = $(this).val().split('-');
        $(this).val(tabDate[2] + '/' + tabDate[1] + '/' + tabDate[0]);
      }
    });

    //MAJ FX le 04/11/2020 : on retire les paramètres d'URL utilisés pour pré-remplir le formulaire car sinon, les valeurs ne passent pas bien, conflit
    window.history.replaceState(null, null, window.location.pathname);
  });

  //renseignement de la page appelant le formulaire
  if ($('.cc #hidPage').length) $('.cc #hidPage').attr('value', document.location.href);
  //renseignement de la page précédente
  if ($('.cc #hidPagePrec').length);
  $('.cc #hidPagePrec').attr('value', document.referrer);
  //renseignement du code Procom s'il est passé en paramètre
  if (getVar('procom') != 0 && $('.cc #hidProcom').length) $('.cc #hidProcom').attr('value', getVar('procom'));

  //pré-remplissage automatique des formulaires si variables d'url correspondantes
  //Inutile FGEN le fait si on utilise les name des champs à remplir (bien faire attention aux _dnfta dans les noms)

  var t = location.search.substring(1).split('&');
  for (var i = 0; i < t.length; i++) {
    var x = t[i].split('=');
    if (x[0] != '' && x[0] != undefined) {
      var y = x[0].split('_');
      if (y[0] === '') {
        y[0] = undefined;
      }
      var cible = $('.cc .i_blocgenform form #' + y[0]);
      var valeur = unescape(x[1]);

      //pour les selects, checkbox et textes
      if (cible.length) {
        if (cible.attr('type') == 'checkbox') {
          if (valeur == '1') cible.prop('checked', true);
          else cible.prop('checked', false);
        } else if (cible.is('select'))
          cible.find("option[value='" + decodeURIComponent(x[1]) + "']").prop('selected', true);
        else cible.attr('value', valeur);
      } else if ($('input[name="' + x[0] + '"]').length && $('input[name="' + x[0] + '"]').attr('type') == 'radio') {
        var group = $('input[name="' + x[0] + '"]');

        if (group.length > 1) {
          group.each(function () {
            if ($(this).val() == valeur) $(this).prop('checked', true);
          });
        }
      }
    }
  }
});

(function() {

    'use strict';

    /*
     * jQuery accessible simple (non-modal) tooltip window, using ARIA
     * @version v2.2.0 
     * Website: https://a11y.nicolas-hoffmann.net/simple-tooltip/
     * License MIT: https://github.com/nico3333fr/jquery-accessible-simple-tooltip-aria/blob/master/LICENSE
     */

    function accessibleSimpleTooltipAria(options) {
        var element = $(this);
        options = options || element.data();
        var text = options.simpletooltipText || '';
        //var prefix_class = typeof options.simpletooltipPrefixClass !== 'undefined' ? options.simpletooltipPrefixClass + '-' : '';
        var content_id = typeof options.simpletooltipContentId !== 'undefined' ? '#' + options.simpletooltipContentId : '';
        var prefix_class = typeof options.tooltipPrefix !== 'undefined' ? options.tooltipPrefix : '';

        var index_lisible = Math.random().toString(32).slice(2, 12);
        var aria_describedby = element.attr('aria-describedby') || '';

        element.attr({
            'aria-describedby': 'label_simpletooltip_' + index_lisible + ' ' + aria_describedby
        });

        element.wrap('<span class="' + prefix_class + ' simpletooltip_container"></span>');

        var html = '<span class="js-simpletooltip simpletooltip" id="label_simpletooltip_' + index_lisible + '" role="tooltip" aria-hidden="true">';

        if (text !== '') {
            html += '' + text + '';
        } else {
            var $contentId = $(content_id);
            if (content_id !== '' && $contentId.length) {
                html += $contentId.html();
            }
        }
        html += '</span>';

        $(html).insertAfter(element);
    }

    // Bind as a jQuery plugin
    $.fn.accessibleSimpleTooltipAria = accessibleSimpleTooltipAria;

    $(document).ready(function() {

        //$('.js-simple-tooltip')
        $('[data-tooltip=yes]')
            .each(function(i) {
                // Créer les boutons
                $(this).removeClass("invisible");
                var $btn_label = $(this).html();
                var $tt_class = ( $(this).attr("class") != "undefined" )?' class="' + $(this).attr("class") + '"':'';
                var $tt_title = ( $(this).attr("title") != "undefined" )?' title="' + $(this).attr("title") + '"':'';
                var $tt_ariaLabel = ( $(this).attr("aria-label") != "undefined" )?' aria-label="' + $(this).attr("aria-label") + '"':'';
                var $tt_tooltipPrefix = ( $(this).data("tooltip-prefix") != "undefined" )?' data-tooltip-prefix="' + $(this).data("tooltip-prefix") + '"':'';

                if ( $(this).data("simpletooltip-text") ) {
                    var $tt_text = $(this).data("simpletooltip-text");
                    $(this).replaceWith('<button id="btn_tooltip'+i+'" data-tooltip="yes" '+$tt_tooltipPrefixt+' data-simpletooltip-text="'+$tt_text+'" ' + $tt_class + $tt_ariaLabel + '>'+$btn_label+'</button>');
                } else {
                    var $tt_content_id = "tooltip" + i;
                    $(this).next().attr("id","tooltip" + i);
                    $(this).next().removeClass("invisible");
                    $(this).next().addClass("hidden");
                    $(this).replaceWith('<button id="btn_tooltip'+i+'" data-tooltip="yes" '+$tt_tooltipPrefix+' data-simpletooltip-content-id="'+$tt_content_id+'" ' + $tt_class + $tt_ariaLabel + '>'+$btn_label+'</button>');
                    //$(this).data("simpletooltip-content-id", $tt_content_id);
                    //if ( $tt_class != '' ) {
                    //    $this.removeAttr("class");
                    //}
                    //if ( $tt_title != '' ) {
                    //    $this.removeAttr("title");
                    //}
                    //if ( $tt_ariaLabel != '' ) {
                    //    $this.removeAttr("aria-label");
                    //}
                    //$this.append('<button'+$tt_class+$tt_ariaLabel+$tt_title+'>'+$btn_label+'</button>');
                }


                // Call the function with this as the current tooltip
                //accessibleSimpleTooltipAria.apply($(this));
                accessibleSimpleTooltipAria.apply($('#btn_tooltip'+i));
            });

        // events ------------------
        $('body')
            .on('mouseenter focusin', 'button.tooltip', function() {
                var $this = $(this);
                var aria_describedby = $this.attr('aria-describedby');
                var tooltip_to_show_id = aria_describedby.substr(0, aria_describedby.indexOf(" "));
                var $tooltip_to_show = $('#' + tooltip_to_show_id);
                $tooltip_to_show.attr('aria-hidden', 'false');
            })
            .on('mouseleave', 'button.tooltip', function(event) {
                var $this = $(this);
                var aria_describedby = $this.attr('aria-describedby');
                var tooltip_to_show_id = aria_describedby.substr(0, aria_describedby.indexOf(" "));
                var $tooltip_to_show = $('#' + tooltip_to_show_id);
               // var $is_target_hovered = $tooltip_to_show.parent().find(":hover");

                //alert($target_hovered);
                //$target.addClass('redborder');
               // if (!$is_target_hovered) {
                    $tooltip_to_show.attr('aria-hidden', 'true');
                //}
            })
            .on('focusout', 'button.tooltip', function(event) {
                var $this = $(this);
                var aria_describedby = $this.attr('aria-describedby');
                var tooltip_to_show_id = aria_describedby.substr(0, aria_describedby.indexOf(" "));
                var $tooltip_to_show = $('#' + tooltip_to_show_id);

                $tooltip_to_show.attr('aria-hidden', 'true');
            })
            .on('mouseleave', '.js-simpletooltip', function() {
                var $this = $(this);
                $this.attr('aria-hidden', 'true');
            })
            .on('keydown', '.js-simple-tooltip', function(event) {
                // close esc key

                var $this = $(this);
                var aria_describedby = $this.attr('aria-describedby');
                var tooltip_to_show_id = aria_describedby.substr(0, aria_describedby.indexOf(" "));
                var $tooltip_to_show = $('#' + tooltip_to_show_id);

                if (event.keyCode == 27) { // esc
                    $tooltip_to_show.attr('aria-hidden', 'true');
                }
            });
    });

})();

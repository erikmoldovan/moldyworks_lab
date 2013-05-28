/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 10/3/12
 * Time: 11:46 AM
 * To change this template use File | Settings | File Templates.
 */

(function($){
    $.fn.hoverbox = function(){
        var element = $(this);
        var hoverBox = $('#hoverBox');
        var linkedDiv;

        function showHover(e){
            hoverBox.css({top: e.pageY, left: e.pageX + 10});
            hoverBox.text(element.attr('data-message'));
            hoverBox.show();
        }

        function hideHover(){
            hoverBox.hide();
        }

        function doTransition(dElement){
            dElement.addClass('light');
            dElement.css('opacity', .8);
            dElement.animate({opacity: .2}, 400);
        }

        function removeTransition(dElement){
            dElement.removeClass('light');
        }

        element.hover(
            function(e){
                linkedDiv = $('#part' + this.id.slice(-1));

                doTransition($(this));
                doTransition(linkedDiv);
                showHover(e);
            },
            function(){
                removeTransition($(this));
                removeTransition(linkedDiv);
                hideHover();
        })
    }
})(jQuery);

function sympatheticHover(){
    $.each($('.list'), function(){
        $(this).hoverbox(this)
        });
}

function init(){
    sympatheticHover();
}

$(document).ready(function(){init()});
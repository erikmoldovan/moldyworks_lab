/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 10/3/12
 * Time: 11:46 AM
 * To change this template use File | Settings | File Templates.
 */

(function($){
    $.fn.doTransition = function(){
        this.addClass('light');
        this.css('opacity', .8);
        this.animate({opacity: .2}, 400);
    };

    $.fn.removeTransition = function(){
        this.removeClass('light');
    };

    $.fn.hoverbox = function(){
        var element = $(this);
        var hoverBox = $('#hoverBox');

        function showHover(e){
            hoverBox.css({top: e.pageY, left: e.pageX + 10});
            console.log(hoverBox.position().left , hoverBox.position().top);
            console.log(e.pageX , e.pageY);
            hoverBox.show();
        }

         function hideHover(){
            hoverBox.hide();
        }

        element.hover(function(e){
                console.log(e.pageX , e.pageY);
                linkedDiv = $('#part' + this.id.slice(-1));

                $(this).doTransition();
                linkedDiv.doTransition();
                showHover(e);
            },
            function(){
                $(this).removeTransition();
                linkedDiv.removeTransition();
                hideHover();
        })
    }
})(jQuery);

function sympatheticHover(){
    var linkedDiv;
    var hoverBox;
    $('.list').hoverbox(this);
}

function init(){
    sympatheticHover();
}

$(document).ready(function(){init()});
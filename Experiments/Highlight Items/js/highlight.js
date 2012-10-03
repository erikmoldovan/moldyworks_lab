/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 10/3/12
 * Time: 11:46 AM
 * To change this template use File | Settings | File Templates.
 */

function sympatheticHover(){
    var linkedDiv;

    $("div.list").hover(
        function(){
            var highlight = {'border' : '1px black solid','background-color' : 'red', 'opacity' : '0.3', 'transition' : 'opacity 0.5s', 'box-shadow' : '3px 3px 4px black'};
            $(this).css(highlight);
            linkedDiv = 'part' + this.id.slice(-1);
            $('div#' + linkedDiv).css(highlight);
        },
        function(){
            var unlight = {'border' : '','background-color' : '', 'opacity' : '1.0', 'box-shadow' : ''};
            $(this).css(unlight);
            $('div#' + linkedDiv).css(unlight);
    })
}

function init(){
    sympatheticHover();
}

$(document).ready(function(){init()});
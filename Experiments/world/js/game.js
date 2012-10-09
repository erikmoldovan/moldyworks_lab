/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 10/9/12
 * Time: 4:02 PM
 * To change this template use File | Settings | File Templates.
 */
function drawWorld(){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.beginPath();
    ctx.arc(300,300,120,0.5*Math.PI,1.5*Math.PI);
    ctx.fill();
    ctx.arc(300,300,120,1.5*Math.PI,0.5*Math.PI);
    ctx.stroke();

    var timestampOne, timestampTwo;

    ctx.beginPath();
    ctx.moveTo(285,130);
    ctx.lineTo(315,150);
    ctx.moveTo(285,170);
    ctx.lineTo(315,150);
    ctx.stroke();

    $(document).keypress(function(e){

        var keyPressed = e.charCode || e.keyCode;

        if(keyPressed == 119){
            ctx.clearRect(0,0,600,600);
            ctx.beginPath();
            ctx.moveTo(285,150);
            ctx.lineTo(315,130);
            ctx.moveTo(285,150);
            ctx.lineTo(315,170);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(300,300,120,0.5*Math.PI,1.5*Math.PI);
            ctx.stroke();
            ctx.arc(300,300,120,1.5*Math.PI,0.5*Math.PI);
            ctx.fill();

        }else if(keyPressed == 101){
            ctx.clearRect(0,0,600,600);
            ctx.beginPath();
            ctx.moveTo(285,130);
            ctx.lineTo(315,150);
            ctx.moveTo(285,170);
            ctx.lineTo(315,150);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(300,300,120,0.5*Math.PI,1.5*Math.PI);
            ctx.fill();
            ctx.arc(300,300,120,1.5*Math.PI,0.5*Math.PI);
            ctx.stroke();
        }
    });
}

function init(){
    drawWorld();
}

$(document).ready(function(){init()});
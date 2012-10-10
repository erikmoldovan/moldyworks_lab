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

    var colors = ["black", "white", "black"];
    var newDir, lastDir;
    var flipFlag = false;

    var startAngle = 0;
    var arc = Math.PI / 6;
    var outsideRadius = 150;
    var insideRadius = 90;

    for(i = 0; i < 12; i++){
        var angle = startAngle + i * arc;
        ctx.fillStyle = colors[(i%2)+1];

        ctx.beginPath();
        ctx.arc(300, 340, outsideRadius, angle, angle + arc, false);
        ctx.arc(300, 340, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();
    }

    ctx.beginPath();
    ctx.moveTo(285,130);
    ctx.lineTo(315,150);
    ctx.moveTo(285,170);
    ctx.lineTo(315,150);
    ctx.stroke();

    $(document).keypress(function(e){

        var keyPressed = e.charCode || e.keyCode;

        if(keyPressed == 119){
            newDir = "left";
        }else if(keyPressed == 101){
            newDir = "right";
        }

        console.log('newDir: ' + newDir + ', lastDir: ' + lastDir);

        if(newDir == lastDir){
            flipFlag = true;
        }

        console.log(flipFlag);

        worldFill(flipFlag, newDir);
    });

    function worldFill(doFlip, newDirection){

        var directionMod;
        var i;

        if(flipFlag){
            switch(newDirection){
                case "right":
                    newDirection = "left";
                    break;
                case "left":
                    newDirection = "right";
                    break;
            }
        }

        /*if(newDirection == "right"){
            directionMod = i%2;
        }else if(newDirection == "left"){
            directionMod = i%2+1;
        }

        for(i = 0; i < 12; i++){
            angle = startAngle + i * arc;
            ctx.fillStyle = colors[directionMod];

            ctx.beginPath();
            ctx.arc(300, 340, outsideRadius, angle, angle + arc, false);
            ctx.arc(300, 340, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
        }

        ctx.clearRect(0,0,600,600);
        ctx.beginPath();
        ctx.moveTo(285,130);
        ctx.lineTo(315,150);
        ctx.moveTo(285,170);
        ctx.lineTo(315,150);
        ctx.stroke();*/

        lastDir = newDirection;
    }
}



function init(){
    drawWorld();
}

$(document).ready(function(){init()});
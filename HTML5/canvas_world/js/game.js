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
    var newFacing, lastFacing;
    var continueFlag = false;
    var stickyFlag = false;

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
        console.log('keyPressed: ' + keyPressed);

        if(keyPressed == 119){
            newFacing = "left";
        }else if(keyPressed == 101){
            newFacing = "right";
        }

        if(newFacing == lastFacing){
            continueFlag = true;
        }

        worldFill();
    });

    function worldFill(){

        var direction;

        console.log('continueFlag: ' + continueFlag + ', stickyFlag: ' + stickyFlag);

        if(continueFlag){
            if((stickyFlag == true)){

            }

            continueFlag = false;
            stickyFlag = true;
        }else{
            direction = newFacing;
            stickyFlag = false;
        }

        console.log('newFacing: ' + newFacing + ', lastFacing: ' + lastFacing);
        console.log('direction: ' + direction);

        lastFacing = newFacing;

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
    }
}



function init(){
    drawWorld();
}

$(document).ready(function(){init()});
/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 10/12/12
 * Time: 12:23 PM
 * To change this template use File | Settings | File Templates.
 */

var mpcDisplay = {

    initClickHandlers:function(){



        /*for(i = 0; i < this.numBtns.length; i++){
            this.numBtns[i].onclick = this.numClick;
        }

        var that = this;
        $.each(this.opBtns, function(i){
            this.onclick = that.opClick;
        });

        $.each(this.actnBtns, function(i){
            this.onclick = that.actnClick;
        });

        $('div.btn').click(function(){
            $('div#displayArea').fadeOut(50, function(){$('div#displayArea').fadeIn(50);});
        });*/
    },

    initKeyHandlers:function(){
        $(document).keypress(function(e){
            var keyPressed = e.charCode || e.keyCode;

            if(keyPressed >= 49 && keyPressed <= 52){
                keyPressed -= 48;
            }else{
                switch(keyPressed){
                    case 113:
                        keyPressed = 5;
                        break;
                    case 119:
                        keyPressed = 6;
                        break;
                    case 101:
                        keyPressed = 7;
                        break;
                    case 114:
                        keyPressed = 8;
                        break;
                    case 97:
                        keyPressed = 9;
                        break;
                    case 115:
                        keyPressed = 10;
                        break;
                    case 100:
                        keyPressed = 11;
                        break;
                    case 102:
                        keyPressed = 12;
                        break;
                    case 122:
                        keyPressed = 13;
                        break;
                    case 120:
                        keyPressed = 14;
                        break;
                    case 99:
                        keyPressed = 15;
                        break;
                    case 118:
                        keyPressed = 16;
                        break;
                }
            }

            console.log(keyPressed);
        })
    }
};

function init(){
    $.extend(mpcDisplay, {
        numPads:{
            modBtn:document.getElementById('buttonmodulus'),
            divBtn:document.getElementById('buttondivide'),
            mulBtn:document.getElementById('buttonmultiply'),
            subBtn:document.getElementById('buttonsubtract'),
            addBtn:document.getElementById('buttonadd')
        }
    }

    mpcDisplay.initClickHandlers();
    mpcDisplay.initKeyHandlers();
}

$(document).ready(function(){init()});
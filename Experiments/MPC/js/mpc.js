/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 10/12/12
 * Time: 12:23 PM
 * To change this template use File | Settings | File Templates.
 */

var mpcDisplay = {
    soundBank: [],

    initClickHandlers:function(){
        var that = this;

        $('.soundBtn').click(function(e){
            var keyPressed = $(this).attr('data-button');
            that.processInput(keyPressed);
        });

        /*$('.modBtn').click(function(e){
            var keyPressed = $(this).attr('data-button');
            that.processInput(keyPressed);
        });*/
    },

    initKeyHandlers:function(){
        var that = this;

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
                    default:
                        that.inputAccepted();
                        alert(keyPressed);
                        return;
                }
            }

            that.processInput(keyPressed);
        })
    },

    inputAccepted:function(){
        console.log("malarkey");
    },

    processInput:function(keyCode){
        mpcDisplay.padNum.text(keyCode);
    }
};

function init(){
    $.each($('.soundBtn'), function(i){
        mpcDisplay.soundBank.push({
            triggerPad: $(this).attr('data-button'),
            element: $(this),
            soundTitle: null,
            fileName: null,
            sLength: null
        });

    });

    $.extend(mpcDisplay, {
        padNum:$('#padNum')
    });

    mpcDisplay.initClickHandlers();
    mpcDisplay.initKeyHandlers();
}

$(document).ready(function(){init()});
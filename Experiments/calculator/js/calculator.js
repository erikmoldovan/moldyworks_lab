/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/24/12
 * Time: 1:16 PM
 * To change this template use File | Settings | File Templates.
 */
var calculate = {
    addition:function(val1, val2){
        return val1 + val2;
    },

    subtraction:function(val1, val2){
        return val1 - val2;
    },

    multiplication:function(val1, val2){
        return val1 * val2;
    },

    division:function(val1, val2){
        return val1 / val2;
    },

    modulus:function(val1, val2){
        return val1 % val2;
    }
};

var calcDisplay = {

    actBtnPressed:false,
    actBtnJustPressed:false,
    eqJustPressed:false,
    firstNum:null,
    secNum:null,
    operation:null,

    initClickHandlers:function(){
        for(i = 0; i < this.numBtns.length; i++){
            this.numBtns[i].onclick = this.numClick;
        }

        var that = this;
        $.each(this.actBtns, function(i){
            this.onclick = that.atnClick;
        });

        this.clrBtn.onclick = this.clear;
        this.eqBtn.onclick = this.process;
    },

    atnClick:function(e){

        var clickVal = e.target.innerText;
        calcDisplay.actBtnJustPressed = true;

        if(e.target.tagName == "SPAN"){
            clickVal = $(e.target).parent()[0].innerText;
        }

        if(calcDisplay.actBtnPressed && !calcDisplay.eqJustPressed){
            calcDisplay.outputDisplay.innerText = calcDisplay.outputDisplay.innerText.slice(0, -1);
        }else{
            calcDisplay.secNum = null;
        }

        calcDisplay.eqJustPressed = false;
        calcDisplay.operation = clickVal;
        calcDisplay.firstNum = parseFloat(calcDisplay.outputDisplay.innerText);
        console.log(calcDisplay.firstNum);

        calcDisplay.actBtnPressed = true;
        calcDisplay.outputDisplay.innerText += clickVal;

        switch(clickVal){
            case '+':
                calcDisplay.operation = calculate.addition;
                break;
            case '-':
                calcDisplay.operation = calculate.subtraction;
                break;
            case '*':
                calcDisplay.operation = calculate.multiplication;
                break;
            case '/':
                calcDisplay.operation = calculate.division;
                break;
            case '%':
                calcDisplay.operation = calculate.modulus;
                break;
        }
    },

    numClick:function(e){
        if(calcDisplay.actBtnJustPressed){
            calcDisplay.outputDisplay.innerText = '';
        }

        if(calcDisplay.outputDisplay.innerText.length >= 9){
            return;
        }

        calcDisplay.outputDisplay.innerText += e.target.innerText;


        calcDisplay.actBtnJustPressed = false;
    },

    clear:function(){
        calcDisplay.outputDisplay.innerText = '';
        calcDisplay.outputOverflow.innerText = '';
        calcDisplay.actBtnPressed = false;
        calcDisplay.firstNum = null;
        calcDisplay.secNum = null;
        calcDisplay.operation = null;
        calcDisplay.eqJustPressed = false;
    },

    process:function(){
        if(calcDisplay.secNum === null){
            calcDisplay.secNum = parseFloat(calcDisplay.outputDisplay.innerText);
        }

        var returnVal = calcDisplay.operation(calcDisplay.firstNum, calcDisplay.secNum);
        console.log(returnVal);
        console.log(returnVal.length);
        if(returnVal.length < 9){
            returnVal = returnVal.toPrecision(returnVal.length);
            console.log('true : ' + returnVal);
        }else{
            returnVal = returnVal.toPrecision(9);
        }

        if(returnVal.indexOf('e') != -1){
            calcDisplay.outputOverflow.innerText = returnVal.substring(returnVal.indexOf('e'));
            returnVal = returnVal.substring(0, returnVal.indexOf('e'));
        }

        calcDisplay.firstNum = returnVal;
        calcDisplay.outputDisplay.innerText = returnVal;

        calcDisplay.eqJustPressed = true;
    }
};

function init(){
    //noinspection JSValidateTypes
    $.extend(calcDisplay, {

        actBtns:{
            modBtn:document.getElementById('buttonmodulus'),
            divBtn:document.getElementById('buttondivide'),
            mulBtn:document.getElementById('buttonmultiply'),
            subBtn:document.getElementById('buttonsubtract'),
            addBtn:document.getElementById('buttonadd')
        },

        clrBtn:document.getElementById('buttonclear'),
        eqBtn:document.getElementById('buttonequals'),

        numBtns:document.getElementsByClassName('numBtn'),
        outputDisplay:document.getElementById('displayArea'),
        outputOverflow:document.getElementById('displayOverflow')});

    calcDisplay.initClickHandlers();
}

window.onload = init;
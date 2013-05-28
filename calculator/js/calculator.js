/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/24/12
 * Time: 1:16 PM
 * To change this template use File | Settings | File Templates.
 */

// This object contains functions for all the mathematical operations used
var calculate = {
    addition:function(val1, val2){return val1 + val2;},
    subtraction:function(val1, val2){return val1 - val2;},
    multiplication:function(val1, val2){return val1 * val2;},
    division:function(val1, val2){return val1 / val2;},
    percent:function(val1, val2){return val1 % val2;}
};

// This object handles the display and click handlers for the calculator
var calcDisplay = {

    // Initializes necessary variables to null or equivalent
    opBtnPressed:false,
    opBtnJustPressed:false,
    eqJustPressed:false,
    firstNum:null,
    secNum:null,
    operation:null,
    memNum:null,
    memBtnPressed:false,
    decBtnPressed:false,

    // Processes click events and routes them to appropriate function based on the value of the button pressed
    initClickHandlers:function(){

        // Loops through all numbers in an array to determine which number has been clicked
        for(i = 0; i < this.numBtns.length; i++){
            this.numBtns[i].onclick = this.numClick;
        }

        // Loops through all operators in the opBtns object to determine which operator key has been clicked
        var that = this;
        $.each(this.opBtns, function(i){
            this.onclick = that.opClick;
        });

        // Loops through all the actions in the actnBtns object to determine which action key has been clicked
        $.each(this.actnBtns, function(i){
            this.onclick = that.actnClick;
        });

        // Controls fading effect of display when buttons are pressed
        $('div.btn').click(function(){
            $('div#displayArea').fadeOut(50, function(){$('div#displayArea').fadeIn(50);});
        });
    },

    initKeyHandlers:function(){
        $(document).keypress(function(e){
            var keyPressed = e.charCode || e.keyCode;

            if(keyPressed >= 49 && keyPressed <= 57){
                calcDisplay.numClick(e, (keyPressed - 48));
            }else{
                switch(keyPressed){
                    case 48:
                        calcDisplay.numClick(e, '0');
                        break;
                    case 37:
                        calcDisplay.opClick(e, '%');
                        break;
                    case 42:
                        calcDisplay.opClick(e, '*');
                        break;
                    case 43:
                        calcDisplay.opClick(e, '+');
                        break;
                    case 45:
                        calcDisplay.opClick(e, '-');
                        break;
                    case 46:
                        calcDisplay.numClick(e, '.');
                        calcDisplay.decBtnPressed = true;
                        break;
                    case 47:
                        calcDisplay.opClick(e, '/');
                        break;
                    case 61:
                    case 13:
                        calcDisplay.actnClick(e, '=');
                        break;
                    case 99:
                        calcDisplay.actnClick(e, 'C');
                        break;
                }
            }
        })
    },

    // Processes the number click event
    numClick:function(e, keyValue){

        calcDisplay.outputOverflow.innerText = '';

        // If an action button was just pressed, start a new number on the display
        if(calcDisplay.opBtnJustPressed){
            calcDisplay.outputDisplay.innerText = '';
        }

        // Failsafe, in case a higher number is introduced (somehow)
        if(calcDisplay.outputDisplay.innerText.length >= 9){
            return;
        }

        // Appends new number to end of current number displayed
        if(keyValue){
            // Checks if a decimal has already been entered
            if(keyValue == 48){
                calcDisplay.outputDisplay.innerText += '0';
            }

            if(calcDisplay.outputDisplay.innerText.indexOf('.') != -1 && keyValue == '.'){
                return;
            }
            calcDisplay.outputDisplay.innerText += (keyValue);
        }else{
            calcDisplay.outputDisplay.innerText += e.target.innerText;
        }

        calcDisplay.opBtnJustPressed = false;
    },

    // This function covers all operations performed by the calculator
    opClick:function(e, keyValue){

        calcDisplay.outputOverflow.innerText = '';

        // Gets the value of the div clicked, for sorting purposes
        var clickVal = keyValue|| e.target.innerText;
        calcDisplay.opBtnJustPressed = true;

        // Transfers the click event to the parent div if a user clicks on the span instead
        if(e.target.tagName == "SPAN"){
            clickVal = $(e.target).parent()[0].innerText;
        }

        // Switches display in case of operation indecision before entering second number (i.e., hitting + after -)
        if(calcDisplay.opBtnPressed && !calcDisplay.eqJustPressed){
            calcDisplay.outputDisplay.innerText = calcDisplay.outputDisplay.innerText.slice(0, -1);
        }else{
            calcDisplay.secNum = null;
        }

        // Sets necessary values
        calcDisplay.eqJustPressed = false;
        calcDisplay.operation = clickVal;
        calcDisplay.firstNum = parseFloat(calcDisplay.outputDisplay.innerText);

        calcDisplay.opBtnPressed = true;
        calcDisplay.outputDisplay.innerText += clickVal;

        // Routing statement to perform actual operation
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
                calcDisplay.operation = calculate.percent;
                break;
        }
    },

    // This function covers non-operational action buttons on the calculator
    actnClick:function(e, keyValue){

        var clickVal = keyValue || e.target.innerText;

        // Routing statement for the action buttons
        switch(clickVal){
            case 'MR': // Memory Recall
                calcDisplay.outputDisplay.innerText = calcDisplay.memNum;
                calcDisplay.outputOverflow.innerText = "MR";
                break;
            case 'M+': // Memory Add
                calcDisplay.memNum += parseFloat(calcDisplay.outputDisplay.innerText);
                calcDisplay.outputOverflow.innerText = 'M+';
                break;
            case 'M-': // Memory Subtract
                calcDisplay.memNum -= parseFloat(calcDisplay.outputDisplay.innerText);
                calcDisplay.outputOverflow.innerText = 'M-';
                break;
            case 'MC': // Clear Memory
                calcDisplay.memNum = null;
                calcDisplay.outputOverflow.innerText = 'MC';
                break;
            case 'C': // Clear display
            case 99:
                calcDisplay.outputDisplay.innerText = '';
                calcDisplay.outputOverflow.innerText = '';
                calcDisplay.opBtnPressed = false;
                calcDisplay.firstNum = null;
                calcDisplay.secNum = null;
                calcDisplay.operation = null;
                calcDisplay.eqJustPressed = false;
                break;
            case '=': // Evaluate
            case 61:
            case 13:
                calcDisplay.process();
                break;
        }
    },

    // This function processes the equation, and runs when the equals button has been pressed
    process:function(){

        // Sets the second number to what's already displayed, if no second number has been set.
        // In effect, 6 + = is 6 + 6 =
        if(calcDisplay.secNum === null){
            calcDisplay.secNum = parseFloat(calcDisplay.outputDisplay.innerText);
        }

        // Same as above, but reverse. + 6 = is 0 + 6 =
        if(isNaN(calcDisplay.firstNum)){
            calcDisplay.firstNum = 0;
        }

        var returnVal;

        try{
            returnVal = calcDisplay.operation(calcDisplay.firstNum, calcDisplay.secNum);
            var nLength = returnVal.toString().length;

            if(returnVal <= 99999999 && nLength <= 7){
                if(nLength <= 3){
                    returnVal = returnVal.toPrecision(nLength);
                }else{
                    returnVal = returnVal.toPrecision(nLength);
                }
            }else{
                    returnVal = returnVal.toPrecision(6);
            }

            console.log(calcDisplay.decBtnPressed);

            if(calcDisplay.decBtnPressed){
                // This block removes trailing zeros in decimal results
                var rLength = returnVal.toString().length;
                var tailNum = returnVal.toString().substring(rLength-1);

                while(tailNum == '0'){
                    returnVal = returnVal.toString().substring(0, rLength -1);
                    rLength--;
                    tailNum = returnVal.toString().substring(rLength-1);
                }

                calcDisplay.decBtnPressed = false;
            }

            // In case the answer goes into exponents, substring out the E part and display it in the overflow section
            if(returnVal.indexOf('e') != -1){
                calcDisplay.outputOverflow.innerText = returnVal.substring(returnVal.indexOf('e'));
                returnVal = returnVal.substring(0, returnVal.indexOf('e'));
            }

            calcDisplay.outputDisplay.innerText = returnVal;
            calcDisplay.firstNum = parseFloat(returnVal); // Very important
        }
        catch(err){
            calcDisplay.firstNum = parseFloat(calcDisplay.outputDisplay.innerText);
            returnVal = calcDisplay.firstNum;
            console.error('Invalid operation');
        }

        calcDisplay.eqJustPressed = true;
    }
};

function init(){
    // This extends the calcDiaplay object, by initializing variables associated with the DOM before any functions are run
    $.extend(calcDisplay, {

        opBtns:{
            modBtn:document.getElementById('buttonmodulus'),
            divBtn:document.getElementById('buttondivide'),
            mulBtn:document.getElementById('buttonmultiply'),
            subBtn:document.getElementById('buttonsubtract'),
            addBtn:document.getElementById('buttonadd')
        },

        actnBtns:{
            clrBtn:document.getElementById('buttonclear'),
            eqBtn:document.getElementById('buttonequals'),
            mrecallBtn:document.getElementById('buttonMR'),
            mclearBtn:document.getElementById('buttonMC'),
            maddBtn:document.getElementById('buttonMA'),
            msubBtn:document.getElementById('buttonMS')
        },

        numBtns:document.getElementsByClassName('numBtn'),
        outputDisplay:document.getElementById('displayArea'),
        outputOverflow:document.getElementById('displayOverflow')});

    $('div#calcBody').draggable({cancel:"a"});
    calcDisplay.initClickHandlers();
    calcDisplay.initKeyHandlers();

    setTimeout(function(){
        window.scrollTo(0, 1);
    }, 1000);
}

$(document).ready(function(){init()});
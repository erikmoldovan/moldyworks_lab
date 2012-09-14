/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/10/12
 * Time: 4:19 PM
 * To change this template use File | Settings | File Templates.
 */
function calculate(){
    'use strict';
    var cost;
    var type = document.getElementById('type');
    var years = document.getElementById('years');

    // Validates data passed in as the Years value
    if(years && years.value){
        years = parseInt(years.value, 10);
    }

    // Determines which value to assign to cost based on type of membership desired
    if(type && type.value && years && (years > 0)){
        switch(type.value){
            case 'basic':
                cost = 10.00;
                break;
            case 'premium':
                cost = 15.00;
                break;
            case 'gold':
                cost = 20.00;
                break;
            case 'platinum':
                cost = 25.00;
                break;
        }

        cost *= years;

        // Discount for those who purchase more than one year at a time
        if(years > 1){
            cost *= .80;
        }

        document.getElementById('cost').value = '$' + cost.toFixed(2);
    }else{
        document.getElementById('cost').value = "Please enter valid values.";
    }

    return false;
}

function init(){
    'use strict';
    document.getElementById('theForm').onsubmit = calculate;
}

window.onload = init;
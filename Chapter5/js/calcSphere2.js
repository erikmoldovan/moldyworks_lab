/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/7/12
 * Time: 2:15 PM
 * To change this template use File | Settings | File Templates.
 */
function calculate(){
    'use strict';
    var volume;
    var radius = document.getElementById('radius');

    //radius = Math.abs(radius);
    if (radius && (radius.value > 0)){
        radius = document.getElementById('radius').value;
        volume = (4/3) * Math.PI * Math.pow(radius, 3);
        volume = volume.toFixed(4);

    }else{
        volume = "Please enter a valid radius!";
    }

    document.getElementById('volume').value = volume;
    return false;
}

function init(){
    'use strict';
    document.getElementById('calcForm').onsubmit = calculate;
}

window.onload = init;
/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/7/12
 * Time: 3:52 PM
 * To change this template use File | Settings | File Templates.
 */
function calculate(){
    'use strict';
    var hexNum;
    var decNum = document.getElementById('decNum').value;

    hexNum = parseInt(decNum, 8);

    document.getElementById('hexNum').value = hexNum;
    return false;
}

function init(){
    'use strict';
    document.getElementById('calcForm').onsubmit = calculate;
}

window.onload = init;
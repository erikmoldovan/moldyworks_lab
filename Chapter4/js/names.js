/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/7/12
 * Time: 3:28 PM
 * To change this template use File | Settings | File Templates.
 */
function formatNames(){
    'use strict';
    var formattedName;
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;

    formattedName = lastName + ', ' + firstName;

    document.getElementById('result').value = formattedName;
    return false;
}

function init(){
    'use strict';
    document.getElementById('calcForm').onsubmit = formatNames;
}

window.onload = init;
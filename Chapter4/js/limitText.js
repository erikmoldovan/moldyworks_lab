/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/7/12
 * Time: 3:06 PM
 * To change this template use File | Settings | File Templates.
 */
function limitText(){
    'use strict';
    var limitedText;
    var originalText = document.getElementById('comments').value;
    var lastSpace = originalText.lastIndexOf(' ', 100);

    limitedText = originalText.slice(0, lastSpace);

    document.getElementById('count').value = originalText.length;

    document.getElementById('result').value = limitedText;

    return false;
}

function init(){
    'use strict';
    document.getElementById('calcForm').onsubmit = limitText;
}

window.onload = init;
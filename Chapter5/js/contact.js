/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/12/12
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */
function process(){
    'use strict';
    var okay = true;

    var email = document.getElementById('email');
    var comments = document.getElementById('comments');

    if(!email || !email.value || (email.value < 6) || (email.value.indexOf('@') == -1)){
        okay = false;
        alert('Please enter a valid email address!');
    }

    if(!comments || !comments.value || (comments.value.indexOf('<') != -1)){
        okay = false;
        alert('No HTML code allowed!');
    }

    if(okay == true){
        alert('It works!');
    }

    return okay;
}

function init(){
    'use strict';
    document.getElementById('theForm').onsubmit = process;
}

window.onload = init;
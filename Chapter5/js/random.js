/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/12/12
 * Time: 5:38 PM
 * To change this template use File | Settings | File Templates.
 */
function generate(){
    'use strict';
    var numbers = '';

    for(var i = 0; i < 6; i++){
        numbers+= parseInt((Math.random() * 100), 10) + ' ';
    }

    var output = document.getElementById('output');

    if(output.textContent !== undefined){
        output.textContent = numbers;
    }else{
        output.innerText = numbers;
    }
}

window.onload = generate;
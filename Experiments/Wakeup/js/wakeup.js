/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/17/12
 * Time: 1:18 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var sentence = "Wake up, Neo...";

    var output = document.getElementById('neo');
    var iterator = 0;
    var slength = sentence.length;

    function loop(){

        output.innerHTML += sentence.charAt(iterator);
        iterator++;

        if(iterator >= slength){
            setTimeout(function(){
                iterator = 0;
                output.innerText = '';
                loop();
            }, 2000);
            console.log('if');
        }else{
            setTimeout(function() {
                loop();
            }, 300);
        }
    }

    loop();
});

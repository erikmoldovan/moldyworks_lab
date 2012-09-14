/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/7/12
 * Time: 11:55 AM
 * To change this template use File | Settings | File Templates.
 */
function calculate(){
    'use strict';

    var total;
    var quantity = document.getElementById('quantity').value;
    var price = document.getElementById('price').value;
    var tax = document.getElementById('tax').value;
    var discount = document.getElementById('discount').value;

    total = quantity * price;
    total -= discount;

    total *= (tax/100) + 1;

    document.getElementById('total').value = total;
    return false;
}

function init(){
    'use strict';
    var theForm = document.getElementById('theForm');
    theForm.onsubmit = calculate;
}

window.onload = init;
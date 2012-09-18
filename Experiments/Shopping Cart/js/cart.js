var cart = {
    contents: [],

    addItem: function(newItem, quantity){
        var code = '';
        var that = this;
        var price, name;

        for(i = 0; i < quantity; i++){
            if(quantity <= 0){break;}

            this.contents.push(newItem);
            newItem.quantity--;

            var output = document.getElementById('cartList');
            code = '';
            price = parseInt(newItem.price.toFixed(2));
            name = newItem.name;

            code += '<li class="cart-' + newItem.id + '">Name: ' + name + ' Price: $' + price + '<input class="remove"' + 'id="rembutton' + newItem.id + '" type="button" value="X"/></li>';

            output.innerHTML = output.innerHTML + code;
        }
        $('.remove').unbind().click(deleteItem);
    },

    removeItem: function(oldItemID){
        for(i= 0; i < this.contents.length; i++){
            if($('li.cart-' + oldItemID + ':eq(0)')){
                $('li.cart-' + oldItemID + ':eq(0)').remove();
                this.contents.pop(i);
                break;
            }
        }
    }
};

var items = [];

var item = function(obj){$.extend(this, obj)
    this.name = obj.name || '',
        this.price = obj.price || 0,
        this.id = obj.id || items.length,
        this.description = obj.description || '',
        this.image = obj.image || '',
        this.quantity = obj.quantity || 0};

items.push(new item({
    name: 'Book1',
    price: 19,
    description: 'Nada',
    quantity: 2}));

items.push(new item({
    name: 'Book2',
    price: 23,
    description: 'Blah',
    quantity: 3}));

items.push(new item({
    name: 'Book3',
    price: 29,
    description: 'College',
    quantity: 4}));

function init(){
    var output = document.getElementById('items');
    var code = '';

    for(i = 0; i < items.length; i++){
        code = '';
        code += '<div id="' + items[i].id + '" class="item">';
        code += '<div class="name">' + items[i].name + '</div>';
        code += '<div class="price">$' + items[i].price.toFixed(2) + '</div>';
        code += '<div class="description">' + items[i].description + '</div>';
        code += '<div class="image"><img src="' + items[i].image + '"/></div>';
        code += '<input class="buy" id="button-' + items[i].id + '" type="button" value="Buy"/>';
        code += '</div>';
        output.innerHTML = output.innerHTML + code;
    }

    $('.buy').click(buyItem);
}

var buyItem = function(e){
    cart.addItem(items[parseInt(e.target.id.substr(7))], 1);
}

var deleteItem = function(e){
    cart.removeItem(parseInt(e.target.id.substr(9)), 1);
}

window.onload = init;
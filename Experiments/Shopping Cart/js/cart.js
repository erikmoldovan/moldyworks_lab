// Variable and Object Declaration
var items = {catalog:[],

    displayItems:function () {
        var output = document.getElementById('items');
        var code = '';
        var currentItem;

        output.innerHTML = output.innerHTML + code;

        for (i = 0; i < this.catalog.length; i++) {
            currentItem = this.catalog[i];
            code = this.generateItem(currentItem);
            output.innerHTML = output.innerHTML + code;
        }

        var buyBtns = document.getElementsByClassName('buy');
        for(x = 0; x < buyBtns.length; x++){buyBtns[x].onclick = buyItem;;}

        //$('.buy').click(buyItem);
    },

    generateItem:function(currentItem){
        code = '';
        code += '<div id="' + currentItem.id + '" class="item">';
        code += '<div class="name">' + currentItem.name + '</div>';
        code += '<div class="price">$' + currentItem.price.toFixed(2) + '</div>';
        code += '<div class="author">' + currentItem.author + '</div>';
        code += '<div class="description">' + currentItem.description + '</div>';
        code += '<div class="image"><img src="' + currentItem.image + '"/></div>';
        code += '<div class="buyContainer"><input class="buy" id="button-' + currentItem.id + '" type="button" value="Buy"/></div>';
        code += '</div>';

        return code;
    },

    searchFor:function (e) {
        // Takes input from text field, on button click
        var input = document.getElementById('searchField').value.toLowerCase();
        input = input.split(" ");
        var output = '';

        // Loop through items array
        for (i = 0; i < items.catalog.length; i++) {
            // In loop, select items that match input by name. Set their display value to true
            var allMatch = true;

            for(c = 0; c < input.length; c++){
                if(items.catalog[i].name.toLowerCase().indexOf(input[c]) == -1){
                    allMatch = false;
                    break;
                }
            }

            if(allMatch){output += items.generateItem(items.catalog[i]);}
        }

        document.getElementById('searchResults').innerHTML = output;
    }
};

var item = function (obj) {
    $.extend(this, obj)
    this.name = obj.name || '',
        this.price = obj.price || 0,
        this.id = obj.id || items.catalog.length,
        this.author = obj.author || '',
        this.description = obj.description || '',
        this.image = obj.image || '',
        this.quantity = obj.quantity || 0,
        this.display = obj.display || false;
} // Does not display items by default

items.catalog.push(new item({
    name:'The Third Wheel',
    price:7.75,
    author:'Jeff Kinney',
    description:'Love is in the air—but what does that mean for Greg Heffley?',
    image:'images/thirdwheel.jpg',
    quantity:2}));

items.catalog.push(new item({
    name:'The Racketeer',
    price:17.06,
    author:'John Grisham',
    description:'Who is the Racketeer? And what does he have to do with the judge’s untimely demise? His name, for the moment, is Malcolm Bannister. Job status? Former attorney. Current residence? The Federal Prison Camp near Frostburg, Maryland.',
    image:'images/racketeer.jpg',
    quantity:3}));

items.catalog.push(new item({
    name:'Mad River',
    price:16.60,
    author:'John Sandford',
    description:'Bonnie and Clyde, they thought. And what’s-his-name, the sidekick. Three teenagers with dead-end lives, and chips on their shoulders, and guns.',
    image:'images/madriver.jpg',
    quantity:4}));

items.catalog.push(new item({
    name:'The Mark of Athena',
    price:11.04,
    author:'Rick Riordan',
    description:'In The Son of Neptune, Percy, Hazel, and Frank met in Camp Jupiter, the Roman equivalent of Camp Halfblood, and traveled to the land beyond the gods to complete a dangerous quest. The third book in the Heroes of Olympus series will unite them with Jason, Piper, and Leo. But they number only six--who will complete the Prophecy of Seven?',
    image:'images/athena.jpg',
    quantity:4}));

// The cart object/function... method? Controls logic for adding items to the cart, removing them, and calculating the total price.
var cart = {
    contents:[],

    addItem:function (newItem, quantity) {
        var code = '';
        var that = this;
        var price, name;

        for (i = 0; i < quantity; i++) {
            if (newItem.quantity <= 0) {
                break;
            }

            this.contents.push(newItem);
            newItem.quantity--;

            var output = document.getElementById('cartList');
            code = '';
            price = parseInt(newItem.price.toFixed(2));
            name = newItem.name;

            code += '<li class="cart-' + newItem.id + '"><span class="bold">Name:</span> ' + name + ' <span class="bold">Price:</span> $' + price + '<input class="remove"' + 'id="rembutton' + newItem.id + '" type="button" value="X"/></li>';

            output.innerHTML = output.innerHTML + code;
            this.calculateTotal();
        }
        $('.remove').unbind().click(deleteItem);
    },

    removeItem:function (oldItemID) {
        for (i = 0; i < this.contents.length; i++) {
            if ($('li.cart-' + oldItemID + ':eq(0)')) {
                $('li.cart-' + oldItemID + ':eq(0)').remove();
                this.contents.pop(i);

                // Ups the quantity by one for the removed item in the main items array
                for (x = 0; x < items.catalog.length; x++) {
                    if (parseInt(items.catalog[x].id) == oldItemID) {
                        items.catalog[x].quantity += 1;
                        break;
                    }
                }

                this.calculateTotal();
                break;
            }
        }
    },

    calculateTotal:function () {
        var total = 0;
        var output = document.getElementById('total');

        for (i = 0; i < this.contents.length; i++) {
            total += parseInt(this.contents[i].price);
        }

        output.innerHTML = '<span id="totalPrice"><span class="bold">Total:</span> $' + total.toFixed(2) + '</span>';
    }
};

// The initialization method. Runs on window load, thanks to statement at the bottom of the script
function init() {
    cart.calculateTotal();
    items.displayItems();
    document.getElementById('searchBtn').onclick = items.searchFor;
}

var buyItem = function (e) {
    cart.addItem(items.catalog[parseInt(e.target.id.substr(7))], 1);
}

var deleteItem = function (e) {
    cart.removeItem(parseInt(e.target.id.substr(9)), 1);
}

//window.onload = init;
$(document).ready(function(){init();
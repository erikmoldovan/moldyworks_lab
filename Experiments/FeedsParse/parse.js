/**
 * Created with JetBrains PhpStorm.
 * User: moldy
 * Date: 1/24/13
 * Time: 11:27 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {

    var feedParse = {

        terms:{
            general:26000485,
            diversity:26000486,
            wishes:26000487,
            education:26000488,
            military:26000489
        },

        tags:{
            news:'news',
            videos:'videos',
            photos:'photos',
            polls:'polls'
        },

        // Master initialization function. Sets up dummy variables as well as acts as the controller
        init: function(){
            var that = this;

            // These two should be dynamically assigned based on form inputs
            var term = that.terms.general;
            var tag = that.tags.news;

            that.urlPull(term, tag);
        },

        // Pulls data from the WWE Sapphire Feed
        urlPull: function(term, tag){
            var that = this;

            var url = 'http://www.wwe.com/feeds/sapphire/' + tag + '/all/term:' + term + '/0,2'; // This is the URL of the WWE Sapphire Feed

            $.get(url, function(data){
                that.passData(data[tag][0]);
//                that.passData(data[tag][1]);
            });
        },

        passData: function(feedObject){
//            console.log(feedObject);

            $.each(feedObject, function(key, value){
                $('#one').append(key + ': ' + value + "<br/>"); // Display
            })

//            console.log(JSON.stringify(feedObject)); // JSON
        }
    }

    feedParse.init();
});
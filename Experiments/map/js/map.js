/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 12/18/12
 * Time: 11:03 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {

    Modernizr.load({
        test: Modernizr.svg,
        yep : 'lib/d3.v2.js',
        nope: 'lib/r2d3.v2.js',
        complete: function() {
            d3Map.init();
        }
    });

    var d3Map = {
        init: function() {

            var thisMap = this;

            var drawMap = d3.select('#mapContainer').append('svg')
                .attr("width", 960)
                .attr("height", 500);

             d3.json("data/states_final.json", function(collection) {
                drawMap.selectAll("path")
                    .data(collection.features)
                    .enter().append("path")
                    .attr("d", d3.geo.path().projection(d3.geo.albersUsa()))
                    .style("fill", thisMap.fillStates)
                    .on("click", thisMap.stateClick)
                    .on("mouseover", thisMap.hoverOnState)
                    .on("mouseout", thisMap.hoverOutState);
            });

        },
        fillStates: function(d){
            if(d.code == 3) return "blue";
            else if(d.code == 2) return "red";
            else if(d.code == 1) return "green";
        },
        hoverOnState: function(d){
            d3.select(this).style("fill", "yellow");
        },
        hoverOutState: function(d){
            d3.select(this).style("fill", d3Map.fillStates(d));
        },
        stateClick: function (d){
            window.open(d.url);
        }
    };

});
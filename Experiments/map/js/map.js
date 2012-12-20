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
        
        boxesLeft:830,
        boxesTop:200,
        boxesWidth:48,
        boxesHeight:25,
        boxesXPadding:2,
        boxesYPadding:2,
                
        stateBoxIDs:  ["09", "10", "25", "24", "33", "34", "44", "50"],
        sBoxes: [],
        
        init: function() {

            var position, currentState;
            var map = this;

            var drawMap = d3.select('#mapContainer').append('svg')
                .attr("width", 960)
                .attr("height", 500);

             d3.json("data/states_final.json", function(collection) {
                $.each(collection.features, function(){
                    currentState = this;
                    position = $.inArray(currentState.id, map.stateBoxIDs);
                    if(position !== -1){
                        map.getSBoxesValues(currentState, parseInt(position));
                    }
                })
                var z ={}; z.code = '3';
                 
                drawMap.selectAll("path")
                    .data(collection.features)
                    .enter().append("path")
                    .attr("d", d3.geo.path().projection(d3.geo.albersUsa()))
                    .style("fill", map.fillStates)
                    .on("click", map.stateClick)
                    .on("mouseover", map.hoverOnState)
                    .on("mouseout", map.hoverOutState);
                    
                map.drawSBoxes(drawMap);
            });
        },

        getSBoxesValues: function(originalState, posID){
            var stateID = originalState.id,
                abbrev = originalState.properties.abbrev,
                code = originalState.code,
                url = originalState.url;
            
            var currentBox = {};
            var isEven = posID % 2 == 0;
            
            if(isEven){
                currentBox.x = this.boxesLeft;
                currentBox.y = this.boxesTop + ((this.boxesHeight + this.boxesYPadding)*(posID/2))
            }
            if (!isEven){
                currentBox.x = this.boxesLeft + this.boxesWidth + this.boxesXPadding; 
                currentBox.y = this.boxesTop + ((this.boxesHeight + this.boxesYPadding)*((posID-1)/2))
            }
            currentBox.code = code;
            currentBox.url = url;
            
            this.sBoxes.push(currentBox);
        },
        
        drawSBoxes: function(drawMap){
            var that = this,
            stateboxes = this.sBoxes;
            drawMap.selectAll("rect")
                .data(stateboxes)
                .enter().append("rect")
                .attr("x", function(index){return index.x})
                .attr("y", function(index){return index.y})
                .attr("height", that.boxesHeight)
                .attr("width", that.boxesWidth)
                .style("fill", that.fillStates)
                .on("click", that.stateClick)
                .on("mouseover", that.hoverOnState)
                .on("mouseout", that.hoverOutState);
                
//            drawMap.append('text')
//                .style("color", "black")
//                .attr("transform", "translate(" + 100 + ",100)")
//                .text("Bob");
        },
        
        fillStates: function(d){
            if(d.code == 3) return "blue";
            else if(d.code == 2) return "red";
            else if(d.code == 1) return "green";
            
            return false;
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
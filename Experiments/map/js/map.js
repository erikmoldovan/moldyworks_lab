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
        JSONresults:null,
        d3Selection: null,
                
        stateBoxIDs:  ["09", "10", "25", "24", "33", "34", "44", "50"],
        sBoxes: [],
        
        legend:    [{x:830, y:400},
                    {x:830, y:430},
                    {x:830, y:460}],
        
        init: function() {

            var position, currentState;
            var map = this;
            map.d3Selection = d3.select('#mapContainer');
            var drawMap = map.d3Selection.append('svg')
                .attr("width", 960)
                .attr("height", 500);

             d3.json("data/states_final.json", function(collection) {
                map.JSONresults = collection.features;
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
            currentBox.originID = stateID;
            currentBox.abbrev = abbrev;
            
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
                .classed(["stateBox"])
                .style("fill", that.fillStates)
                .on("click", that.stateClick)  
                .on("mouseover", function(e){
                    var currentBox = this;
                    var pathToFill = that.d3Selection.selectAll('svg path').filter(function(i,d){
                        if(e.originID == i.id)
                            return this;
                    });
                    that.hoverOnState(null,null,pathToFill[0][0]);
                    that.hoverOnState(null,null,currentBox);
                })
                .on("mouseout", function(e){
                    var pathToFill,
                        currentBox = this,
                        d;
                    that.d3Selection.selectAll('svg path').filter(function(i,dat){
                        if(e.originID == i.id){
                            pathToFill = this;
                            d = i;
                        }
                    });
                    that.hoverOutState(d, null, pathToFill);
                    that.hoverOutState(d, null, currentBox);
                });
                
//            drawMap.append("rect")
//                .data(d3Map.legend)
//                .enter().append("rect")
//                .attr("x", function(index){return index.x})
//                .attr("y", function(index){return index.y})
//                .attr("height", that.boxesHeight)
//                .attr("width", that.boxesWidth);
                
            drawMap.selectAll('rect').enter().append('text')
                    .style("color", "black")
                    .attr("transform", "translate(" + 100 + ",100)")
                    .text("Bob");
            
        },
        
        fillStates: function(d){
            if(d.code == 3) return "blue";
            else if(d.code == 2) return "red";
            else if(d.code == 1) return "green";
            
            return false;
        },
        fillAbbrevs: function(d){
            
        },
        hoverOnState: function(d,i,element){
            var target;
            
            if(element) target = element;
            else target = this;

            d3.select(target).style("fill", "yellow");
        },
        hoverOutState: function(d, i, element){
            var target;
            
            if(element) target = element;
            else target = this;
            
            d3.select(target).style("fill", d3Map.fillStates(d));
        },
        hoverOnBox: function(e){
            
        },
        stateClick: function (d){
            window.open(d.url);
        }
    };

});
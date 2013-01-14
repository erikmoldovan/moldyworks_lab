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
            d3Map.textX  = Modernizr.svg ? 0 : 44;
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
        d3Selection:null,
                
        stateBoxIDs:["09", "10", "25", "24", "33", "34", "44", "50"],
        sBoxes:[],
        
        legend:[{x:830, y:360, key:"Law Only", code:1},
                {x:830, y:390, key:"Policy Only", code:2},
                {x:830, y:420, key:"Law & Policy", code:3}],
        
        init: function() {

            $('#mapContainer').prepend($('<div id="stateName"></div>'));

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

                drawMap.selectAll(".states")
                    .data(collection.features)
                    .enter().append("path")
                    .attr("d", d3.geo.path().projection(d3.geo.albersUsa()))
                    .style("fill", map.fillStates)
                    .on("click", map.stateClick)
                    .on("mouseover", map.hoverOnState)
                    .on("mouseout", map.hoverOutState);

                map.drawSBoxes(drawMap);
                map.drawMapKey(drawMap);
            });
        },

        getSBoxesValues: function(originalState, posID){
            var stateID = originalState.id,
                abbrev = originalState.properties.abbrev,
                code = originalState.code,
                url = originalState.url,
                name = originalState.properties.name;
            
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
            currentBox.name = name;
            
            this.sBoxes.push(currentBox);
        },
        
        drawSBoxes: function(drawMap){
            var that = this,
            stateboxes = this.sBoxes;
            drawMap.selectAll(".stateBox")
                .data(stateboxes)
                .enter().append("rect")
                .attr("x", function(index){return index.x})
                .attr("y", function(index){return index.y})
                .attr("height", that.boxesHeight)
                .attr("width", that.boxesWidth)
                .style("fill", that.fillStates)
                .on("click", that.stateClick)  
                .on("mouseover", function(e){
                    var currentText = $('text')[getNumInDom(this,'rect')];
                    
                    var currentBox = this;
                    var pathToFill = that.d3Selection.selectAll('svg path').filter(function(i,d){
                        if(e.originID == i.id)
                            return this;
                    });

                    that.hoverOnState(stateboxes[0],null,pathToFill[0][0]);
                    that.hoverOnState(stateboxes[0],null,currentBox);
                    that.hoverOnText(stateboxes[0],null,currentText);
                })
                .on("mouseout", function(e){
                    var currentText = $('text')[getNumInDom(this,'rect')];
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
                    that.hoverOutText(d,null,currentText);
                });
                
            drawMap.selectAll(".stateAbbrev")
                .data(stateboxes)
                .enter().append("svg:text")
                    .attr("x", function(index){return index.x + 15;})
                    .attr("y", function(index){return index.y + 18;})
                    .style("font-size", "10px")
                    .attr("fill", "white")
                    .attr("font-weight", "bold")
                    .text(function(index){return index.abbrev})
                    .on("click", that.stateClick)
                    .on("mouseover", function(e){
                        var currentBox = $('rect')[getNumInDom(this,'text')];
                        var pathToFill = that.d3Selection.selectAll('svg path').filter(function(i,d){
                            if(e.originID == i.id)
                                return this;
                        });

                        that.hoverOnState(stateboxes[0],null,pathToFill[0][0]);
                        that.hoverOnState(stateboxes[0],null,currentBox);
                        that.hoverOnText(stateboxes[0],null,this);
                    })
                    .on("mouseout", function(e){
                        var pathToFill,
                            currentBox = $('rect')[getNumInDom(this,'text')],
                            d;
                        that.d3Selection.selectAll('svg path').filter(function(i,dat){
                            if(e.originID == i.id){
                                pathToFill = this;
                                d = i;
                            }
                        });
                        that.hoverOutState(d, null, pathToFill);
                        that.hoverOutState(d, null, currentBox);
                        that.hoverOutText(d, null, this);
                    });
        },
        
        drawMapKey: function(drawMap){
            var that = this,
            mapKey = this.legend;
            
            drawMap.selectAll(".keyBlob")
                .data(mapKey)
                .enter().append("circle")
                    .attr("cx", function(index){return index.x})
                    .attr("cy", function(index){return index.y})
                    .attr("r", "10")
                    .attr("height", that.boxesHeight)
                    .attr("width", that.boxesWidth)
                    .style("fill", that.fillStates);
                    
            drawMap.selectAll(".keyText")
                .data(mapKey)
                .enter().append("svg:text")
                    .attr("x", function(index){return index.x + d3Map.textX + 16}) // R2D3 and D3 treat X/Y differently
                    .attr("y", function(index){return index.y + 5})
                    .style("font-size", "14px")
                    .text(function(index){return index.key});
        },
        
        fillStates: function(d){
            if(d.code == 3) return "blue";
            else if(d.code == 2) return "red";
            else if(d.code == 1) return "green";
            
            return false;
        },
        
        hoverOnState: function(d,i,element){
            var target;
            
            if(element) target = element;
            else target = this;

            d3.select(target)
                .style("fill", "yellow")
                .style("cursor", "hand");

            if(d.name) stateName = d.name;
            else stateName = d.properties.name;

            $('#stateName').text(stateName);
            var statePolicy;

            switch(d.code){
                case '1': statePolicy = "Law Only"; break;
                case '2': statePolicy = "Policy Only"; break;
                case '3': statePolicy = "Both Law and Policy"; break;
            }

            $('#stateName').append("<br/>" + statePolicy);
        },
        
        hoverOnText: function(d,i,element){
            var target;
            
            if(element) target = element;
            else target = this;

            d3.select(target)
                .style("fill", "blue")
                .style("cursor", "hand");

            if(d.name) stateName = d.name;
            else stateName = d.properties.name;

            $('#stateName').text(stateName);
            var statePolicy;

            switch(d.code){
                case '1': statePolicy = "Law Only"; break;
                case '2': statePolicy = "Policy Only"; break;
                case '3': statePolicy = "Both Law and Policy"; break;
            }

            $('#stateName').append("<br/>" + statePolicy);
        },
        
        hoverOutText: function(d, i, element){
            var target;
            
            if(element) target = element;
            else target = this;
            
            d3.select(target).style("fill","white");
            $('#stateName').text('');
        },
        
        hoverOutState: function(d, i, element){
            var target;
            
            if(element) target = element;
            else target = this;
            
            d3.select(target).style("fill", d3Map.fillStates(d));
            $('#stateName').text('');
        },
        
        stateClick: function (d){
            window.open(d.url);
        }
    };
});

function getNumInDom(element, selector){
    return $.inArray(element,$(selector));
}
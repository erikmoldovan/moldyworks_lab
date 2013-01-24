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

        mapWidth:$('#mapContainer').width(),
        mapHeight:$('#mapContainer').height(),
        boxesLeft:830,
        boxesTop:173,
        boxesWidth:48,
        boxesHeight:25,
        boxesXPadding:2,
        boxesYPadding:2,
        boxPosOffset:52,
        textPosOffset:62,
        JSONresults:null,
        d3Selection:null,
        lawContainer:{key:"Law Only", code:1, color:"green"},
        policyContainer:{key:"Policy Only", code:2, color:"red"},
        bothContainer:{key:"Law & Policy", code:3, color:"blue"},
        highlightColor:"yellow",
        pathColor:"white",
        pathWidth:"1px",

        stateBoxIDs:["09", "10", "11", "25", "24", "33", "34", "44", "50", "57"],
        sBoxes:[],

        legend:[{x:830, y:360}, {x:830, y:390}, {x:830, y:420}],

        // Draws the map with the initial values loaded from JSON
        init: function() {
            var position, currentState;
            var that = this;

            // Abstracted color assignment for dynamic admin purposes
            for(i = 0; i < that.legend.length; i++){
                container = {};

                switch(i){
                    case 0:
                        container = that.lawContainer;
                        break;
                    case 1:
                        container = that.policyContainer;
                        break;
                    case 2:
                        container = that.bothContainer;
                        break;
                }

                that.legend[i].key = container.key;
                that.legend[i].code = container.code;
                that.legend[i].color = container.color;
            }

            that.d3Selection = d3.select('#mapContainer');

            var drawMap = that.d3Selection.append('svg')
                .attr("width", that.mapWidth)
                .attr("height", that.mapHeight);

            d3.json("data/states_final.json", function(collection) {
                that.JSONresults = collection.features;
                $.each(collection.features, function(){
                    currentState = this;
                    position = $.inArray(currentState.id, that.stateBoxIDs);
                    if(position !== -1){
                        that.getSBoxesValues(currentState, parseInt(position));
                    }
                });
                drawMap.selectAll(".states")
                    .data(collection.features)
                    .enter().append("path")
                    .attr("d", d3.geo.path().projection(d3.geo.albersUsa()))
      //              .attr("d", d3.geo.path().projection(d3.geo.albersUsa().linear().domain([0, 1600]).range([0, that.mapWidth])))
                    .style("fill", that.fillStates)
                    .style("stroke", that.pathColor)
                    .style("stroke-width", that.pathWidth)
                    .on("click", that.stateClick)
                    .on("mouseover", that.hoverOnState)
                    .on("mouseout", that.hoverOutState);

                that.drawSBoxes(drawMap);
                that.drawMapKey(drawMap);
            });
        },

        // Creates a streamlined array for use in filling in the stateboxes on the right side of the map
        getSBoxesValues: function(originalState, posID){
            var currentBox = {};

            currentBox.code = originalState.code;
            currentBox.url = originalState.url;
            currentBox.originID = originalState.id;
            currentBox.abbrev = originalState.properties.abbrev;
            currentBox.name = originalState.properties.name;

            if(posID % 2 == 0){
                currentBox.x = this.boxesLeft;
                currentBox.y = this.boxesTop + ((this.boxesHeight + this.boxesYPadding)*(posID/2))
            }
            else{
                currentBox.x = this.boxesLeft + this.boxesWidth + this.boxesXPadding;
                currentBox.y = this.boxesTop + ((this.boxesHeight + this.boxesYPadding)*((posID-1)/2))
            }

            this.sBoxes.push(currentBox);
        },

        // Handles the drawing of the "stateboxes" to aid in clicking on the small states
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
                .attr("id", that.fillSID)
                .style("fill", that.fillStates)
                .on("click", that.stateClick)
                .on("mouseover", function(e){
                    var currentText = $('text')[getNumInDom(this,'rect')];

                    var currentBox = this;

                    var pathToFill = that.d3Selection.selectAll('svg path').filter(function(i,d){
                        if(e.originID == i.id)
                            return this;
                    });

                    var sID = this.id;
                    if(sID >= 52){sID -= 52}; // Also required by IE

                    that.hoverOnState(stateboxes[sID], null, pathToFill[0][0]); // Fills State
                    that.hoverOnState(stateboxes[sID], null, currentBox); // Fills Box
                    that.hoverOnText(stateboxes[sID], null, currentText); // Fills State and Box when hovering on text
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
                    that.hoverOutText(d, null, currentText);
                });

            // Fills in text within stateboxes
            drawMap.selectAll(".stateAbbrev")
                .data(stateboxes)
                .enter().append("svg:text")
                    .attr("x", function(index){return index.x + 15;})
                    .attr("y", function(index){return index.y + 18;})
                    .style("font-size", "10px")
                    .style("fill", that.pathColor)
                    .attr("font-weight", "bold")
                    .attr("id", that.fillAID)
                    .text(function(index){return index.abbrev})
                    .on("click", that.stateClick)
                    .on("mouseover", function(e){
                        var currentBox = $('rect')[getNumInDom(this,'text')];
                        var pathToFill = that.d3Selection.selectAll('svg path').filter(function(i,d){
                            if(e.originID == i.id)
                                return this;
                        });

                        var sID = this.id;
                        if(sID >= 62){sID -= 62}; // Also required by IE

                        that.hoverOnState(stateboxes[sID], null, pathToFill[0][0]);
                        that.hoverOnState(stateboxes[sID], null, currentBox);
                        that.hoverOnText(stateboxes[sID], null, this);
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

        // Handles the drawing of the map key
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

        /*
        * If you need to add, or remove stateboxes, modify the subtractive number by 1 and 2 (SID and AID respectively)
        * This really should be abstracted and based on the number of elements in the JSON array...
        */

        // Assigns ID to Statebox
        fillSID: function(){
            return ($(this).index()-52); // Easy, if dirty, way to return the position within the sBoxes array
        },

        // Assigns ID to text within Statebox
        fillAID: function(){
            return ($(this).index()-62); // Easy, if dirty, way to return the position within the sBoxes array
        },

        // Fills in states with appropriate color depending on law/policy status. See legend array for more info.
        fillStates: function(d){
            return d3Map.legend[d.code-1].color;
        },

        // Called whenever hovering over state or statebox
        hoverOnState: function(d,i,element){
            var target;
            if(element) target = element;
            else target = this;

            d3.select(target).style("fill", d3Map.highlightColor);

            var stateName = ''; // Required declaration due to IE

            if(d.name) stateName = d.name; // If called by a statebox, this is true (as it uses the sBoxes array)
            else stateName = d.properties.name; // If called by a state, then this is true

            $('#stateName').text(stateName);
            statePolicy = d3Map.legend[d.code-1].key;
            $('#stateName').append("<br/>" + statePolicy);
        },

        // Resets state SVG element to original values for display
        hoverOutState: function(d, i, element){
            var target;

            if(element) target = element;
            else target = this;

            d3.select(target).style("fill", d3Map.fillStates(d)); // Calls initial color fill function again
            $('#stateName').text('');
        },

        // Called whenever hovering over text within statebox
        hoverOnText: function(d,i,element){
            var target;
            if(element) target = element;
            else target = this;

            d3.select(target).style("fill", d3Map.legend[d.code-1].color);

            $('#stateName').text(d.name); // This refers directly to the sBoxes array for a value
            statePolicy = d3Map.legend[d.code-1].key;
            $('#stateName').append("<br/>" + statePolicy);
        },

        // Resets text SVG element to original value for display
        hoverOutText: function(d, i, element){
            var target;

            if(element) target = element;
            else target = this;

            d3.select(target).style("fill", d3Map.pathColor);
            $('#stateName').text('');
        },

        // Redirects user to relevant government anti-bullying webpage when clicking on a state
        stateClick: function (d){
            window.open(d.url);
        }
    };
});

function getNumInDom(element, selector){
    return $.inArray(element,$(selector));
}
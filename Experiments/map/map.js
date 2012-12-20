/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 12/18/12
 * Time: 11:03 AM
 * To change this template use File | Settings | File Templates.
 */

if(ie8 == false){
    d3.json("states_final.json", function(collection) {
        d3.select('#mapDrawArea').selectAll("path")
            .data(collection.features)
            .enter().append("path")
            .attr("d", d3.geo.path().projection(d3.geo.albersUsa()))
            .style("fill", fillStates)
            .on("click", click)
            .on("mouseover", hoverOnState)
            .on("mouseout", hoverOutState);
    });
}
else{
    var draw_map = d3.select('#mapContainer').append('svg')
                        .attr("width", 960)
                        .attr("height", 500);

    d3.json("states_final.json", function(collection) {
        draw_map.selectAll("path")
            .data(collection.features)
            .enter().append("path")
            .attr("d", d3.geo.path().projection(d3.geo.albersUsa()))
            .style("fill", fillStates)
            .on("click", click)
            .on("mouseover", hoverOnState)
            .on("mouseout", hoverOutState);
    });
}

function fillStates(d){
    if(d.code == 3){
        return "blue";
    } else if(d.code == 2){
        return "red";
    } else if(d.code == 1){
        return "green";
    }
}

function hoverOnState(d){
    d3.select(this).style("fill", "yellow");
}

function hoverOutState(d){
    d3.select(this).style("fill", fillStates(d));
}

function click(d){
    window.open(d.url);
}
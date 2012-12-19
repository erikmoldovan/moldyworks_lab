/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 12/18/12
 * Time: 11:03 AM
 * To change this template use File | Settings | File Templates.
 */

var svg = d3.select('div').append('svg')
    .attr('height', 960)
    .attr('width', 500);

d3.json("states_final.json", function (collection) {
        svg.data(collection.features)
        .enter().append("path")
        .attr("d", d3.geo.path().projection(d3.geo.albersUsa()))
        .style("fill", fillStates)
        .on("click", click)
        .on("mouseover", hoverOnState)
        .on("mouseout", hoverOutState);
});

function fillStates(d) {
    if (d.code == 3) {
        return "blue";
    } else if (d.code == 2) {
        return "red";
    } else if (d.code == 1) {
        return "green";
    }
}

function hoverOnState(d) {
    svg.append.style("fill", "yellow");
}

function hoverOutState(d) {
    svg.append.style("fill", fillStates(d));
}

function click(d) {
    window.open(d.url);
}
function makeresponsive() {

var svgArea=d3.select("body").select("svg");
if (!svgArea.empty()){
    svgArea.remove();
}

var margin = {top: 10, right: 30, bottom: 50, left: 40},
width = 600 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)


var chartgroup = svg.append("g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")");


d3.csv("/StarterCode/assets/data/data.csv").then(function(data) {

console.log(data);
    data.forEach(function(data) {
    data.age = + data.age;
    data.smokes= + data.smokes;
    })

// Add X axis
var xlinearscale = d3.scaleLinear()
.domain([8, d3.max(data, d=>d.smokes)])
.range([ 0, width ]);

// Add X title
chartgroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)
.attr("text-anchor", "middle")
.attr("font-size", "16px")
.attr("fill", "black")
.text("Smoke Rate (%)");


chartgroup.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(xlinearscale));




// Add Y axis
var ylinearscale = d3.scaleLinear()
.domain([28, d3.max(data, d=>d.age)])
.range([ height, 0]);


// Add Y title
chartgroup.append("text")
.attr("transform", `translate(-30, ${height /2})rotate(-90)`)
.attr("text-anchor", "middle")
.attr("font-size", "16px")
.attr("fill", "black")
.text("Age");

chartgroup.append("g") 
.call(d3.axisLeft(ylinearscale));


// Add dots
var circlesgroup=chartgroup.append("g")
.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", data=>xlinearscale(data.smokes))
.attr("cy", data=>ylinearscale(data.age) )
.attr("r", 10.5)
//.attr("stroke-width", "1")
.style("fill", "#69b3a2");


var circletext=chartgroup.append("g")
.selectAll("text")
.data(data)
.enter()
.append("text")
.text(d=>d.abbr)
.attr("x", data=>(xlinearscale(data.smokes)-6))
.attr("y", data=>(ylinearscale(data.age)+2.5) )
.style("font-size", "10px")
.style("fill", "#fff");


// Step 1: Initialize Tooltip
var toolTip = d3.tip()
.attr("class", "tooltip")
.offset([-10, 60])
.html(function(d) {
  return (`<strong> ${d.state} </strong> <hr> Age: ${d.age} <br> Smoke Rate: ${d.smokes}`)
});

// (
//     `<strong>${dateFormatter(d.date)}<strong><hr>${d.medals}
// medal(s) won`)

// Step 2: Create the tooltip in chartGroup.
chartgroup.call(toolTip);

// Step 3: Create "mouseover" event listener to display tooltip
circletext.on("mouseover", function(d) {
toolTip.show(d, this);
})
// Step 4: Create "mouseout" event listener to hide tooltip
.on("mouseout", function(d) {
  toolTip.hide(d);
});

})

}

makeresponsive();

d3.select(window).on("resize", makeresponsive);




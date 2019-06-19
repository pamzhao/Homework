// @TODO: YOUR CODE HERE!

// Setup the SVG size
var svgWidth = 900; 
var svgHeight = 500; 

var margin = {
    top: 50,
    bottom: 80,
    right: 50,
    left: 80
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// append SVG element
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

console.log("Before read data")

// read CSV  
d3.csv("assets/data/data.csv").then(function(trendData) {
    console.log(trendData);

    // parse data
    trendData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // create x and y scales
    var xScale = d3.scaleLinear()
        .domain([d3.min(trendData, d => d.poverty) * 0.9, d3.max(trendData, d => d.poverty) * 1.1])
        .range([0, width]);
    var yScale = d3.scaleLinear()
        // .domain([d3.min(trendData, d => d.healthcare), d3.max(trendData, d => d.healthcare)])
        .domain([d3.min(trendData, d => d.healthcare * 0.5), d3.max(trendData, d => d.healthcare) * 1.1])
        .range([height, 0]);

    // create axes 
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // append axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    // append x and y axis labels
    chartGroup.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom / 2 )
        .style("font-weight", "bold")
        .text("In Poverty (%)");

    chartGroup.append("text")
        .attr("x", 0 - (height + margin.bottom) / 2)
        .attr("y", 0 - margin.left / 2)
        .attr("transform", "rotate(-90)")
        .style("font-weight", "bold")
        .text("Lacks Healthcare (%)");

    // create circles
    chartGroup.selectAll("circle")
        .data(trendData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty)) // position the x-centre
        .attr("cy", d => yScale(d.healthcare))  // position the y-centre
        .attr("r", 10)  // set the radius
        .style("fill", "lightblue")
        .style("opacity", "0.5");

    // append circle text
    chartGroup.selectAll("text.circle-text")
        .data(trendData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xScale(d.poverty)) // position the x-centre
        .attr("y", d => yScale(d.healthcare))  // position the y-centre
        .attr("text-anchor", "middle")
        .attr("dy", 5)
        .style("font-size", "10px")
        .style("color", "white");
});













// set the dimensions and margins of the graph
const margin = { top: 30, right: 30, bottom: 90, left: 85 },
  width = 460 - margin.left - margin.right,
  height = 500 - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#d3_hist")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Number of samples per continent
d3.json("d3/continents.json").then(function (data) {
  // console.log(data);

  // X axis
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(data.map((d) => d.continent))
    .padding(0.2);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr("color", "#f2f2f2")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 50)
    .text("Continent/Ocean");

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 20000]).range([height, 0]);
  svg.append("g").attr("color", "#f2f2f2").call(d3.axisLeft(y));

  // Bars
  const bars = svg
    .selectAll("mybar")
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d.continent))
    .attr("y", (d) => y(d.total))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d.total))
    .attr("fill", "#45c9fe")
    .style("opacity", 0.7)
    .append("title")
    .text(function (d) {
      return "Total: " + d.total;
    });

  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 30)
    .attr("x", -height / 2 + margin.top)
    .text("No. of Samples");
});

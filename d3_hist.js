// set the dimensions and margins of the graph
const margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#d3_hist")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data

//convert strings that are numbers back to numbers by adding a + in the front
const parseRow = (d) => {
  d.id = +d.id;
  d.longitude = +d.longitude;
  d.latitude = +d.latitude;
  d.ITS1_extracted = +d.ITS1_extracted;
  d.ITS2_extracted = +d.ITS2_extracted;
  d.ITS_total = +d.ITS_total;
  d.pH = +d.pH;
  d.year_start = +d.year_start;
  d.end = +d.year_end;
  d.MAT = +d.MAT;
  d.MAP = +d.MAP;
  return d;
};

const csvdata =
  "https://raw.githubusercontent.com/pheebely/globalfungi/main/globalfungi_merged.csv";
d3.csv(csvdata, parseRow).then(function (data) {
  console.log(data);
  // X axis
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(data.map((d) => d.continent))
    .padding(0.2);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 60000]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Bars
  svg
    .selectAll("mybar")
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d.continent))
    .attr("y", (d) => y(d.year_end))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d.year_end))
    .attr("fill", "#69b3a2");
});

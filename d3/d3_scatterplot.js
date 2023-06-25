// set the dimensions and marginSPs of the graph
const marginSP = { top: 20, right: 35, bottom: 75, left: 75 },
  widthSP = 460 - marginSP.right,
  heightSP = 500;

const { csv, select, scaleLinear, extent, axisLeft, axisBottom } = d3; //same as const csv = d3.csv, so we dont need to keep repeating d3.

const csvdata = "d3/globalfungi_merged.csv";

//convert strings that are numbers back to numbers by adding a + in the front
const parseRow = (d) => {
  d.id = +d.id;
  d.longitude = +d.longitude;
  d.latitude = +d.latitude;
  d.ITS1_extracted = +d.ITS1_extracted;
  d.ITS2_extracted = +d.ITS2_extracted;
  d.ITS_total = +d.ITS_total;
  d.pH = +d.pH;
  d.year_of_sampling = +d.year_of_sampling;
  d.MAT = +d.MAT;
  d.MAP = +d.MAP;
  return d;
};

//function that takes as input one row and give back some value from the data we should use
const xValue = (d) => d.MAT;
const yValue = (d) => d.MAP;

const svgSP = select("#d3_scatter")
  .append("svg")
  .attr("width", widthSP + marginSP.right)
  .attr("height", heightSP + marginSP.bottom);

const main = async () => {
  //using this modern syntax for REQUEST and PROMISE of data
  const data = await csv(csvdata, parseRow);

  const x = scaleLinear() //checks each and every row of the dataset and returns min and max
    .domain(extent(data, xValue)) //extent gets both min and max at the same time
    .range([marginSP.left, widthSP - marginSP.right]); //range for x scale in svg
  // console.log(x.range());
  //output with be an array
  const y = scaleLinear() //checks each and every row of the dataset and returns min and max
    .domain(extent(data, yValue)) //extent gets both min and max at the same time
    .range([heightSP - marginSP.bottom, marginSP.top]); //flipped this because we want lowest y value at the bottom
  //   console.log(y.range());
  //output with be an array

  const marks = data.map((d) => ({
    x: x(xValue(d)),
    y: y(yValue(d)),
  }));
  //   console.log(marks);

  svgSP
    .selectAll("circle")
    .data(marks)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 1.5)
    .style("fill", "#f8bf0f") //c54a2f
    .style("opacity", "0.2");

  //Create axes. The axes scale is the same as the scale used for the circles so it lines up perfectly.
  svgSP
    .append("g")
    .attr("transform", `translate(${marginSP.left},0)`)
    .call(axisLeft(y));

  svgSP
    .append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", marginSP.left - 60)
    .attr("x", -heightSP / 2 + marginSP.bottom)
    .text("Mean Precipitation (mm)");

  svgSP
    .append("g")
    .attr("transform", `translate(0, ${heightSP - marginSP.bottom})`)
    .call(axisBottom(x));

  svgSP
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", widthSP - 150)
    .attr("y", heightSP)
    .text("Mean Temperature (c)");

  // console.log(data);
};
main();

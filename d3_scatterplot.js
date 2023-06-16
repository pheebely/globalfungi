const { csv, select, scaleLinear, extent, axisLeft, axisBottom } = d3; //same as const csv = d3.csv, so we dont need to keep repeating d3.

const csvdata =
  "https://raw.githubusercontent.com/pheebely/globalfungi/main/globalfungi_merged.csv";

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
const xValue = (d) => d.longitude;
const yValue = (d) => d.latitude;

const margin = {
  top: 100,
  right: 20,
  bottom: 20,
  left: 50,
};

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const main = async () => {
  //using this modern syntax for REQUEST and PROMISE of data
  const data = await csv(csvdata, parseRow);

  const x = scaleLinear() //checks each and every row of the dataset and returns min and max
    .domain(extent(data, xValue)) //extent gets both min and max at the same time
    .range([margin.left, width - margin.right]); //range for x scale in svg
  console.log(x.range());
  //output with be an array
  const y = scaleLinear() //checks each and every row of the dataset and returns min and max
    .domain(extent(data, yValue)) //extent gets both min and max at the same time
    .range([height - margin.bottom, margin.top]); //flipped this because we want lowest y value at the bottom
  //   console.log(y.range());
  //output with be an array

  const marks = data.map((d) => ({
    x: x(xValue(d)),
    y: y(yValue(d)),
  }));
  //   console.log(marks);

  svg
    .selectAll("circle")
    .data(marks)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 3);

  //Create axes. The axes scale is the same as the scale used for the circles so it lines up perfectly.
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(axisLeft(y));

  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(axisBottom(x));

  console.log(data);
};
main();

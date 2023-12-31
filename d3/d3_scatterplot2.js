// set the dimensions and marginSPs of the graph
const marginSP2 = { top: 20, right: 35, bottom: 75, left: 75 },
  widthSP2 = 460 - marginSP2.right,
  heightSP2 = 500;

const csv2data =
  "https://raw.githubusercontent.com/pheebely/globalfungi/main/d3/globalfungi_merged_noNaN.csv";

//function that takes as input one row and give back some value from the data we should use
const xValue2 = (d) => d.MAT;
const yValue2 = (d) => d.pH;

const svgSP2 = d3
  .select("#d3_plot")
  .append("svg")
  .attr("width", widthSP2 + marginSP2.right)
  .attr("height", heightSP2 + marginSP2.bottom);

const main2 = async () => {
  //using this modern syntax for REQUEST and PROMISE of data
  const data = await d3.csv(csv2data, parseRow);

  const x2 = d3
    .scaleLinear() //checks each and every row of the dataset and returns min and max
    .domain(d3.extent(data, xValue2)) //extent gets both min and max at the same time
    .range([marginSP2.left, widthSP2 - marginSP2.right]); //range for x scale in svg
  const y2 = d3
    .scaleLinear() //checks each and every row of the dataset and returns min and max
    .domain(d3.extent(data, yValue2)) //extent gets both min and max at the same time
    .range([heightSP2 - marginSP2.bottom, marginSP2.top]); //flipped this because we want lowest y value at the bottom

  const marks2 = data.map((d) => ({
    x: x2(xValue2(d)),
    y: y2(yValue2(d)),
  }));
  //   console.log(marks);

  svgSP2
    .selectAll("circle")
    .data(marks2)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 1.5)
    .style("fill", "#6eb620")
    .style("opacity", "0.2");

  //Create axes. The axes scale is the same as the scale used for the circles so it lines up perfectly.
  svgSP2
    .append("g")
    .attr("transform", `translate(${marginSP2.left},0)`)
    .call(d3.axisLeft(y2));

  svgSP2
    .append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", marginSP2.left - 40)
    .attr("x", -heightSP2 / 2 + marginSP2.bottom)
    .text("pH Value");

  svgSP2
    .append("g")
    .attr("transform", `translate(0, ${heightSP2 - marginSP2.bottom})`)
    .call(d3.axisBottom(x2));

  svgSP2
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", widthSP2 - 150)
    .attr("y", heightSP2)
    .text("Mean Temperature (c)");

  // console.log(data);
};
main2();

const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 1200 500")
    .style("border", "1px solid black");

d3.csv("../data/vegetation_hab.csv", d => {
  return {
    habitat: d.habitat,
    sighting: +d.sighting
  };
}).then(data => {
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.sighting));
  console.log(d3.min(data, d => d.sighting));

  data.sort((a, b) => b.sighting - a.sighting);

  createBarChart(data);
});


const createBarChart = data => {

  const xScale = d3.scaleLinear()
  .domain([0, 1620])
  .range([0, 800]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.habitat))
    .range([0, 500])
    .padding(0.1);

  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.habitat)})`);

  barAndLabel
  .append("rect")
    // .attr("class", d => {
    //   console.log(d);
    //   return `bar bar-${d.sighting}`;
    // })
    .attr("width", d => xScale(d.sighting))
    .attr("height", yScale.bandwidth())
    .attr("x", 250)
    .attr("y", 0)
    .attr("fill", "green")
    .attr("fill", d => d.habitat === "Rainforest and related scrub" ? "blue" : "green");

  barAndLabel
  .append("text")
    .text(d => d.habitat)
    .attr("x", 240)
    .attr("y", 33)
    .attr("text-anchor", "end")
    .style("font-family", "sans-serif")
    .style("font-size", "13px");

    barAndLabel
    .append("text")
      .text(d => d.sighting)
      .attr("x", d => 250 + xScale(d.sighting) + 4)
      .attr("y", 33)
      .style("font-family", "sans-serif")
      .style("font-size", "13px");
  };


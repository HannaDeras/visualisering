/* import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

 

// -----------------------Stapeldiagram------------------------------- 


const data = [
  { factor: "Mobile Responsiveness", value: 4.22 },
  { factor: "Typography", value: 3.89 }
];

// Chart dimensions
const width = 600;
const height = 400;
const margin = { top: 20, right: 30, bottom: 40, left: 50 };

// Create SVG container
const svg = d3.select("#chart2")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Set up scales
const xScale = d3.scaleBand()
.domain(data.map(d => d.factor))
.range([margin.left, width - margin.right])
.padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

// Add X-axis
svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale))
    .attr("class", "axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickFormat(() => "")) // Gömmer texten på x-axeln
    .attr("class", "axis");

// Add Y-axis
svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale))
    .attr("class", "axis");

// Draw bars
svg.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", d => xScale(d.factor))
  .attr("y", d => yScale(d.value))
  .attr("width", xScale.bandwidth())
  .attr("height", d => height - margin.bottom - yScale(d.value))
  .attr("fill", d => {
    if (d.factor === "Mobile Responsiveness") {
      return " #833AB4";
    } else if (d.factor === "Typography") {
      return " #F56040"; // En annan färg för Typography
    } else {
      return "gray"; // Standardfärg
    }
    
  });


// Add labels
svg.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => xScale(d.factor) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.value) - 5)
    .attr("text-anchor", "middle")
    .text(d => d.value)
    .style("font-family", "Arial, sans-serif"); // Ändra typsnitt
    



     */

//.attr("stroke", platform === "Instagram" ? " #833AB4" : "gray")



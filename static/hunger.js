// public/scripts/ms1.js
export function renderMS1() {
  const container = document.getElementById('ms-1');
  if (!container) return;

  const svg = d3.select(container)
    .append("svg")
    .attr("width", 200)
    .attr("height", 100);

  svg.append("circle")
    .attr("cx", 100)
    .attr("cy", 50)
    .attr("r", 40)
    .attr("fill", "steelblue");
}



const data = [
    { year: 2000, value: 24.9 },
    { year: 2008, value: 18.9 },
    { year: 2016, value: 17.9 },
    { year: 2024, value: 14.4 },
    { year: 2030, value: 11.7 },
  ];
  
  // Severity coloring function
  function getColor(val) {
    if (val < 10) return "rgba(0, 128, 0, 1)";
    if (val < 20) return "#FFE034";
    if (val < 35) return "#F9452F";
    if (val < 50) return "rgba(255, 0, 0, 1)";
    return "darkred";
  }
  
  function getColor_op(val) {
    if (val < 10) return "rgba(0, 128, 0, 0.55)";
    if (val < 20) return "#FFE0346e";
    if (val < 35) return "#F9452F6e";
    if (val < 50) return "rgba(255, 0, 0, 0.55)";
    return "rgba(128, 0, 0, 0.55)";
  }

  const margin = {top: 20, right: 30, bottom: 30, left: 50};
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

  const svg = d3.select("#chart2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left-20},${margin.top})`);
  
  const x = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([margin.left, width])
      .padding(0.3);
  
  const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height, margin.top]);
  
  svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  
  // Tooltip div
  const tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("padding", "8px")
    .style("background", "rgba(0, 0, 0, 0.7)")
    .style("color", "white")
    .style("font-size", '12px')
    .style("pointer-events", "none")
    .style('transition', 'opacity 0.2s')
    .style('border-radius', '4px')
    .style("display", "none");
    
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", d => x(d.year))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", d => getColor_op(d.value))
    .attr("stroke", d => getColor(d.value))
    .attr("stroke-width", '2px')
    .on("mouseover", function(event, d) {
      tooltip.style("display", "block")
             .html(`<strong>Year:</strong> ${d.year}<br><strong>Index:</strong> ${d.value}`);
      d3.select(this).attr("fill", d => getColor(d.value)).attr('border', '1px solid red').style('transition', 'all 0.3s');
    })
    .on("mousemove", function(event) {
      tooltip.style("left", event.pageX + 10 + "px")
             .style("top", event.pageY - 20 + "px");
    })
    .on("mouseout", function() {
      tooltip.style("display", "none");
      d3.select(this).attr("fill", d => getColor_op(d.value));
    });
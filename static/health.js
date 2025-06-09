
const deathButton = document.getElementById('show-death');

deathButton.addEventListener('click', ()=>{
  if(deathButton.classList.contains('clicked2')){
    deathButton.classList.remove('clicked2');
    drawMap(0);
  }
  else{
    deathButton.classList.add('clicked2');
    drawMap(1);
  }
});

drawMap(1);

function drawMap(x){

  if(document.querySelector('#chart3').children.length != 0){
    document.querySelector('#chart3').replaceChildren('');
  }

  Promise.all([
    d3.json("ph.json"),
    d3.csv("region_health_stats.csv")
  ]).then(([geo, data]) => {
    const margin = {top: 20, right: 30, bottom: 30, left: 50};
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    const svg = d3.select("#chart3")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
  
    // Group for the map shapes — this is what will be zoomed/panned
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left - 20},${margin.top})`);
  
    const projection = d3.geoMercator().fitSize([600, 600], geo);
    const path = d3.geoPath().projection(projection);
  
    const csvToGeoMap = {
      "BARMM": "Autonomous Region in Muslim Mindanao",
      "CAR": "Cordillera Administrative Region",
      "MIMAROPA": "Mimaropa",
      "NCR": "National Capital Region",
      "REGION I": "Ilocos",
      "REGION II": "Cagayan Valley",
      "REGION III": "Central Luzon",
      "REGION IV-A": "Calabarzon",
      "REGION IX": "Zamboanga Peninsula",
      "REGION V": "Bicol",
      "REGION VI": "Western Visayas",
      "REGION VII": "Central Visayas",
      "REGION VIII": "Eastern Visayas",
      "REGION X": "Northern Mindanao",
      "REGION XI": "Davao",
      "REGION XII": "Soccsksargen",
      "REGION XIII": "Caraga"
    };
  
    const geoToCsvMap = Object.entries(csvToGeoMap).reduce((acc, [csv, geo]) => {
      acc[geo.toLowerCase()] = csv;
      return acc;
    }, {});
  
    const dataMap = new Map(data.map(d => [d.province.trim().toUpperCase(), +d.Health_Facility_Density]));
  
    const color = d3.scaleQuantize()
      .domain([0, d3.max(data, d => +d.Health_Facility_Density)])
      .range(["#ffffcc","#ffeda0","#feb24c","#f03b20","#bd0026"]);
    
    
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

    // Draw the map paths inside group g
    g.selectAll("path")
    .data(geo.features)
    .enter().append("path")
    .attr("opacity", 0.7)
    .attr('class', '')
    .attr("transform", `translate(0,${-100})`)
    .attr("d", path)
    .attr("fill", d => {
      const geoName = d.properties.name.trim().toLowerCase();
      const csvName = geoToCsvMap[geoName];
      if (!csvName) return "#ccc";
      const val = dataMap.get(csvName);
      return val != null ? color(val) : "#ccc";
    })
    .attr("class", d => {
      const geoName = d.properties.name.trim().toLowerCase();
      const csvName = geoToCsvMap[geoName];
      const val = csvName ? dataMap.get(csvName) : null;
      const fillColor = val != null ? color(val) : "#ccc";
      return `r-${fillColor.replace("#", "")}`;
    })
    .attr("stroke", "white")
    .on("mouseover", function(event, d)  {
        d3.select(this).attr("opacity", 0.9);
        const geoName = d.properties.name.trim().toLowerCase();
        const csvName = geoToCsvMap[geoName];
        const val = csvName ? dataMap.get(csvName) : null;
        tooltip
          .style("display", "block")   // SHOW tooltip
          .style("opacity", 1)
          .html(`<strong>${d.properties.name}</strong><br/>Health Facility Density: ${val ?? "N/A"}`);
      })
      // Move tooltip position
      .on("mousemove", (event) => {
        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      // Hide tooltip on mouseout
      .on("mouseout", function()  {
        d3.select(this).attr("opacity", 0.7);
        tooltip
          .style("opacity", 0)
          .style("display", "none");  // HIDE tooltip
      });

    // Zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([1, 8])  // min and max zoom scale
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
  
    svg.call(zoom);

  if(x == 1){
  // 1. Radius scale for deaths
  const radiusScale = d3.scaleSqrt()
    .domain([0, 96411])
    .range([0, 15]); // adjust as needed

  // 2. Deaths map
  const deathsMap = new Map(data.map(d => {
    const geoRegion = csvToGeoMap[d.province.trim()];
    return [geoRegion, +d.Deaths];
  }));

  const distinctContrastingColors = [
      "#1f78b4", // blue
      "#33a02c", // green
      "#6a3d9a", // purple
      "#a6cee3", // light blue
      "#b2df8a", // light green
      "#cab2d6", // lavender
      "#fb9a99", // light red-pink
      "#e31a1c", // red
      "#fdbf6f", // peach
      "#ff7f00", // orange
      "#b15928", // brown
      "#8dd3c7", // teal
      "#ffffb3", // very light yellow
      "#bebada", // gray-lavender
      "#80b1d3", // medium blue
      "#fdb462", // warm beige
      "#b3de69", // lime
      "#fccde5"  // pink
    ];
    
  // 3. Color scale — one color per region
  const colorScale = d3.scaleOrdinal()
    .domain(geo.features.map(d => d.properties.name))
    .range(distinctContrastingColors); // at least 18 colors


    // Select the legend container
  const legend = d3.select(".legends");

  // Bind data: one div per region name
  legend.selectAll("div")
    .data(colorScale.domain())
    .enter()
    .append("div")
    .attr("class", "legend-item")
    .style("display", "flex")
    .style("align-items", "center")
    .style("margin-bottom", "6px")
    .style("font-size", 'smaller')
    .html(d => `
      <div style="
        width: 10px;
        height: 10px;
        border: 1px solid #333;
        background-color: ${colorScale(d)};
        border-radius: 50%;
        margin-right: 8px;
        flex-shrink: 0;
      "></div>
      <span>${d}</span>
    `);

  // 4. Append circles
  g.selectAll("circle")
    .data(geo.features)
    .enter()
    .append("circle")
    .attr("transform", `translate(0,${-100})`)
    .attr("cx", d => path.centroid(d)[0])
    .attr("cy", d => path.centroid(d)[1])
    .attr("r", d => {
      const regionName = d.properties.name;
      const deaths = deathsMap.get(regionName) || 0;
      return radiusScale(deaths);
    })
    .attr("fill", d => colorScale(d.properties.name))
    .attr("opacity", 0.7)
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .on("mouseover", (event, d) => {
      const regionName = d.properties.name;
      const deaths = deathsMap.get(regionName) || "N/A";
      tooltip
        .style("display", "block")
        .style("opacity", 1)
        .html(`<strong>${regionName}</strong><br/>Deaths: ${deaths}`);
    })
    .on("mousemove", (event) => {
      tooltip
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0).style("display", "none");
    });
  }
  });
}
const nodes = [
    {id: "A"}, {id: "B"}, {id: "C"}, {id: "D"}, {id: "E"}, {id: "F"}, {id: "G"}
  ];
  
  const links = [
    {source: "A", target: "C"},
    {source: "B", target: "C"},
    {source: "D", target: "C"},
    {source: "E", target: "C"},
    {source: "F", target: "C"},
    {source: "G", target: "C"}
  ];
  
  const conn = {
    'A': 0,
    'B': 1,
    'C': 4,
    'D': 2,
    'E': 3, 
    'F': 4,
    'G': 5, 
    'H': 6
  };

  const draculaColors = [
    "#ff79c6aa", // Bataan
    "#bd93f9aa", // Bulacan
    "#8be9fdaa", // Metro Manila
    "#50fa7baa", // Green
    "#f1fa8caa", // Yellow
    "#ffb86caa", // Orange
    "#ff5555aa"  // Red
  ];

  const draculaColors1 = [
    "#ff79c6", // Bataan
    "#bd93f9", // Bulacan
    "#8be9fd", // Metro Manila
    "#50fa7b", // Green
    "#f1fa8c", // Yellow
    "#ffb86c", // Orange
    "#ff5555"  // Red
  ];


  const co2p = document.getElementById('co2');

  co2p.innerHTML = 330000;
  
  function predict_temps(prov, em, s){
    switch(prov){
      case 0: return s==0 ? 0.000069*em + 3.530307 : 0.000007*em + 29.795658;
      case 1: return s==0 ? 0.000072*em+	2.384701 : -0.000002*em+	32.832625;
      case 2: return s==0 ? 0.000061*em+	8.134869: -0.000029*em+	45.585942;
      case 3: return s==0 ? 0.000063*em+	8.272003 : -0.000014*em+	39.931994;
      case 4: return s==0 ? 0.000043*em+	20.179544 : 0.000007*em+	33.866904;
      case 5: return s==0 ? 0.000058*em+	9.306260 : -0.000029*em+	45.916886;
      case 6: return s==0 ? 0.000062*em+	7.840927: 0.000006*em+	31.096295;
    }
  }


  draw_heat(0);

const wt = document.getElementById('wet');
const dr = document.getElementById('dry');

wt.addEventListener('click', ()=>{
    if(wt.classList.contains('clicked4')){
    }
    else{
        wt.classList.add('clicked4');
        draw_heat(1);
        if(dr.classList.contains('clicked5')){
            dr.classList.remove('clicked5');
        }
    }

});
dr.addEventListener('click', ()=>{
    if(dr.classList.contains('clicked5')){
    }
    else{
        dr.classList.add('clicked5');
        draw_heat(0);
        if(wt.classList.contains('clicked4')){
            wt.classList.remove('clicked4');
        }
    }

});

function draw_heat(season){
    const width = 800, height = 400;
    const margin = {top: 20, right: 30, bottom: 30, left: 50};

    if(document.querySelector('#chart5').children.length != 0){
        document.querySelector('#chart5').replaceChildren('');
    }
    
    const svg = d3.select("#chart5").append("svg")
        .attr("width", width)
        .attr("height", height);
    
    const y = d3.scaleLinear()
        .domain([330000, 600000])
        .nice()
        .range([height - margin.bottom, margin.top]);
    
    const yAxisGenerator = d3.axisLeft(y).ticks(6);
    
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", `translate(80,0)`)
        .call(yAxisGenerator);
    
    // Initial emission value
    const initialEmission = 330000;
    
    // Add initial temp + radius
    nodes.forEach(d => {
        d.temp = predict_temps(conn[d.id], initialEmission, season);
        d.r = predict_temps(conn[d.id], initialEmission, season)-predict_temps(conn['C'], initialEmission, season) < 0 ?  predict_temps(conn[d.id], initialEmission, season) * 1.5 -5 : predict_temps(conn[d.id], initialEmission, season) * 1.5 +5;
    });
    
    const hoverCircle = svg.append("circle")
        .attr("cx", 80)
        .attr("cy", y(initialEmission))
        .attr("r", 8)
        .attr("fill", "steelblue")
        .attr("cursor", "ns-resize")
        .call(d3.drag()
        .on("drag", function (event) {
            let newY = Math.max(margin.top, Math.min(height - margin.bottom, event.y));
            hoverCircle.attr("cy", newY);
    
            const yValue = y.invert(newY);
    
            node.attr("r", d => {
            d.temp = predict_temps(conn[d.id], yValue, season);
            console.log(conn[d.id]);
            d.r = predict_temps(conn[d.id], yValue, season)-predict_temps(conn['C'], yValue, season) < 0 ?  predict_temps(conn[d.id], yValue, season) * 1.5 -5 : predict_temps(conn[d.id], yValue, season) * 1.5 +5;
            return d.r;
            });
    
            labels.text(d => `${d.temp.toFixed(2)}°C`);
            co2p.innerHTML = yValue;
    
            simulation.force("collide", d3.forceCollide().radius(d => d.r));
            simulation.alpha(0.5).restart();
        })
        );
    
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-2500))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(d => d.r));
    
    const link = svg.append("g").selectAll("line")
        .data(links).enter().append("line")
        .attr("stroke", "black")
        .attr("stroke-width", 2);
    
    const node = svg.append("g").selectAll("circle")
        .data(nodes).enter().append("circle")
        .attr("fill", (d, i) => draculaColors[i % draculaColors.length])
        .attr("stroke", (d, i) => draculaColors1[i % draculaColors1.length])
        .attr("stroke-width", 3)
        .attr("class", "node")
        .attr("id", d => d.id)
        .attr("r", d => d.r)
        .call(d3.drag()
        .on("start", dragStart)
        .on("drag", dragged)
        .on("end", dragEnd)
        );
    
    const labels = svg.append("g").selectAll("text")
        .data(nodes).enter().append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("font-size", "12px")
        .style("color", "#333")
        .style("pointer-events", "none")
        .text(d => `${d.temp.toFixed(2)}°C`);
    
    simulation.on("tick", () => {
        link
        .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
    
        node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    
        labels
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });
    
    function dragStart(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
    }
    
    function dragged(event, d) {
        d.fx = event.x; d.fy = event.y;
    }
    
    function dragEnd(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null; d.fy = null;
    }
}
function predict(x, p){
    if(p == 0){ // poor
      return  2.86618529e+05*x -1.42903374e+02*(x*x) + 2.37488006e-02*(x*x*x) -191613239.54053143
    }
    else if(p == 1){ // not poor
      return -1.16864657e+05*x + 5.81660863e+01*(x*x) -9.64963337e-03*(x*x*x) + 78262228.24878019
    } // Borderline
    return -1.69753872e+05*x + 8.47372876e+01*(x*x) -1.40991673e-02*(x*x*x) + 113352211.29175131
}

// buttons
const b1 = document.getElementById('poor');
const b2 = document.getElementById('not-poor');
const b3 = document.getElementById('borderline');
let p = 0;

end = document.getElementById('end');
start = document.getElementById('start');

let s = Number(start.value);
let e = Number(end.value);
let currentTransform = d3.zoomIdentity;

end.min = Number(start.value)+1;
createPlot(s, e, p);

b1.addEventListener('click', () =>{
    if(b1.classList.contains('clicked')){
        b1.classList.remove('clicked');
    }
    else{
        b1.classList.add('clicked');
        b2.classList.remove('clicked');
        b3.classList.remove('clicked');
        p = 0;
        createPlot(Number(start.value), Number(end.value), p);
    }
});
b2.addEventListener('click', () =>{
    if(b2.classList.contains('clicked')){
        b2.classList.remove('clicked');
    }
    else{
        b2.classList.add('clicked');
        b1.classList.remove('clicked');
        b3.classList.remove('clicked');
        p = 1;
        createPlot(Number(start.value), Number(end.value), p);
    }
});
b3.addEventListener('click', () =>{
    if(b3.classList.contains('clicked')){
        b3.classList.remove('clicked');
        
    }
    else{
        b3.classList.add('clicked');
        b1.classList.remove('clicked');
        b2.classList.remove('clicked');
        p = 2;
        createPlot(Number(start.value), Number(end.value), p);
    }
});



end.addEventListener('input', () =>{
    createPlot(Number(start.value), Number(end.value), p);
});
start.addEventListener('input', () =>{
    createPlot(Number(start.value), Number(end.value), p);
});



function createPlot(s, e, p){
    const data = [];
    for (let i = 0; i < (e-s)*12; i++) {
        let pred = predict(s+(i/12), p);
        if(pred < 0){
            pred = 0;
        }
        data.push({
            date: new Date(s, i+1, 1),
            value: pred
        });
    }

    // Dimensions and margins
    const margin = {top: 20, right: 30, bottom: 30, left: 50};
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    if(document.querySelector('.chart').children.length != 0){
        document.querySelector('.chart').replaceChildren('');
    }

    // Create SVG
    const svg = d3.select(".chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add clipping path to hide overflow on left
    svg.append("defs").append("clipPath")
        .attr("id", "chart-clip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height);


    // Scales
    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);
        
    const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
        .nice()
        .range([height, 0]);
        
    // Axes
    const xAxis = svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));
        
    const yAxis = svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));
        
    // Add grid lines
    svg.append("g")
        .attr("class", "grid grid--x")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x)
            .tickSize(-height)
            .tickFormat("")
        );
        
    svg.append("g")
        .attr("class", "grid grid--y")
        .call(d3.axisLeft(y)
            .tickSize(-width)
            .tickFormat("")
        );
        
    // Line generator
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value));
        
    // Draw the line
    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("clip-path", "url(#chart-clip)")
        .attr("d", line);
        
    // Add dots for hover interaction
    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("r", 1)
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value));
        
    // Tooltip
    const tooltip = d3.select(".tooltip");
        
    // Add zoom/pan behavior
    const zoom = d3.zoom()
        .scaleExtent([1, 10]) // Allow zooming from 1x to 10x
        .translateExtent([[0, 0], [width, height]])
        .extent([[0, 0], [width, height]])
        .on("zoom", zoomed);
        
    svg.append("rect")
        .attr("class", "zoom-rect")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);
        
    function zoomed(event) {
        currentTransform = event.transform; // <--- store the current transform
        const newX = currentTransform.rescaleX(x);
        
        xAxis.call(d3.axisBottom(newX));
        
        svg.select(".grid--x").call(d3.axisBottom(newX)
            .tickSize(-height)
            .tickFormat("")
        );
        
        svg.select(".line")
            .attr("d", line.x(d => newX(d.date)));
            
        svg.selectAll(".dot")
            .attr("cx", d => newX(d.date));
    }
        

    // Hover interaction
    svg.on("mousemove", function(event) {
        const [mouseX, mouseY] = d3.pointer(event);
        
        // Find the closest data point
        const xScale = currentTransform.rescaleX(x);
        const xValue = xScale.invert(mouseX);
        const bisectDate = d3.bisector(d => d.date).left;
        const i = bisectDate(data, xValue, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        let d;
        if (i === 0) {
            d = data[0];
        } else if (i >= data.length) {
            d = data[data.length - 1];
        } else {
            const d0 = data[i - 1];
            const d1 = data[i];
            d = xValue - d0.date > d1.date - xValue ? d1 : d0;
        }
        
        const chrt = document.getElementById('chart')
        r = chrt.getBoundingClientRect();

        // Show tooltip
        tooltip
            .style("opacity", 1)
            .html(`Date: ${d3.timeFormat("%Y-%m-%d")(d.date)}<br/>Count: ${d.value.toFixed(2)}`)
            .style("left", `${event.pageX - r.left}px`)
            .style("top", `${event.pageY - r.top}px`);
        
        
        // Highlight the dot
    });

    svg.on("mouseleave", function() {
        tooltip.style("opacity", 0);
        svg.selectAll(".dot").attr("opacity", 0);
    });
}
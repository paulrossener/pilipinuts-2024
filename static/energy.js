
const end = document.getElementById('end2');
const start = document.getElementById('start2');
let currentTransform = d3.zoomIdentity;

const gas = document.getElementById('gas');
const elect = document.getElementById('elec');

newPlot(0);
gas.addEventListener('click', ()=>{
    if(gas.classList.contains('clicked3')){
    }
    else{
        gas.classList.add('clicked3');
        elect.classList.remove('clicked3');
        newPlot(0);

        gas.classList.add('button-gas');
        elect.classList.add('gas');

        if(elect.classList.contains('button-elect')){
            gas.classList.remove('button-elect');
            elect.classList.remove('elect');
            elect.classList.remove('button-elect');
        }
    }
});

elect.addEventListener('click', ()=>{
    if(elect.classList.contains('clicked3')){
    }
    else{
        elect.classList.add('clicked3');
        gas.classList.remove('clicked3');
        newPlot(1);

        gas.classList.add('elect');
        elect.classList.add('button-elect');

        if(gas.classList.contains('button-gas')){
            gas.classList.remove('gas');
            gas.classList.remove('button-gas');
            elect.classList.remove('button-gas');
        }
    }
});

function newPlot(xl){

    if(document.querySelector('#chart4').children.length != 0){
        document.querySelector('#chart4').replaceChildren('');
    }

    const lower = document.getElementById('lower-bound');
    const upper = document.getElementById('upper-bound');
    
    let docu = "forecast_gas.csv";
    if(xl == 1){
        lower.classList.add('elect');
        upper.classList.add('elect');
        docu = "forecast_meralco.csv";
    }
    else{
        if(lower.classList.contains('elect')){
            lower.classList.remove('elect');
            upper.classList.remove('elect');
            lower.classList.add('gas');
            upper.classList.add('gas');
        }
    }

    const parseDate = d3.timeParse("%Y-%m-%d"); 


        d3.csv(docu).then(raw => {
            const data = raw.map(d => ({

                date: parseDate(String(d.ds)),
                yhat: +d.yhat,
                yhat_lower: +d.yhat_lower,
                yhat_upper: +d.yhat_upper
            }));
            console.log(data);
        
            // Dimensions and margins
            const margin = {top: 20, right: 30, bottom: 30, left: 50};
            const width = 800 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;
        
            const svg = d3.select("#chart4")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);
        
            // Clipping path
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
                .domain([d3.min(data, d => d.yhat_lower), d3.max(data, d => d.yhat_upper)])
                .nice()
                .range([height, 0]);
        
            const xAxis = svg.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));
        
            const yAxis = svg.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y));
        
            // Grid lines
            svg.append("g")
                .attr("class", "grid grid--x")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x)
                    .tickSize(-height)
                    .tickFormat(""));
        
            svg.append("g")
                .attr("class", "grid grid--y")
                .call(d3.axisLeft(y)
                    .tickSize(-width)
                    .tickFormat(""));
            
            const area = d3.area()
            .x(d => x(d.date))
            .y0(d => y(d.yhat_lower))
            .y1(d => y(d.yhat_upper));
            
            let id='red-line line';
            let are = 'rgba(255, 0, 0, 0.178)';
            if(xl == 1){
                id ='yellow-line line';
                are = 'rgba(255, 255, 0, 0.278)'
            }   

            svg.append("path")
            .datum(data)
            .attr('class', 'area')
            .attr("clip-path", "url(#chart-clip)")
            .attr("fill", are)
            .attr("stroke", "none")
            .attr("d", area);

            // Line generator
            const line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.yhat));
            
                
            // Draw the line
            svg.append("path")
                .datum(data)
                .attr('class', id)
                .attr("clip-path", "url(#chart-clip)")
                .attr("fill", "none")
                .attr("d", line);
        
            // Add dots

        const dotsGroup = svg.append("g")
        .attr("clip-path", "url(#chart-clip)");
        

        dotsGroup.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dott")
            .attr("r", 2)
            .attr("fill", 'white')
            .attr("cx", d => x(d.date))
            .attr("cy", d => y(d.yhat))
            .attr("opacity", 1);

            
            // Tooltip
            const tooltip = d3.select(".tooltip4");


            // Zoom behavior
            const zoom = d3.zoom()
                .scaleExtent([1, 10])
                .translateExtent([[0, 0], [width, height]])
                .extent([[0, 0], [width, height]])
                .on("zoom", zoomed);
        
            svg.append("rect")
                .attr("class", "zoom-rect")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "none")
                .attr("pointer-events", "all")
                .call(zoom);
        
                function zoomed(event) {
                    currentTransform = event.transform;
                    const newX = currentTransform.rescaleX(x);
                    
                    // Update axis and grid
                    xAxis.call(d3.axisBottom(newX));
                    svg.select(".grid--x").call(d3.axisBottom(newX)
                        .tickSize(-height)
                        .tickFormat(""));
                    
                    // Update line and dots
                    svg.select(".line")
                        .attr("d", line.x(d => newX(d.date)));
                
                    svg.selectAll(".dott")
                        .attr("cx", d => newX(d.date))
                        .attr("cy", d => y(d.yhat));

                    const newArea = d3.area()
                    .x(d => newX(d.date))
                    .y0(d => y(d.yhat_lower))
                    .y1(d => y(d.yhat_upper));
                
                    // Update area path
                    svg.selectAll(".area")
                        .attr("d", newArea);
                }
                
                
        
            svg.on("mousemove", function(event) {
                const [mouseX, mouseY] = d3.pointer(event);
                const xScale = currentTransform.rescaleX(x);  // Use updated transform
                const xValue = xScale.invert(mouseX);
            
                const bisectDate = d3.bisector(d => d.date).left;
                const i = bisectDate(data, xValue, 1);
            
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

                lower.innerHTML = `${d.yhat_lower.toFixed(2)}`;
                upper.innerHTML = `${d.yhat_upper.toFixed(2)}`;
                
                let metric = "L";
                if(xl == 1){
                    metric = "kWh";
                }

                const chartRect = document.getElementById('chart4').getBoundingClientRect();
                tooltip
                    .style('position', 'absolute')
                    .style("opacity", 1)
                    .html(`Date: ${d3.timeFormat("%Y-%m-%d")(d.date)}<br/>Forecast: ${d.yhat.toFixed(2)}/${metric}`)
                    .style("left", `${event.pageX - chartRect.left}px`)
                    .style("top", `${event.clientY - chartRect.top}px`);
            });
                
        
            svg.on("mouseleave", function() {
                tooltip.style("opacity", 0);
            });
            
        });
}
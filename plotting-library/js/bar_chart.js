class BasicBar extends BasicChart{
    constructor(width,height,elementId){
        super(width,height,elementId);
        this.title = 'default';
        this.column = 'quantity';
        this.labels = 'labels';
        this.margin = {top:25, right: 20, bottom: 20, left: 20};
        this.height = this.height_full  - this.margin.top - this.margin.bottom;
        this.width = this.width_full  - this.margin.left - this.margin.right;

    }
    drawBar(data){
        let canvas = this.makeCanvas();

        // scales

        let max_value = d3.max(data,(d) => d[this.column]);


        let y = d3.scaleLinear()
                  .range([this.height, 0])
                  .domain([0, max_value]);

        let x = d3.scaleBand()
                  .range([0, this.width])
                  .domain(data.map((d,i) => d[this.labels]))
                  .padding(0.1);
       
        // Chart title
        canvas.append("g")
              .append("text")
              .attr("class","chart-title")
              .attr("x",this.width/2)
              .attr("y",-this.margin.top/2)
              .attr('text-anchor', 'middle')
              .text(this.title);

        // x axis
        canvas.append('g')
             .attr('transform', "translate(0,"+this.height+")")
             .attr("class","axis")
             .call(d3.axisBottom(x));
        
        // bars
        canvas.selectAll("rect").data(data).enter().append("rect")
                            .attr("x",(d,i) => x(d[this.labels]))
                            .attr("y",(d) => y(d[this.column]))
                            .attr("width", (d) => x.bandwidth())
                            .attr("height", (d) => this.height - y(d[this.column]))
                            .attr("class","bars")
                            .attr("fill","steelBlue");

         let format = (max_value < 100000) ? d3.format(".2s") : d3.format("$.3s");

         let font_size = 2*x.bandwidth()/(format(max_value).toString().length+2);
        
        // bar labels
       
        canvas.append("g").selectAll("text")
                      .data(data)
                      .enter()
                      .append("text")
                      .attr("class","bar-labels")
                      .attr("font-size",(font_size)+"px")
                      .attr('text-anchor', 'middle')
                      .attr("x",(d,i) => x(d[this.labels]) + x.bandwidth()/2)
                      .attr("y",(d) => y(d[this.column]) + 1.5*font_size)
                      .attr("fill","white")
                      .text((d)=>format(d[this.column]));
    }
}



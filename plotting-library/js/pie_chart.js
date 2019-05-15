class BasicPie extends BasicChart {
	constructor(width,height,elementId){
        super(width,height,elementId);
        this.title = 'default';
        this.categories = 'category';
        this.quantities = 'quantity';
        this.margin = {top:40, right: 20, bottom: 40, left: 25};
        this.height = this.height_full  - this.margin.top - this.margin.bottom;
        this.width = this.width_full  - this.margin.left - this.margin.right;
    }
    drawPie(data){
        let canvas = this.makeCanvas();


        let categories = data.map(d => d[this.categories]);
        let radius = Math.min(this.width , this.height)/2.5;
        let center = Math.min(this.width , this.height)/2;
        let inner_radius = Math.min(this.width , this.height)/5;
        let numbers = data.map(d => Number(d[this.quantities]));
        let total = d3.sum(numbers);
        let quantity = this.quantities;
        let category = this.categories;

        let color = d3.scaleOrdinal()
                       .domain(categories)
                       .range(['#E04836','#F39D41','#8D5924','#5696BC','#2F5168']);

        
        //chart title

        canvas.append("g")
              .append("text")
              .attr("class","chart-title")
              .attr("x",center)
              .attr("y",-this.margin.top/2)
              .text(this.title)
              .attr('text-anchor', 'middle');

        

        let pieGenerator = d3.pie().value(function(d) {
        	                  return d[quantity];
        	              })
                             .sort(function(a, b) {
                                return a[category].localeCompare(b[category]);
                           });
        let arcGenerator = d3.arc()
                             .innerRadius(inner_radius)
                             .outerRadius(radius);

        let arcData = pieGenerator(data);

        let pie = canvas.append("g")
                        .attr("transform","translate("+(center)+","+(center)+")");


        pie.selectAll('path')
              .data(arcData)
              .enter()
              .append('path')
              .attr("fill",(d,i)=> color(categories[i]))
              .attr('d', arcGenerator);

        var outterlabels = pie.append("g");

        outterlabels.selectAll('text')
              .data(arcData)
              .enter()
              .append('text')
              .attr("class","pie-labels")
              .attr("font-size",(radius/6)+"px")
              .attr("text-anchor","middle")
              .each(function(d,i) {
                 var centroid = arcGenerator.centroid(d);
                 d3.select(this)
                   .attr('x', centroid[0]*1.8)
                   .attr('y', centroid[1]*1.8)
                   .attr('dy', '.4em')
                   .text(categories[i]);

        var innerlabels = pie.append("g");

        innerlabels.selectAll('text')
                   .data(arcData)
                   .enter()
                   .append('text')
                   .attr("fill","white")
                   .attr("font-size",(radius/6)+"px")
                   .attr("text-anchor","middle")
                   .attr("class","inner-pie-labels")
                   .each(function(d,i) {
                        var centroid = arcGenerator.centroid(d);
    
                        d3.select(this)
                          .attr('x', centroid[0])
                          .attr('y', centroid[1])
                          .attr('dy', '0.40em')
                          .text(d3.format(",.0%")(data[i][quantity]/total));
                    });


  });





    }
}
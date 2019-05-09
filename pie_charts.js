var marginpie = {top:40, right: 40, bottom: 25, left: 42};
var height = 210 - marginpie.top - marginpie.bottom;
var width = 210 - marginpie.left - marginpie.right;

var svg_pie = {};

var radius = Math.min(width , height)/2;


d3.csv("courses.csv").then(function(data){

	var courses = data.map(d => d['class']);

	


	function draw_pie(column){



		
        var col = data.map(d => Number(d[column]));

        var total = d3.sum(col);
        var classes = data.map((d,i) => courses[i]);

        var new_data = [{name:classes[0],quantity:col[0]},
                         {name:classes[1],quantity:col[1]},
                         {name:classes[2],quantity:col[2]},
                         {name:classes[3],quantity:col[3]}];



        




        svg_pie[column] = d3.select("#"+column+"-pie")
                        .append("svg")
                        .attr("width",width + marginpie.left + marginpie.right)
                        .attr("height",height + marginpie.top + marginpie.bottom);

        var g = svg_pie[column].append("g")
                     .attr("class","pie-graph")
                     .attr("id",column+"-pie")
                     .attr("transform","translate("+(marginpie.left+60)+","+(marginpie.top+45)+")");



        var pieGenerator = d3.pie()
  .value(function(d) {return d.quantity;})
  .sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });
            //.sort(function(a, b) {
             //   return a.name.localeCompare(b.class);
         //});

        
        var arcGenerator = d3.arc()
                             .innerRadius(30)
                             .outerRadius(radius);


        var arcData = pieGenerator(new_data);



        var color = d3.scaleOrdinal()
                       .domain(courses)
                       .range(['#E04836','#F39D41','#8D5924','#5696BC']);


        
  g.selectAll('path')
  .data(arcData)
  .enter()
  .append('path')
  .attr("fill",(d,i)=> color(courses[i]))
  .attr('d', arcGenerator);



  g.selectAll('text')
  .data(arcData)
  .enter()
  .append('text')
  .attr("class","pie-labels")
  .each(function(d,i) {
    var centroid = arcGenerator.centroid(d);
    d3.select(this)
      .attr('x', centroid[0]*1.8)
      .attr('y', centroid[1]*1.8)
      .attr('dy', '0.40em')
      .text(courses[i]);
  });


  var innerlabels = g.append("g").attr("id",column+"-inner-label-container");



  d3.select("#"+column+"-inner-label-container").selectAll('text')
  .data(arcData)
  .enter()
  .append('text')
  .attr("class","inner-pie-labels")
  .each(function(d,i) {
    var centroid = arcGenerator.centroid(d);
    
    d3.select(this)
      .attr('x', centroid[0])
      .attr('y', centroid[1])
      .attr('dy', '0.40em')
      .text(d3.format(",.0%")(new_data[i]['quantity']/total));
  });



	

		
   
           

	}

	draw_pie('oer_sections');
  draw_pie('students');
  draw_pie('savings');
	
});

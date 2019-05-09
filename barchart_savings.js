var margin = {top:30, right: 40, bottom: 20, left: 30};
var height = 500 - margin.top - margin.bottom;
var width = 500 - margin.left - margin.right;
var svg = {};
var y = {};
var x = {};
var g ={};
var titles = {'sections': 'Number of OER sections',
             'students': 'Number of OER students',
              'savings': 'Student savings ($)'};
var semester_names = {'fall': 'Fall',
             'spring': 'Spring',
             'totals': 'Total'};


var data;








d3.csv("oer_data.csv").then(function(data){
	

	data = data;

	data.forEach(function(d){
		d.semester = semester_names[d.semester];
		d.savings = Number(d.savings);
		d.sections = Number(d.sections);
		d.students = Number(d.students);
		
	});

	console.log(data);
	

     
    function draw(column){
        
        y[column] = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, d3.max(data,(d) => d[column])]);

        x[column] = d3.scaleBand()
                         .range([0, width])
                         .domain(data.map((d) => d.semester))
                         .padding(0.09);



	    svg[column] = d3.select("#"+column+"-barchart")
                        .append("svg")
                        .attr("width",width + margin.left + margin.right)
                        .attr("height",height + margin.top + margin.bottom);


        var g = svg[column].append("g")
                     .attr("class","bar-graph")
                     .attr("id",column+"-graph-g")
                     .attr("transform","translate("+margin.left+","+margin.top+")");

        g.append("g")
              .attr("class","graph-title")
              .append("text")
              .attr("x",width/2)
              .attr("y",-10)
              .attr('text-anchor', 'middle')
              .text(titles[column]);

    
    

        g.append('g')
             .attr('transform', "translate(0,"+height+")")
             .attr("class","axis")
             .call(d3.axisBottom(x[column])
             	.tickValues(x[column].domain().filter(function(d,i){ return ['Fall','Spring','Total'][i];})));


       // g.append('g')
        //     .attr("class","axis")
         //    .call(d3.axisLeft(y[column]));


         g.selectAll("rect").data(data).enter().append("rect")
                            .attr("x",(d,i) => x[column](d.semester))
                            .attr("y",(d) => y[column](d[column]))
                            .attr("width", (d) => x[column].bandwidth())
                            .attr("height", (d) => height - y[column](d[column]))
                            .attr("class","bar");

         g.append("g").selectAll("text")
                      .data(data)
                      .enter()
                      .append("text")
                      .attr("class","bar-labels")
                      .attr('text-anchor', 'middle')
                      .attr("x",(d,i) => x[column](d.semester) + x[column].bandwidth()/2)
                      .attr("y",(d) => 20+y[column](d[column]))
                      .text((d)=>(column=='savings') ? "$"+d3.format(".3s")(d[column]):
                      	d3.format(",")(d[column]));

         



     }

     draw('sections');
     draw('students');
     draw('savings');

   })






d3.csv("oer_data.csv").then(function(data){

	data.forEach(function(d){
		d.sections = +d.sections;
		d.students = +d.students;
		d.savings = +d.savings;
	})

    test1 = new BasicBar(180,150,'#chart1');
    test1.column = 'sections';
    test1.labels = 'semester';
    test1.title = 'Sections';
    test1.drawBar(data);

    test2 = new BasicBar(180,150,'#chart2');
    test2.column = 'students';
    test2.labels = 'semester';
    test2.title = 'Enrollment';
    test2.drawBar(data);

    test3 = new BasicBar(180,150,'#chart3');
    test3.column = 'savings';
    test3.labels = 'semester';
    test3.title = 'Savings';
    test3.drawBar(data);


    

})


d3.csv("courses.csv").then(function(data){

    test4 = new BasicPie(200,2000,'#pie1');
    test4.margin = {top:40,right:40,bottom:40,left:40};
    test4.categories = 'class';
    test4.title = 'classes';
    test4.quantities = 'oer_sections';
    test4.drawPie(data);


})




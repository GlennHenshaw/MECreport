d3.csv("data/oer_data.csv").then(function(data){

	data.forEach(function(d){
		d.sections = +d.sections;
		d.students = +d.students;
		d.savings = +d.savings;
	})

    test1 = new BasicBar(180,150,'#sections-barchart');
    test1.column = 'sections';
    test1.labels = 'semester';
    test1.title = 'Sections';
    test1.drawBar(data);

    test2 = new BasicBar(180,150,'#students-barchart');
    test2.column = 'students';
    test2.labels = 'semester';
    test2.title = 'Enrollment';
    test2.drawBar(data);

    test3 = new BasicBar(180,150,'#savings-barchart');
    test3.column = 'savings';
    test3.labels = 'semester';
    test3.title = 'Savings';
    test3.drawBar(data);


    

})


d3.csv("data/courses.csv").then(function(data){

    test4 = new BasicPie(250,250,'#section-pie');

    test4.categories = 'class';
    test4.title = 'Out of 366 OER Sections';
    test4.quantities = 'oer_sections';
    test4.drawPie(data);


})
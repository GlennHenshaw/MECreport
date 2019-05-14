

class BasicChart {
    constructor(width,height,elementId,margin){
        this.height_full = height;
        this.width_full = width;
        this.margin = {top:0, right: 0, bottom: 0, left: 0};
        this.elementId = elementId;
        this.height = this.height_full  - this.margin.top - this.margin.bottom;
        this.width = this.width_full  - this.margin.left - this.margin.right;

    }
    makeCanvas(){
        let svg = d3.select(this.elementId)
                        .append("svg")
                        .attr("width",this.width_full)
                        .attr("height",this.height_full);
        var g = svg.append("g")
                     .attr("class","canvas")
                     .attr("transform","translate("+this.margin.left+","+this.margin.top+")");        
        return g;
    }
}




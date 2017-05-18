var React = require("react");
var Chart = require('chart.js');

class Analyzer extends React.Component{
	constructor(props){
		super(props);

		// Make sure methods are always called with correct context.
		this.renderGraph = this.renderGraph.bind(this);
	}

	renderGraph(){
		// Generate array of height points of HTML.
		var tags = document.getElementById("htmlInput").value.match(/<.*?>/gi);
		var height = 0;
		var height_points = [0];
		tags.forEach(function(tag){
			if (tag.match(/<\/.*>/i)){
				height--;
			}
			else{
				height++;
			}
			height_points.push(height);
		});
		// Canvas
		var dataChart = new Chart("dataChart", {
		    type: 'line',
		    data: {
		    	// Each data point must have a corresponding label, so we generate an array of empty labels for the length of the data set.
		        labels: height_points.map(() => {return ""}),
		        datasets: [{
		            label: 'HTML Layers',
		            data: height_points,
		            lineTension: 0.2
		           
		        }]
		    },
		    options: {
		    	responsive: true,
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});

	}

	render(){
		return(
			<div className="container">
				<div className="visualization">
					<canvas id="dataChart"></canvas>
				</div>
				<div className="input-group">
					<textarea id="htmlInput"></textarea>
					<button onClick={this.renderGraph}>Analyze</button>
				</div>
			</div>
		)
	}
}

module.exports = Analyzer;
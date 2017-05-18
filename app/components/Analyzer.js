var React = require("react");
var Chart = require('chart.js');

class Analyzer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			HTML: ""
		}

		// Make sure methods are always called with correct context.
		this.updateHTML = this.updateHTML.bind(this);
		this.renderGraph = this.renderGraph.bind(this);
	}

	updateHTML(){
		this.setState(function(){
			return {
				HTML: document.getElementById("htmlInput").value
			}
		});
		this.renderGraph();
	}

	renderGraph(){
		// Generate array of height points of HTML.
		var tags = this.state.HTML.match(/<.*?>/gi);
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
		var ctx = "dataChart";
		var dataChart = new Chart(ctx, {
		    type: 'line',
		    data: {
		    	// Each data point must have a corresponding label, so we generate an array of empty labels for the length of the data set.
		        labels: height_points.map(() => {return ""}),
		        datasets: [{
		            label: 'HTML Layers',
		            data: height_points,
		            lineTension: 0.1
		           
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
					<button onClick={this.updateHTML}>Analyze</button>
				</div>
			</div>
		)
	}
}

module.exports = Analyzer;
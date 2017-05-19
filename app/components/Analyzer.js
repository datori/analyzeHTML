var React = require("react");
var Chart = require('chart.js');

class Analyzer extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			graph: false
		}

		// Make sure method is always called with correct context.
		this.renderGraph = this.renderGraph.bind(this);
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

	componentDidMount(){
		var graph = new Chart("dataChart", {
		    type: 'line',
		    data: {
		        labels: [],
		        datasets: [{
		            label: 'HTML Layers',
		            data: [],
		            lineTension: 0.2
		        }]
		    },
		    options: {
		    	responsive: true,
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero: true,
		                    fixedStepSize: 1
		                },
		                scaleLabel:{
		                	display: true,
		                	labelString: "Layers"
		                }
		            }]
		        }
		    }
		});
		this.setState(() => { return {graph: graph} } );
	}

	renderGraph(){
		// Generate array of height points of HTML.
		var tags = document.getElementById("htmlInput").value.match(/<.*?>/gi);
		var height = 0;
		var height_points = [0];
		tags.forEach(function(tag){
			if (tag.match(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)+.*>/i)){
				// Keep same height for void tags.
			}
			else if (tag.match(/<\/.*>/i)){
				// Decrement height for closing tags.
				height--;
			}
			else{
				// Increment height for opening tags.
				height++;
			}
			height_points.push(height);
		});
		// Update canvas.
		// Each data point must have a corresponding label, so we generate an array of empty labels for the length of the data set.
		this.state.graph.data.labels = height_points.map(() => {return ""});
		this.state.graph.data.datasets[0].data = height_points;
		this.state.graph.update();
	}
}

module.exports = Analyzer;
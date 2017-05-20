var React = require("react");
var PropTypes = require("prop-types");
var Chart = require('chart.js');

function InputGroup(props){
	return(
		<div className="input-group">
			<textarea id="htmlInput"></textarea>
			<button onClick={props.renderGraph}>Analyze</button>
		</div>
	)
}
InputGroup.propTypes = {
	renderGraph: PropTypes.func.isRequired
}

function Visualization(){
	return(
		<div className="visualization">
			<canvas id="dataChart"></canvas>
		</div>
	)
}

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
				<Visualization />
				<InputGroup renderGraph={this.renderGraph} />
			</div>
		)
	}

	componentDidMount(){
		var graph = new Chart("dataChart", {
		    type: 'line',
		    data: {
		        labels: [],
		        datasets: [{
		            label: '',
		            data: [],
		            lineTension: 0.5,
		            backgroundColor: '#6ec6ff'
		        }]
		    },
		    options: {
		    	responsive: true,
		    	legend: {
		    		display: false
		    	},
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero: true,
		                    fixedStepSize: 1,
		                    fontSize: 20
		                },
		                scaleLabel:{
		                	display: true,
		                	labelString: "Layers",
		                	fontSize: 30
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
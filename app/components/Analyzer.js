var React = require("react");
var TreeVisual = require("./TreeVisual");

class Analyzer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			HTML: "<div></div>"
		}

		this.updateHTML = this.updateHTML.bind(this);
	}

	updateHTML(){
		this.setState(function(){
			return {
				HTML: document.getElementById("htmlInput").value
			}
		});
	}

	render(){
		return(
			<div className="container">
				<TreeVisual HTML_Data={this.state.HTML} />
				<div className="input-group">
					<textarea id="htmlInput"></textarea>
					<button onClick={this.updateHTML}>Analyze</button>

				</div>
			</div>
		)
	}
}

module.exports = Analyzer;
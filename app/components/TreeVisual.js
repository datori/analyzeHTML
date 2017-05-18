var React = require('react');

class TreeVisual extends React.Component{
	render(){
		// Generate array of height points of HTML.
		var tags = this.props.HTML_Data.match(/<.*?>/gi);
		var height = 0;
		var height_points = [];
		tags.forEach(function(tag){
			if (tag.match(/<\/.*>/i)){
				height--;
			}
			else{
				height++;
			}
			height_points.push("+".repeat(height));
		});
		// Render Array
		return (
			<div className="visualization">
				<ul>
					{height_points.map(function(points){
						return(
							<li>{points}</li>
						)
					})}
				</ul>
			</div>
		)

	}
}

module.exports = TreeVisual;
'use strict';
var fs = require('fs')
fs.readFile("test.html", "utf8", function(err,data){
	if (err != true){
		var tags = data.match(/<.*?>/gi);
		var height = 0;
		tags.forEach(function(tag){
			if (tag.match(/<\/.*>/i)){
				height--;
			}
			else{
				height++;
			}
			console.log("+".repeat(height));
		})

	}
	else{
		console.log(err);
	}
});
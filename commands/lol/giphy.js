var qs = require("querystring");

var giphy_config = {
    "api_key": "dc6zaTOxFJmzC",
    "rating": "r",
    "url": "http://api.giphy.com/v1/gifs/random",
};



function get_gif(tags, func) {
	var params = {
		"api_key": giphy_config.api_key,
		"rating": giphy_config.rating,
		"format": "json",
		"limit": 1
	};
	var query = qs.stringify(params);

	if (tags !== null) {
		query += "&tag=" + tags.join('+')
	}

	//wouldnt see request lib if defined at the top for some reason:\
	//console.log(query)
	request(giphy_config.url + "?" + query, function (error, response, body) {
		//console.log(arguments)
		if (error || response.statusCode !== 200) {
			console.error("giphy: Got error: " + body);
			console.log(error);
			//console.log(response)
		}
		else {
			try{
				var responseObj = JSON.parse(body)
				func(responseObj.data.id);
			}
			catch(err){
				func(undefined);
			}
		}
	}.bind(this));
}

module.exports = {
	name: "giphy",
	description: "returns a random gif from giphy matching the tags passed",
	run: function(client, message, args) {
		get_gif(args, function(id) {
		if (typeof id !== "undefined") {
			message.channel.send( "http://media.giphy.com/media/" + id + "/giphy.gif [Tags: " + (tags ? tags : "Random GIF") + "]");
		}
		else {
			message.channel.send( "Invalid tags, try something different. [Tags: " + (tags ? tags : "Random GIF") + "]");
		}
		});
	}
}
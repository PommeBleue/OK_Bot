module.exports ={
    name: "voice",
	description: "creates a new text channel with the given name.",
	run: function(client, message, args) {
		message.channel.guild.createChannel(args.join(" "),"voice").then(function(channel) {
			message.channel.send("created " + channel.id).then(msg => {
                msg.delete(10000);
            });
			console.log("created " + channel);
		}).catch(function(error){
			message.channel.send("failed to create channel: " + error).then(msg => {
                msg.delete(10000);
            });
		});
	}
} 
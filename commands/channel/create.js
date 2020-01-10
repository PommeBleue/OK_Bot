module.exports ={
    name: "create",
	description: "creates a new text channel with the given name.",
	run: function(client, message, args) {
		message.channel.guild.createChannel(args.join(" "),"text").then(function(channel) {
			message.channel.send("created " + channel).then(msg => {
                msg.delete(10000);
            });
		}).catch(function(error){
			message.channel.send("failed to create channel: " + error).then(msg => {
                msg.delete(10000);
            });
		});
    }
}    
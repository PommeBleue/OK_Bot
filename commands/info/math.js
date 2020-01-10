module.exports = {
    name: "math",
    description: "Gives a Random Math Fact",
    run: function(client, message, args) {
        require("request")("http://numbersapi.com/random/math?json",
            function(err, res, body) {
                var data = JSON.parse(body);
                if (data && data.text) {
                    message.channel.send(data.text)
                }
            });
    }
}
const Discord = require('discord.js');
const ksoftServices = require('../../services/ksoftServices');


module.exports = {
    name : "meme",
    description : "Sends a random meme",
    run : (client, message, args) => {
            ksoftServices.randomMeme()
        .then(meme => {
            let embed = new Discord.RichEmbed();
            embed
            .setColor(0xff3333)
            .setFooter(`Powered By KSoft.Si`, `https://cdn.ksoft.si/images/Logo1024-W.png`)
            .addField(meme.data.author, `${meme.data.title}\n[Source](${meme.data.source})`)
            .setImage(meme.data.image_url)

            message.channel.send(embed);
        })
        .catch(err => console.log(err));
    }
};
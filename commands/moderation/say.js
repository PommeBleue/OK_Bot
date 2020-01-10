module.exports = {
    name : "say",
    description : "Shows ping",
    run : async (client, message, args) => {
        const {RichEmbed} = require('discord.js');
        if(message.deletable) await message.delete();
          if(args.length < 1)
              return message.reply("do you have something to say ?").then(msg => {
                  msg.delete(10000)
              });
          const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

              config = {
                text : ``,
                author : `Author : Pamplou`,
                setText : (t) => {
                    this.text = t;
                }
              };

          if (args[0] === "embed"){
              const embed = new RichEmbed()
                  .setColor(roleColor)
                  .setAuthor(message.author.username)
                  .setDescription(args.slice(1).join(" "));
              await message.channel.send(embed);
          }else if(args[0] === "-e"){
            let roleEmbed = new RichEmbed();
            if(args[1] === "idea") {
                config.setText();
            }
            roleEmbed
            .setDescription(`Bienvenue dans le salon ${message.channel}\n
            `)
            .setFooter(config.author);
            await message.channel.send(roleEmbed);
          }else {
              await message.channel.send(args.join(" "));
          }
        }
}
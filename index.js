const {Client, RichEmbed, Collection} = require('discord.js');
const {config} = require('dotenv');
const conf = require('./commands/admin/config.js')
const client = new Client({
    disableEveryone : true
});
const {readdirSync, readdir} = require('fs');

client.commands = new Collection();
client.aliases = new Collection();

/* const command = require('./handler/command')(client);
 */
config({
    path : __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);   
});

const evtFiles = readdirSync("./events/");
  console.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    console.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });


client.on("message", async message => {
       const prefix = "!";


       if(message.author.bot) return;
       if(!message.guild) return;
       if(!message.content.startsWith(prefix)) return;

       const args = message.content.slice(prefix.length).trim().split(/ +/g);
       const cmd = args.shift();

       if(cmd.length === 0) return;
       let command = client.commands.get(cmd);
       if(!command) client.commands.get(client.aliases.get(cmd));
       if(command) {
        command.run(client, message, args);
    } 
       
});

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id);

    const message = await channel.fetchMessage(data.message_id);
    const member = message.guild.members.get(user.id);

    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);

    if (!reaction) {
        const emoji = new Emoji(client.guilds.get(data.guild_id), data.emoji);
        reaction = new MessageReaction(message, emoji, 1, data.user_id === client.user.id);
    }

    let embedFooterText;
    if (message.embeds[0]) embedFooterText = message.embeds[0].footer.text;

    if (
        (message.author.id === client.user.id) && (message.content !== conf.initialMessage || 
        (message.embeds[0] && (embedFooterText !== CONFIG.embedFooter)))
    ) {

        if (!conf.embed && (message.embeds.length < 1)) {
            const re = `\\*\\*"(.+)?(?="\\*\\*)`;
            const role = message.content.match(re)[1];

            if (member.id !== client.user.id) {
                const guildRole = message.guild.roles.find(r => r.name === role);
                if (event.t === "MESSAGE_REACTION_ADD") member.addRole(guildRole.id);
                else if (event.t === "MESSAGE_REACTION_REMOVE") member.removeRole(guildRole.id);
            }
        } else if (conf.embed && (message.embeds.length >= 1)) {
            const fields = message.embeds[0].fields;

            for (const { name, value } of fields) {
                if (member.id !== client.user.id) {
                    const guildRole = message.guild.roles.find(r => r.name === value);
                    if ((name === reaction.emoji.name) || (name === reaction.emoji.toString())) {
                        if (event.t === "MESSAGE_REACTION_ADD") member.addRole(guildRole.id);
                        else if (event.t === "MESSAGE_REACTION_REMOVE") member.removeRole(guildRole.id);
                    }
                }
            }
        }
    }
});

process.on('unhandledRejection', err => {
    const msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
	console.error("Unhandled Rejection", msg);
});

client.login(process.env.TOKEN);





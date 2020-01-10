module.exports = {
    name : "ping",
    description : "Shows ping",
    run : async (client, message, args) => {
        const msg = await message.channel.send(`:ping_pong: Pinging ...`);
        await msg.edit(`:ping_pong: Pong ! ${Math.floor(msg.createdAt - message.createdAt)}ms\n API Latency is ${Math.round(client.ping)}ms`);
    }
}
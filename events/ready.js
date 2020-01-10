module.exports = async client => {
    console.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");
    client.user.setPresence({
        status : "dnd",
        game : {
            name : " RadioHead ",
            type : "LISTENING"
        }
    });    
};
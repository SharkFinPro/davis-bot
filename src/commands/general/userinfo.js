const Discord = require("discord.js");

module.exports = {
    enabled: true,
    description: "Display info about a specified user",
    type: "general",
    args: ["user"],
    command(message, bot) {
        const user = message.mentions.users.first() ? message.mentions.users.first() : message.author,
            presence = message.author.id === user.id && user.presence.status === "offline" ? "invisible" : user.presence.status;
        message.channel.send(new Discord.MessageEmbed()
            .setColor("#0FF0FF")
            .setThumbnail(user.displayAvatarURL())
            .addField("Requested user", user.username, true)
            .addField("ID", user.id, true)
            .addField("Status", presence, true)
            .addField("Game", user.presence.game ? user.presence.game.name : "[No game playing]", true));
    }
};

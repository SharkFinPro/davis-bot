module.exports = {
    enabled: true,
    description: "Clears messages",
    type: "mod",
    args: ["amount"],
    command(message, bot) {
        if (!message.guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permissions to use this command.");
        if (isNaN(message.content.toLowerCase().split(" ")[1])) return message.channel.send("Please specify a number of messages to delete!");
        message.channel.bulkDelete(parseInt(message.content.toLowerCase().split(" ")[1]) + 1, 10).then(messages => message.channel.send(`**Deleted ${messages.size - 1} messages**! 👍`).then((m) => m.delete({timeout: 2000})));
    }
};

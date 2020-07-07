module.exports = {
  enabled: true,
  description: "Clears the queue.",
  type: "mod",
  args: "",
  command(message, bot) {
    if (!message.guild.members.cache.get(message.author.id).hasPermission("MANAGE_MESSAGES")) {
      return message.reply("You do not have permissions to use this command.");
    }
    if (bot.music.queue.songs.length === 0) {
      return message.channel.send("The queue is currently empty.");
    }
    bot.music.clearQueue(message);
    message.channel.send(`The queue has been cleared by <@${message.author.id}>!`);
  }
};

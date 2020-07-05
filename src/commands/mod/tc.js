module.exports = {
  enabled: true,
  description: "Toggles command on/off",
  args: ["command"],
  type: "mod",
  command(message, bot) {
    if (message.author.id != "419151003766620180") {
      return message.reply("You do not have permissions to use this command.");
    }
    const command = message.content.toLowerCase().split(" ")[1];

    if (!Object.keys(bot.commandList).includes(command) || command === "tc") {
      return message.react("❌");
    }
    if (bot.commandList[command].enabled) {
      bot.commandList[command].enabled = false;
      return message.channel.send(`Disabled the ${command} command!`);
    }
    bot.commandList[command].enabled = true;
    message.channel.send(`Enabled the ${command} command!`);
  }
};

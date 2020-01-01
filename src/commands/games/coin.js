const Discord = require("discord.js");

module.exports = {
  enabled: true,
  description: "Flip a coin",
  type: "games",
  args: "",
  command(message, bot) {
    message.channel.send(Math.floor(Math.random() * 2) === 0 ? "Heads!" : "Tails!");
  }
};

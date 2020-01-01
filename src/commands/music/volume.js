module.exports = {
  enabled: true,
  description: "Sets the current volume",
  type: "music",
  args: ["volume"],
  command(message, bot) {
    isNaN(message.content.toLowerCase().split(" ")[1]) ? message.channel.send("Please choose a number to set the volume!") : bot.music.setVolume(message, message.content.toLowerCase().split(" ")[1]);
  }
};

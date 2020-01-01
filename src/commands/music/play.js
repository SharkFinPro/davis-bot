module.exports = {
  enabled: true,
  description: "Plays a song from YT",
  type: "music",
  args: ["url"],
  command(message, bot) {
    bot.music.addSong(message, message.content.split(" ")[1]);
  }
};
